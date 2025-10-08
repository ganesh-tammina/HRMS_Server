import xlsx, { WorkBook, WorkSheet } from "xlsx";
import { Request, Response } from "express";
import fs from "fs";
import path from "path";

export class ExcelProcessorService {
  public static async extractData(req: Request, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }
      const filePath = req.file.path;
      const fileExt = path.extname(req.file.originalname).toLowerCase();
      const mimeType = req.file.mimetype;

      const allowedExtensions = [".xlsx", ".xls"];
      const allowedMimeTypes = [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
      ];

      if (
        !allowedExtensions.includes(fileExt) ||
        !allowedMimeTypes.includes(mimeType)
      ) {
        fs.unlinkSync(filePath);
        return res.status(400).json({
          error:
            "Invalid file type. Only Excel (.xls, .xlsx) files are allowed.",
        });
      }
      if (!fs.existsSync(req.file.path)) {
        return res
          .status(400)
          .json({ error: "Uploaded file not found on server" });
      }

      let workbook: WorkBook;
      try {
        workbook = xlsx.readFile(req.file.path, { cellDates: true });
      } catch (readError: any) {
        return res.status(400).json({
          error: "Invalid or corrupted Excel file",
          details: readError.message,
        });
      }

      const sheetNames = workbook.SheetNames;
      if (!sheetNames || sheetNames.length === 0) {
        return res.status(400).json({ error: "No sheets found in Excel file" });
      }

      const sheetName = sheetNames[0] || "";
      const worksheet: WorkSheet | any = workbook.Sheets[String(sheetName)];

      if (!worksheet) {
        return res
          .status(400)
          .json({ error: `Sheet "${sheetName}" is empty or invalid` });
      }

      let sheetData: any[];
      try {
        sheetData = xlsx.utils.sheet_to_json(worksheet, {
          defval: null,
          raw: false,
          blankrows: false,
        });
      } catch (parseError: any) {
        return res.status(500).json({
          error: "Failed to parse sheet data",
          details: parseError.message,
        });
      }

      if (!sheetData || sheetData.length === 0) {
        return res
          .status(400)
          .json({ error: "Sheet is empty, no data to process" });
      }

      return res.status(200).json({
        message: "Excel file processed successfully",
        sheetName,
        rowCount: sheetData.length,
        data: sheetData,
      });
    } catch (error: any) {
      console.error("Unexpected error while processing Excel file:", error);
      return res.status(500).json({
        error: "Unexpected error while processing Excel file",
        details: error.message || error,
      });
    } finally {
      try {
        if (req.file && fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
        }
      } catch (cleanupError) {
        console.warn("Failed to delete uploaded file:", cleanupError);
      }
    }
  }
}

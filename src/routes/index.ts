import { Router } from "express";
import MailController from "../controller/mail-sender-controller/mailer-controller";
import { Request, Response } from "express";
import { readFile } from "fs/promises";
import multer from "multer";
import { ExcelProcessorService } from "../services/excel-processer-service";
import EmployeeLoginController from "../controller/employee-login-controller";
import AdminController from "../controller/admin-controller";
import { checkWhoAmI } from "../middlewares/cookie-parser-middleware";
import EmployeeController from "../controller/employee-controller";
import EmploymentDetailsController from "../controller/employement-details-controller";

const upload = multer({ dest: "uploads/" });

const router = Router();
router.post("/v1/send-email", MailController.mailsender);
router.post("/login",EmployeeLoginController.EmailCheck);
router.post('/excel', upload.single('file'), ExcelProcessorService.extractData)
router.post("/v1/add",EmployeeController.insertEmployee)
router.post("/v1/addEmployementDetails", EmploymentDetailsController.insertEmploymentDetails);
// router.post("/v1/address")
router.get("/test", async (req, res) => {
  const file = await readFile("./src/db.json", "utf8");
  const json = JSON.parse(file);
  res.json({
    employees: json.employees.length,
    addresses: json.addresses.length,
    family_info: json.family_info.length,
    employment_details: json.employment_details.length,
    statutory_info: json.statutory_info.length,
    exit_details: json.exit_details.length,
  });
});
router.post(
  "/v1/parse-excel",
  upload.single("file"),
  AdminController.uploadExcel
);


export default router;

import { Request, Response } from "express";
export interface AdminInterface {
  uploadExcel(req: Request, res: Response): Promise<any>;
}

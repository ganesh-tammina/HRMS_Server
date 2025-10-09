import { Request, Response } from "express";
import Employeeservices from "../services/employee-service";

const employeeService = new Employeeservices();

export default class EmployeeController {
  static async insertEmployee(req: Request, res: Response) {
    const result = await employeeService.addEmployees(req, res);
    return res.status(result.statusCode).json(result);
  }

  static async insertEmployeeAddress(req: Request, res: Response) {
    const addType = "Current";
    const result = await employeeService.addAddress(req, res, addType);
    return res.status(result.statusCode).json(result);
  }
  static async insertEmploymentDetails(req: Request, res: Response) {
    const result = await employeeService.addEmployement_details(req, res);
    return res.status(result.statusCode).json(result);
  }
  static async insertEmployeeStatutoryInfo(req: Request, res: Response) {
    const result = await employeeService.addStatutoryInfo(req, res);
    return res.status(result.statusCode).json(result);
  }
  static async insertEmployeeFamilyInfo(req: Request, res: Response) {
    const result = await employeeService.addFamilyInfo(req, res);
    return res.status(result.statusCode).json(result);
  }
  static async insertExitDetails(req: Request, res: Response){
     try {
      const result = await employeeService.addExitdetails(req,res);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(500).json({ success: false, message: "Failed to add exit details", error: error.message });
    }

  }
}

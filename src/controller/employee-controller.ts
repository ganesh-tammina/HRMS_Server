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
}

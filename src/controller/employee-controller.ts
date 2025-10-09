import { Request, Response } from "express";
import EmployeeService from "../services/employee-service";
import Employeeservices from "../services/employee-service";

const employeeService = new EmployeeService();

export default class EmployeeController {
  static async insertEmployee(req: Request, res: Response) {
    const result = await employeeService.addEmployees(req,res);
    return res.status(result.statusCode).json(result);
  }
}

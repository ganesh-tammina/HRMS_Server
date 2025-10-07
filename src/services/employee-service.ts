import { pool } from "../config/database";
import { Request, Response } from "express";
import { EmployeesInterface } from "../interface/employee-interface";

export default class Employeeservices implements EmployeesInterface {
  addEmployees(req: Request, res: Response): Promise<any> {
      throw new Error("Method not implemented.");
  }
}

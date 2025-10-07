import { Request, Response } from "express";

export interface EmployeesInterface {
 addEmployees(req: Request, res: Response):Promise<any>;
}

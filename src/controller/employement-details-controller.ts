import { Request, Response } from "express";
import EmploymentDetailsService from "../services/employment-details-service";

const employmentDetailsService = new EmploymentDetailsService();

export default class EmploymentDetailsController {
  static async insertEmploymentDetails(req: Request, res: Response) {
    const result = await employmentDetailsService.insertEmploymentDetails(req);
    return res.status(result.statusCode).json(result);
  }
}

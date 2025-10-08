import { Request, Response } from "express";
 
export interface EmployeesInterface {
     addEmployees(req: Request, res: Response): Promise<any>;
     editEmployees(req: Request, res: Response): Promise<any>;
     deleteEmployees(req: Request, res: Response): Promise<any>;
     viewEmployees(req: Request, res: Response): Promise<any>;
     addAddress(req: Request, res: Response): Promise<any>;
     editAddress(req: Request, res: Response): Promise<any>;
     deleteAddress(req: Request, res: Response): Promise<any>;
     viewAddress(req: Request, res: Response): Promise<any>;
     addEmployement_details(req: Request, res: Response): Promise<any>;
     editEmployement_details(req: Request, res: Response): Promise<any>;
     deleteEmployement_details(req: Request, res: Response): Promise<any>;
     viewEmployement_details(req: Request, res: Response): Promise<any>;
     addExitdetails(req: Request, res: Response): Promise<any>;
     viewExitdetails(req: Request, res: Response): Promise<any>;
     deleteExitdetails(req: Request, res: Response): Promise<any>;
     editExitdetails(req: Request, res: Response): Promise<any>;
     addFamilyInfo(req: Request, res: Response): Promise<any>;
     viewFamilyInfo(req: Request, res: Response): Promise<any>;
     deleteFamilyInfo(req: Request, res: Response): Promise<any>;
     editFamilyInfo(req: Request, res: Response): Promise<any>;
     addStatutoryInfo(req: Request, res: Response): Promise<any>;
     viewStatutoryInfo(req: Request, res: Response): Promise<any>;
     deleteStatutoryInfo(req: Request, res: Response): Promise<any>;
     editStatutoryInfo(req: Request, res: Response): Promise<any>;
}
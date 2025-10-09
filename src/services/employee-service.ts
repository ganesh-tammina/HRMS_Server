import { pool } from "../config/database";
import { Request, Response } from "express";
import { EmployeesInterface, promised } from "../interface/employee-interface";

export default class Employeeservices implements EmployeesInterface {
  async addEmployees(req: Request, res: Response): Promise<promised> {
    try {
      const {
        EmployeeNumber,
        FirstName,
        MiddleName,
        LastName,
        FullName,
        WorkEmail,
        Gender,
        MaritalStatus,
        BloodGroup,
        PhysicallyHandicapped,
        Nationality,
      } = req.body;
      if (!EmployeeNumber || !FirstName || !LastName || !WorkEmail) {
        return {
          success: false,
          statusCode: 400,
          message: "Missing required fields.",
          error: "Validation Error",
        };
      }
      const created_at = new Date();
      const updated_at = new Date();
      const [result]: any = await pool.query(
        `INSERT INTO employees 
        (employee_number, first_name, middle_name, last_name, full_name, work_email, gender, marital_status, blood_group, physically_handicapped, nationality, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          EmployeeNumber,
          FirstName,
          MiddleName,
          LastName,
          FullName,
          WorkEmail,
          Gender,
          MaritalStatus,
          BloodGroup,
          PhysicallyHandicapped,
          Nationality,
          created_at,
          updated_at,
        ]
      );

      return {
        success: true,
        statusCode: 201,
        message: "Employee inserted successfully.",
        data: { employee_id: result.insertId },
      };
    } catch (error: any) {
      console.error("Error inserting employee:", error);
      return {
        success: false,
        statusCode: 500,
        message: "Internal server error.",
        error: error.message,
      };
    }
  }
  editEmployees(req: Request, res: Response): Promise<any> {
    throw new Error("Method not implemented.");
  }
  deleteEmployees(req: Request, res: Response): Promise<any> {
    throw new Error("Method not implemented.");
  }
  viewEmployees(req: Request, res: Response): Promise<any> {
    throw new Error("Method not implemented.");
  }

  async addAddress(
    req: Request,
    res: Response,
    addType: "Current" | "Permanent"
  ): Promise<any> {
    try {
      const { employee_id } = req.body;
      if (!employee_id) {
        return {
          success: false,
          statusCode: 400,
          message: "Missing required fields.",
          error: "Validation Error",
        };
      }
      const prefix = addType === "Current" ? "Current" : "Permanent";
      const AddressLine1 = req.body[`${prefix}AddressLine1`];
      const AddressLine2 = req.body[`${prefix}AddressLine2`];
      const AddressCity = req.body[`${prefix}AddressCity`];
      const AddressState = req.body[`${prefix}AddressState`];
      const AddressZip = req.body[`${prefix}AddressZip`];
      const AddressCountry = req.body[`${prefix}AddressCountry`];

      const [result]: any = await pool.query(
        `INSERT INTO addresses 
       (employee_id, address_type, address_line1, address_line2, city, state, zip, country)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          employee_id,
          addType,
          AddressLine1,
          AddressLine2,
          AddressCity,
          AddressState,
          AddressZip,
          AddressCountry,
        ]
      );

      return {
        success: true,
        statusCode: 201,
        message: `${addType} Address inserted successfully.`,
        data: { employee_id },
      };
    } catch (error: any) {
      console.error("Error inserting address:", error);
      return {
        success: false,
        statusCode: 500,
        message: "Internal server error.",
        error: error.message,
      };
    }
  }

  editAddress(req: Request, res: Response): Promise<any> {
    throw new Error("Method not implemented.");
  }
  deleteAddress(req: Request, res: Response): Promise<any> {
    throw new Error("Method not implemented.");
  }
  viewAddress(req: Request, res: Response): Promise<any> {
    throw new Error("Method not implemented.");
  }
  async addEmployement_details(req: Request, res: Response): Promise<promised> {
    try {
      const data = req.body;

      const {
        employee_id,
        AttendanceNumber,
        Location,
        LocationCountry,
        LegalEntity,
        BusinessUnit,
        Department,
        SubDepartment,
        JobTitle,
        SecondaryJobTitle,
        ReportingTo,
        ReportingManagerEmployeeNumber,
        DottedLineManager,
        DateJoined,
        LeavePlan,
        Band,
        PayGrade,
        TimeType,
        WorkerType,
        ShiftPolicyName,
        WeeklyOffPolicyName,
        AttendanceTimeTrackingPolicy,
        AttendanceCaptureScheme,
        HolidayListName,
        ExpensePolicyName,
        NoticePeriod,
        CostCenter,
      } = data;
      if (!employee_id || !AttendanceNumber) {
        return {
          success: false,
          statusCode: 400,
          message: "Missing required fields in request body.",
        };
      }

      const created_at = new Date();
      const updated_at = new Date();

      const [result]: any = await pool.query(
        `INSERT INTO employment_details 
        (employee_id, attendance_number, location, location_country, legal_entity, business_unit, department, sub_department, job_title, secondary_job_title, reporting_to, reporting_manager_employee_number, dotted_line_manager, date_joined, leave_plan, band, pay_grade, time_type, worker_type, shift_policy_name, weekly_off_policy_name, attendance_time_tracking_policy, attendance_capture_scheme, holiday_list_name, expense_policy_name, notice_period, cost_center)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          employee_id,
          AttendanceNumber,
          Location,
          LocationCountry,
          LegalEntity,
          BusinessUnit,
          Department,
          SubDepartment,
          JobTitle,
          SecondaryJobTitle,
          ReportingTo,
          ReportingManagerEmployeeNumber,
          DottedLineManager,
          DateJoined,
          LeavePlan,
          Band,
          PayGrade,
          TimeType,
          WorkerType,
          ShiftPolicyName,
          WeeklyOffPolicyName,
          AttendanceTimeTrackingPolicy,
          AttendanceCaptureScheme,
          HolidayListName,
          ExpensePolicyName,
          NoticePeriod,
          CostCenter,
        ]
      );

      return {
        success: true,
        statusCode: 201,
        message: "Employment details inserted successfully.",
        data: { employment_id: result.insertId },
      };
    } catch (error: any) {
      console.error("Error inserting employment details:", error);
      return {
        success: false,
        statusCode: 500,
        message: "Internal server error.",
        error: error.message,
      };
    }
  }
  editEmployement_details(req: Request, res: Response): Promise<any> {
    throw new Error("Method not implemented.");
  }
  deleteEmployement_details(req: Request, res: Response): Promise<any> {
    throw new Error("Method not implemented.");
  }
  viewEmployement_details(req: Request, res: Response): Promise<any> {
    throw new Error("Method not implemented.");
  }

  async addExitdetails(req: Request, res: Response): Promise<any> {
   const {
      employee_id,
      EmploymentStatus,
      ExitDate,
      Comments,
      ExitStatus,
      TerminationType,
      TerminationReason,
      ResignationNote
    } = req.body;

    try {
      const [result]: any = await pool.query(
        `INSERT INTO exit_details 
        (employee_id, employment_status, exit_date, comments, exit_status, termination_type, termination_reason, resignation_note) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          employee_id,
          EmploymentStatus,
          ExitDate,
          Comments,
          ExitStatus,
          TerminationType,
          TerminationReason,
          ResignationNote
        ]
      );

      return { success: true, message: "Exit details added successfully", insertId: result.insertId };
    } catch (error) {
      console.error("Error inserting exit details:", error);
      throw error;
    }
  }
   
  viewExitdetails(req: Request, res: Response): Promise<any> {
    throw new Error("Method not implemented.");
  }
  deleteExitdetails(req: Request, res: Response): Promise<any> {
    throw new Error("Method not implemented.");
  }
  editExitdetails(req: Request, res: Response): Promise<any> {
    throw new Error("Method not implemented.");
  }
  async addFamilyInfo(req: Request, res: Response): Promise<any> {
    try {
      const { employee_id, FatherName, MotherName, SpouseName, ChildrenNames } =
        req.body;
      if (!employee_id) {
        return {
          success: false,
          statusCode: 400,
          message: "Missing required fields.",
          error: "Validation Error",
        };
      }
      const [result]: any = await pool.query(
        `INSERT INTO family_info 
        (employee_id, father_name, mother_name, spouse_name, children_names)
        VALUES (?, ?, ?, ?, ?)`,
        [employee_id, FatherName, MotherName, SpouseName, ChildrenNames]
      );
      return {
        success: true,
        statusCode: 201,
        message: "Employee Family Details inserted successfully.",
        data: { employee_id },
      };
    } catch (error: any) {
      console.error("Error inserting employee:", error);
      return {
        success: false,
        statusCode: 500,
        message: "Internal server error.",
        error: error.message,
      };
    }
  }
  viewFamilyInfo(req: Request, res: Response): Promise<any> {
    throw new Error("Method not implemented.");
  }
  deleteFamilyInfo(req: Request, res: Response): Promise<any> {
    throw new Error("Method not implemented.");
  }
  editFamilyInfo(req: Request, res: Response): Promise<any> {
    throw new Error("Method not implemented.");
  }
  async addStatutoryInfo(req: Request, res: Response): Promise<any> {
    try {
      const { employee_id, PANNumber, AadhaarNumber, PFNumber, UANNumber } =
        req.body;
      if (!employee_id) {
        return {
          success: false,
          statusCode: 400,
          message: "Missing required fields.",
          error: "Validation Error",
        };
      }
      const [result]: any = await pool.query(
        `INSERT INTO statutory_info 
        (employee_id, pan_number, aadhaar_number, pf_number, uan_number)
        VALUES (?, ?, ?, ?, ?)`,
        [employee_id, PANNumber, AadhaarNumber, PFNumber, UANNumber]
      );
      return {
        success: true,
        statusCode: 201,
        message: "Employee Statutory info inserted successfully.",
        data: { employee_id },
      };
    } catch (error: any) {
      console.error("Error inserting employee:", error);
      return {
        success: false,
        statusCode: 500,
        message: "Internal server error.",
        error: error.message,
      };
    }
  }
  viewStatutoryInfo(req: Request, res: Response): Promise<any> {
    throw new Error("Method not implemented.");
  }
  deleteStatutoryInfo(req: Request, res: Response): Promise<any> {
    throw new Error("Method not implemented.");
  }
  editStatutoryInfo(req: Request, res: Response): Promise<any> {
    throw new Error("Method not implemented.");
  }
}

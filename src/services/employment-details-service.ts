import { Request } from "express";
import { pool } from "../config/database";

export default class EmploymentDetailsService {
  async insertEmploymentDetails(req: Request) {
    try {
      const data = req.body;

      const {
        EmployeeNumber,
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

      // Basic field check
      if (!EmployeeNumber || !AttendanceNumber || !Location || !JobTitle) {
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
          EmployeeNumber, // assuming employee_id = EmployeeNumber
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
}

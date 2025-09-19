// src/routes/candidates/putRoutes.ts
import { Router, Request, Response } from "express";
import { pool } from "../../config/database";

const putRouter = Router();

/* UPDATE personal */
putRouter.put("/:id/personal", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { FirstName, MiddleName, LastName, PhoneNumber, email, gender, initials } = req.body;
  try {
    await pool.query(
      `UPDATE personal_details
       SET FirstName=?, MiddleName=?, LastName=?, PhoneNumber=?, email=?, gender=?, initials=?
       WHERE candidate_id=?`,
      [FirstName, MiddleName, LastName, PhoneNumber, email, gender, initials, id]
    );
    res.json({ message: "Personal details updated successfully" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

/* UPDATE job */
putRouter.put("/:id/job", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { JobTitle, Department, JobLocation, WorkType, BussinessUnit } = req.body;
  try {
    await pool.query(
      `UPDATE job_details
       SET JobTitle=?, Department=?, JobLocation=?, WorkType=?, BussinessUnit=?
       WHERE candidate_id=?`,
      [JobTitle, Department, JobLocation, WorkType, BussinessUnit, id]
    );
    res.json({ message: "Job details updated successfully" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

/* UPDATE offer */
putRouter.put("/update/offer", async (req: Request, res: Response) => {
  const { DOJ, offerValidity, id } = req.body;
  try {
    await pool.query(
      `UPDATE offer_details
       SET DOJ=?, offerValidity=?
       WHERE candidate_id=?`,
      [DOJ, offerValidity, id]
    );
    res.json({ message: "Offer details updated successfully" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

/* UPDATE credentials */
putRouter.put("/:id/credentials", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { companyEmail, password } = req.body;
  try {
    await pool.query(
      `UPDATE employee_credentials
       SET companyEmail=?, password=?
       WHERE candidate_id=?`,
      [companyEmail, password, id]
    );
    res.json({ message: "Employee credentials updated successfully" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default putRouter;

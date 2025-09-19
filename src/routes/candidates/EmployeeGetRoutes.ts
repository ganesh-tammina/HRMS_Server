// src/routes/candidates/getRoutes.ts
import { Router, Request, Response } from "express";
import { pool } from "../../config/database";

const getRouter = Router();

/* READ all candidates */
getRouter.get("/", async (req: Request, res: Response) => {
  const [rows]: any = await pool.query(
    `SELECT c.id,
            p.FirstName, p.MiddleName, p.LastName, p.PhoneNumber, p.email, p.gender, p.initials,
            j.JobTitle, j.Department, j.JobLocation, j.WorkType, j.BussinessUnit,
            o.DOJ, o.offerValidity, o.JoiningDate,
            e.companyEmail, e.password
     FROM candidates c
     LEFT JOIN personal_details p ON c.id = p.candidate_id
     LEFT JOIN job_details j ON c.id = j.candidate_id
     LEFT JOIN offer_details o ON c.id = o.candidate_id
     LEFT JOIN employee_credentials e ON c.id = e.candidate_id`
  );
  const formatted = rows.map((row: any) => ({
    id: row.id,
    personalDetails: {
      FirstName: row.FirstName,
      MiddleName: row.MiddleName,
      LastName: row.LastName,
      PhoneNumber: row.PhoneNumber,
      email: row.email,
      gender: row.gender,
      initials: row.initials,
    },
    jobDetailsForm: {
      JobTitle: row.JobTitle,
      Department: row.Department,
      JobLocation: row.JobLocation,
      WorkType: row.WorkType,
      BussinessUnit: row.BussinessUnit,
    },
    offerDetails: {
      DOJ: row.DOJ,
      offerValidity: row.offerValidity,
      JoiningDate: row.JoiningDate,
    },
    employeeCredentials: {
      companyEmail: row.companyEmail,
      password: row.password,
    },
  }));
  res.json({ candidates: formatted });
});

/* READ candidate by ID */
getRouter.get("/:id", async (req: Request, res: Response) => {
  const [rows]: any = await pool.query(
    `SELECT c.id,
            p.FirstName, p.MiddleName, p.LastName, p.PhoneNumber, p.email, p.gender, p.initials,
            j.JobTitle, j.Department, j.JobLocation, j.WorkType, j.BussinessUnit,
            o.DOJ, o.offerValidity, o.JoiningDate,
            e.companyEmail, e.password
     FROM candidates c
     LEFT JOIN personal_details p ON c.id = p.candidate_id
     LEFT JOIN job_details j ON c.id = j.candidate_id
     LEFT JOIN offer_details o ON c.id = o.candidate_id
     LEFT JOIN employee_credentials e ON c.id = e.candidate_id
     WHERE c.id = ?`,
    [req.params.id]
  );
  if (!rows.length) return res.status(404).send("Candidate not found");
  res.json(rows[0]);
});

/* READ each section separately */
getRouter.get("/:id/personal", async (req: Request, res: Response) => {
  const [rows]: any = await pool.query("SELECT * FROM personal_details WHERE candidate_id = ?", [req.params.id]);
  res.json({ candidateId: req.params.id, personalDetails: rows[0] || {} });
});

getRouter.get("/:id/job", async (req: Request, res: Response) => {
  const [rows]: any = await pool.query("SELECT * FROM job_details WHERE candidate_id = ?", [req.params.id]);
  res.json({ candidateId: req.params.id, jobDetailsForm: rows[0] || {} });
});

getRouter.get("/:id/offer", async (req: Request, res: Response) => {
  const [rows]: any = await pool.query("SELECT * FROM offer_details WHERE candidate_id = ?", [req.params.id]);
  res.json({ candidateId: req.params.id, offerDetails: rows[0] || {} });
});

getRouter.get("/:id/credentials", async (req: Request, res: Response) => {
  const [rows]: any = await pool.query("SELECT * FROM employee_credentials WHERE candidate_id = ?", [req.params.id]);
  res.json({ candidateId: req.params.id, employeeCredentials: rows[0] || {} });
});

export default getRouter;

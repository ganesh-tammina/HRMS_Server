import { Router, Request, Response } from "express";
import { pool } from "../config/database";

const router = Router();

/* -------------------- CREATE candidate -------------------- */
router.post("/", async (req: Request, res: Response) => {
  const conn = await pool.getConnection();
  try {
    const { personalDetails, jobDetailsForm, offerDetails, employeeCredentials } = req.body;

    await conn.beginTransaction();

    // Insert into candidates master table
    const [candidateResult]: any = await conn.query("INSERT INTO candidates VALUES ()");
    const candidateId = candidateResult.insertId;

    // Insert personal details
    await conn.query(
      `INSERT INTO personal_details 
       (candidate_id, FirstName, MiddleName, LastName, PhoneNumber, email, gender, initials) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        candidateId,
        personalDetails.FirstName,
        personalDetails.MiddleName,
        personalDetails.LastName,
        personalDetails.PhoneNumber,
        personalDetails.email,
        personalDetails.gender,
        personalDetails.initials,
      ]
    );

    // Insert job details
    await conn.query(
      `INSERT INTO job_details 
       (candidate_id, JobTitle, Department, JobLocation, WorkType, BussinessUnit) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        candidateId,
        jobDetailsForm.JobTitle,
        jobDetailsForm.Department,
        jobDetailsForm.JobLocation,
        jobDetailsForm.WorkType,
        jobDetailsForm.BussinessUnit,
      ]
    );

    // Insert offer details
    await conn.query(
      `INSERT INTO offer_details 
       (candidate_id, DOJ, offerValidity, JoiningDate) 
       VALUES (?, ?, ?, ?)`,
      [candidateId, offerDetails.DOJ, offerDetails.offerValidity, offerDetails.JoiningDate]
    );

    // Insert employee credentials
    await conn.query(
      `INSERT INTO employee_credentials 
       (candidate_id, companyEmail, password) 
       VALUES (?, ?, ?)`,
      [candidateId, employeeCredentials.companyEmail, employeeCredentials.password]
    );

    await conn.commit();
    res.status(201).json({ message: "Candidate created successfully", candidateId });
  } catch (err: any) {
    await conn.rollback();
    res.status(500).json({ error: err.message });
  } finally {
    conn.release();
  }
});

/* -------------------- READ all candidates -------------------- */
router.get("/", async (req: Request, res: Response) => {
  const [rows] = await pool.query(
    `SELECT c.id,
            p.FirstName, p.MiddleName, p.LastName, p.PhoneNumber, p.email, p.gender, p.initials,
            j.JobTitle, j.Department, j.JobLocation, j.WorkType, j.BussinessUnit,
            o.DOJ, o.offerValidity, o.JoiningDate,
            e.companyEmail
     FROM candidates c
     LEFT JOIN personal_details p ON c.id = p.candidate_id
     LEFT JOIN job_details j ON c.id = j.candidate_id
     LEFT JOIN offer_details o ON c.id = o.candidate_id
     LEFT JOIN employee_credentials e ON c.id = e.candidate_id`
  );
  res.json(rows);
});

/* -------------------- READ candidate by ID -------------------- */
router.get("/:id", async (req: Request, res: Response) => {
  const [rows]: any = await pool.query(
    `SELECT c.id,
            p.FirstName, p.MiddleName, p.LastName, p.PhoneNumber, p.email, p.gender, p.initials,
            j.JobTitle, j.Department, j.JobLocation, j.WorkType, j.BussinessUnit,
            o.DOJ, o.offerValidity, o.JoiningDate,
            e.companyEmail
     FROM candidates c
     LEFT JOIN personal_details p ON c.id = p.candidate_id
     LEFT JOIN job_details j ON c.id = j.candidate_id
     LEFT JOIN offer_details o ON c.id = o.candidate_id
     LEFT JOIN employee_credentials e ON c.id = e.candidate_id
     WHERE c.id = ?`,
    [req.params.id]
  );

  if (rows.length === 0) return res.status(404).send("Candidate not found");
  res.json(rows[0]);
});

/* -------------------- UPDATE whole candidate -------------------- */
router.put("/:id", async (req: Request, res: Response) => {
  const { personalDetails, jobDetailsForm, offerDetails, employeeCredentials } = req.body;
  const candidateId = req.params.id;

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    await conn.query(
      `UPDATE personal_details 
       SET FirstName=?, MiddleName=?, LastName=?, PhoneNumber=?, email=?, gender=?, initials=? 
       WHERE candidate_id=?`,
      [
        personalDetails.FirstName,
        personalDetails.MiddleName,
        personalDetails.LastName,
        personalDetails.PhoneNumber,
        personalDetails.email,
        personalDetails.gender,
        personalDetails.initials,
        candidateId,
      ]
    );

    await conn.query(
      `UPDATE job_details 
       SET JobTitle=?, Department=?, JobLocation=?, WorkType=?, BussinessUnit=? 
       WHERE candidate_id=?`,
      [
        jobDetailsForm.JobTitle,
        jobDetailsForm.Department,
        jobDetailsForm.JobLocation,
        jobDetailsForm.WorkType,
        jobDetailsForm.BussinessUnit,
        candidateId,
      ]
    );

    await conn.query(
      `UPDATE offer_details 
       SET DOJ=?, offerValidity=?, JoiningDate=? 
       WHERE candidate_id=?`,
      [offerDetails.DOJ, offerDetails.offerValidity, offerDetails.JoiningDate, candidateId]
    );

    await conn.query(
      `UPDATE employee_credentials 
       SET companyEmail=?, password=? 
       WHERE candidate_id=?`,
      [employeeCredentials.companyEmail, employeeCredentials.password, candidateId]
    );

    await conn.commit();
    res.json({ message: "Candidate updated successfully" });
  } catch (err: any) {
    await conn.rollback();
    res.status(500).json({ error: err.message });
  } finally {
    conn.release();
  }
});

/* -------------------- UPDATE parts separately -------------------- */
// Update personal details
router.put("/:id/update/personal", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { FirstName, MiddleName, LastName, PhoneNumber, email, gender, initials } = req.body;

  try {
    await pool.query(
      `UPDATE personal_details 
       SET FirstName=?, MiddleName=?, LastName=?, PhoneNumber=?, email=?, gender=?, initials=? 
       WHERE candidate_id=?`,
      [FirstName, MiddleName, LastName, PhoneNumber, email, gender, initials, id]
    );
    res.json({ message: "✅ Personal details updated successfully" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Update job details
router.put("/:id/update/job", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { JobTitle, Department, JobLocation, WorkType, BussinessUnit } = req.body;

  try {
    await pool.query(
    `UPDATE job_details 
       SET JobTitle=?, Department=?, JobLocation=?, WorkType=?, BussinessUnit=? 
       WHERE candidate_id=?`,
      [JobTitle, Department, JobLocation, WorkType, BussinessUnit, id]
    );
    res.json({ message: "✅ Job details updated successfully" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Update offer details
router.put("/:id/update/offer", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { DOJ, offerValidity, JoiningDate } = req.body;

  try {
    await pool.query(
      `UPDATE offer_details 
       SET DOJ=?, offerValidity=?, JoiningDate=? 
       WHERE candidate_id=?`,
      [DOJ, offerValidity, JoiningDate, id]
    );
    res.json({ message: "✅ Offer details updated successfully" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Update employee credentials
router.put("/:id/update/credentials", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { companyEmail, password } = req.body;

  try {
    await pool.query(
      `UPDATE employee_credentials 
       SET companyEmail=?, password=? 
       WHERE candidate_id=?`,
      [companyEmail, password, id]
    );
    res.json({ message: "✅ Employee credentials updated successfully" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

/* -------------------- DELETE candidate -------------------- */
router.delete("/:id", async (req: Request, res: Response) => {
  const [result]: any = await pool.query("DELETE FROM candidates WHERE id=?", [req.params.id]);
  if (result.affectedRows === 0) return res.status(404).send("Candidate not found");
  res.send("Candidate deleted successfully");
});

export default router;

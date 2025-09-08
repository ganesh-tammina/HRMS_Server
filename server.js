const express = require("express");
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Fake Database (in-memory)
let employees = [
  { id: 1, name: "Siva", role: "Developer" },
  { id: 2, name: "Ramesh", role: "Designer" }
];

// -------------------- CRUD APIs --------------------

// GET all employees
app.get("/employees", (req, res) => {
  res.json(employees);
});

// GET single employee
app.get("/employees/:id", (req, res) => {
  const emp = employees.find(e => e.id === parseInt(req.params.id));
  if (!emp) return res.status(404).send("Employee not found");
  res.json(emp);
});

// CREATE new employee
app.post("/employees", (req, res) => {
  const newEmp = {
    id: employees.length + 1,
    name: req.body.name,
    role: req.body.role
  };
  employees.push(newEmp);
  res.status(201).json(newEmp);
});

// UPDATE employee
app.put("/employees/:id", (req, res) => {
  const emp = employees.find(e => e.id === parseInt(req.params.id));
  if (!emp) return res.status(404).send("Employee not found");

  emp.name = req.body.name || emp.name;
  emp.role = req.body.role || emp.role;
  res.json(emp);
});

// DELETE employee
app.delete("/employees/:id", (req, res) => {
  employees = employees.filter(e => e.id !== parseInt(req.params.id));
  res.send("Employee deleted successfully");
});

// ---------------------------------------------------

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

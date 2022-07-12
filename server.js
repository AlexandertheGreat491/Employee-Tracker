//imported modules
const express = require("express");
const inquirer = require("inquirer");
const db = require("./db/connection");
const apiRoutes = require("./routes/apiRoutes");
const inputCheck = require("./utils/inputCheck");

const PORT = process.env.PORT || 3001;
const app = express();

//Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', apiRoutes);

//Directs the app to use apiRoutes
app.use("/api", apiRoutes);


//test route for the server
//app.get("/", (req, res) => {
//res.json({
//message: "Hello World",
//});
//});

//roles routes

//All roles
app.get("/api/roles", (req, res) => {
  const sql = "SELECT * FROM roles";
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

//route for a single role
app.get("/api/role/:id", (req, res) => {
  const sql = `SELECT * FROM roles WHERE id =?`;
  const params = [req.params.id];
  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: row,
    });
  });
});

//route to delete a role
app.delete("/api/role/:id", (req, res) => {
  const sql = `DELETE FROM roles WHERE id = ?`;
  const params = [req.params.id];
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: res.message });
      // this will check if anything was deleted
    } else if (!result.affectedRows) {
      res.json({
        message: "Role not found",
      });
    } else {
      res.json({
        message: "deleted",
        changes: result.affectedRows,
        id: req.params.id,
      });
    }
  });
});

app.put("/api/role/:id", (req, res) => {
  const errors = inputCheck(req.body, "roles_id");
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }
  const sql = `UPDATE departments SET roles_id = ?
               WHERE id = ?`;
  const params = [req.body.deparments_id, req.params.id];
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      // This will check if a record was found.
    } else if (!result.affectedRows) {
      res.json({
        message: "Role not found",
      });
    } else {
      res.json({
        message: "success",
        data: req.body,
        changes: result.affectedRows,
      });
    }
  });
});

//employees routes

//route for all employees
app.get("/api/employees", (req, res) => {
  const sql = `SELECT * FROM employees`;
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

//route for a single employee
app.get("/api/employee/:id", (req, res) => {
  const sql = `SELECT * FROM roles WHERE id =?`;
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: row,
    });
  });
});

//route to DELETE an employee
app.delete("/api/employee/:id", (req, res) => {
  const sql = `DELETE FROM employees WHERE id = ?`;
  const params = [req.params.id];
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: res.message });
      // this will check if anything was deleted
    } else if (!result.affectedRows) {
      res.json({
        message: "Employee not found",
      });
    } else {
      res.json({
        message: "deleted",
        changes: result.affectedRows,
        id: req.params.id,
      });
    }
  });
});

//route to update employee
app.put("/api/employees/:id", (req, res) => {
  const errors = inputCheck(req.body, "employee_id");
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }
  const sql = `UPDATE departments SET employee_id = ?
               WHERE id = ?`;
  const params = [req.body.deparments_id, req.params.id];
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      // This will check if a record was found.
    } else if (!result.affectedRows) {
      res.json({
        message: "Employee not found",
      });
    } else {
      res.json({
        message: "success",
        data: req.body,
        changes: result.affectedRows,
      });
    }
  });
});

// The default response for any other request.
app.use((req, res) => {
  res.status(404).end();
});

// Server is started after a database connection
db.connect((err) => {
  if (err) throw err;
  console.log("You are connected to the employee database!");

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

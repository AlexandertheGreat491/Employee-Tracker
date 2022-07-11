//imported modules
const express = require("express");
const inquirer = require("inquirer");
const db = require("./db/connection");
//const apiRoutes = require("./routes/apiRoutes");
const inputCheck = require("./utils/inputCheck");

const PORT = process.env.PORT || 3001;
const app = express();

//Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Directs the app to use apiRoutes
//app.use("/api", apiRoutes);

//All departments
app.get("/api/departments", (req, res) => {
  const sql = `SELECT * FROM departments.*, roles.name
                AS role_name
                FROM departments
                RIGHT JOIN roles
                ON roles.departments_id = roles.id`;

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

//GET a single department
app.get("/api/department/:id", (req, res) => {
  const sql = `SELECT * FROM departments.*, roles.name
               AS role_name
               FROM departments
               RIGHT JOIN roles
               ON roles.departments_id = roles.id
               WHERE departments.id = ?`;
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

//Delete a department
app.delete("/api/department/:id", (req, res) => {
  const sql = `DELETE FROM departments WHERE ID = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: "Department not found",
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

//Create a department
app.post("/api/department", ({ body }, res) => {
  const errors = inputCheck(
    body, 
    "id", 
    "name");
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `INSERT INTO departments (id, name)
  VALUES (?, ?)`;
  const params = [body.id, body.name];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: body,
    });
  });
});

//test route for the server
//app.get("/", (req, res) => {
//res.json({
//message: "Hello World",
//});
//});

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

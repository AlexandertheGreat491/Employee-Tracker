//imported modules
const express = require("express");
const inquirer = require("inquirer");
const db = require("./db/connection");
//const apiRoutes = require("./routes/apiRoutes");

const PORT = process.env.PORT || 3001;
const app = express();

//Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Directs the app to use apiRoutes
//app.use("/api", apiRoutes);

//All departments
app.get("/api/departments", (req, res) => {
  const sql = `SELECT * FROM departments`;

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
  const sql = `SELECT * FROM departments WHERE id = ?`;
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
//db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
//if (err) {
//console.log(err);
//}
//console.log(result);
//});

//Create a department
//const sql = `INSERT INTO departments (id, name)
//VALUES (?, ?)`;
//const params = [5, "Human Resources"];

//db.query(sql, params, (err, result) => {
//if (err) {
//console.log(err);
//}
//console.log(result);
//});

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

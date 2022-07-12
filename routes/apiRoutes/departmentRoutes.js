const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');


//departments/department routes

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
    const errors = inputCheck(body, "id", "name");
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
  
  // Update a department route
  app.put("/api/department/:id", (req, res) => {
    const errors = inputCheck(req.body, "departments_id");
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }
    const sql = `UPDATE departments SET departments_id = ?
                 WHERE id = ?`;
    const params = [req.body.deparments_id, req.params.id];
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        // This will check if a record was found.
      } else if (!result.affectedRows) {
        res.json({
          message: "Department not found",
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
  
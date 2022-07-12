//imported modules
const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const { appendFile } = require("fs");
const { options, choices } = require("yargs");
const { allowedNodeEnvironmentFlags } = require("process");

//Connect to the database
const createConnection = mysql.createConnection(
  {
    host: "localhost",
    port: 3001,
    user: "root",
    password: "Winston123@$",
    database: "employee",
  },
  console.log("Connected to the employee database.")
);

//connects to server and database
createConnection.connect(function (err) {
  if (err) throw err;
  choices();
});

// User is prompted with a list of options to choose from.
function choices() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message:
        "Welcome to the employee database! Please select what you would like to do.",
      choices: [
        "View all employees",
        "View all departments",
        "View all roles",
        "Add an employee",
        "Add a role",
        "Update employee role",
        "Delete an employee",
        "EXIT",
      ],
    })
    .then(function (response) {
      switch (response.action) {
        case "View all employees":
          viewEmployees();
          break;
        case "View all departments":
          viewDepartments();
          break;
        case "View all roles":
          viewRoles();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Add a Department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Update employee role":
          updateRole();
          break;
        case "Delete an employee":
          deleteEmployee();
          break;
        case "EXIT":
          exitApp();
          break;
        default:
          break;
      }
    });
}

//View all of the employees in the database.
function viewEmployees() {
  let query = `SELECT * FROM employees`;
  createConnection.query(query, function (err, res) {
    if (err) throw err;
    console.log(res.length + "employees were found!");
    console.table("All Employees:", res);
    choices();
  });
}

//View all departments in the database.
function viewDepartments() {
  let query = `SELECT * FROM departments`;
  createConnection.query(query, function (err, res) {
    if (err) throw err;
    console.table("All Departments:", res);
    choices();
  });
}

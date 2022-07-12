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
  starterMenu();
});

// User is prompted with a list of options to choose from.
function starterMenu() {
  inquirer
    .prompt({
      name: "starterMenu",
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
        "EXIT",
      ],
    })
    .then(function (answer) {
      switch (answer.starterMenu) {
        case "View all employees":
          viewAllEmployees();
          break;
        case "View all departments":
          viewAllDepartments();
          break;
        case "View all roles":
          viewAllRoles();
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
        case "EXIT":
          exitApp();
          break;
        default:
          break;
      }
    });
}

//View all of the employees in the database.
function viewAllEmployees() {
  let query = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name AS department, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department on role.department_id = department.id`;
  createConnection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    starterMenu();
  });
}

//View all departments in the database.
function viewAllDepartments() {
  let query = `SELECT * FROM departments`;
  createConnection.query(query, function (err, res) {
    console.table(res);
    starterMenu();
  });
}

//View all roles in the database
function viewAllRoles() {
  let query = `SELECT * FROM roles`;
  createConnection.query(query, function (err, res) {
    console.table(res);
    choices();
  });
}

//Add an employee to the database.
function addEmployee() {
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is the employee's first name?",
      },
      {
        name: "lastName",
        type: "input",
        message: "What is the employee's last name?",
      },
      {
        name: "addEmployMan",
        type: "input",
        message: "What is the employee's role ID?",
      },
      {
        name: "addEmployRole",
        message: "What is the employee's role ID?",
      },
    ])
    .then(function (res) {
      const firstName = res.firstName;
      const lastName = res.lastName;
      const employRoleID = res.addEmployRole;
      const employManID = res.addEmployMan;
      const query = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${firstName}", "${lastName}", "${employRoleID}", "${employManID}")`;
      createConnection.query(query, function (err, res) {
        if (err) {
          throw err;
        }
        console.table(res);
        starterMenu();
      });
    });
}

//Add a department to the database.
function addDepartment() {
  inquirer
    .prompt([
      {
        name: "newDepartment",
        type: "input",
        message: "Which department would you like to add?",
      },
    ])
    .then(function (res) {
      const newDepartment = res.newDept;
      const query = `INSERT INTO departments (department_name) VALUES ("${newDepartment}")`;
      createConnection.query(query, function (err, res) {
        if (err) {
          throw err;
        }
        console.table(res);
        starterMenu();
      });
    });
}

//Add a role to the database.
function addRole() {
  createConnection.query("SELECT * FROM departments", function (err, res) {
    if (err) throw err;

    inquirer
      .prompt([
        {
          name: "new_role",
          type: "input",
          message: "What new role would you like to add?",
        },
        {
          name: "salary",
          type: "input",
          message: "What is the salary of this role? (Enter a number)",
        },
        {
          name: "Department",
          type: "list",
          choices: function () {
            let deptArray = [];
            for (let i = 0; i < res.length; i++) {
              deptArray.push(res[i].name);
            }
            return deptArray;
          },
        },
      ])
      .then(function (response) {
        let departments_id;
        for (let a = 0; a < res.length; a++) {
          if (res[a].name == response.Department) {
            departments_id = res[a].id;
          }
        }
        createConnection.query(
          "INSERT INTO roles SET ?",
          {
            title: response.new_role,
            salary: response.salary,
            departments_id: departments_id,
          },
          function (err, res) {
            if (err) throw err;
            console.log("Your new role has been added!");
            console.table("All Roles:", res);
            choices();
          }
        );
      });
  });
}

//Update a role in the database.
function updateRole() {}

//Delete an employee
function deleteEmployee() {}

//Exit the app.
function exitApp() {
  createConnection.end();
}

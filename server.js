//imported modules
const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

//Connect to the database
const createConnection = mysql.createConnection(
  {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Winston123@$",
    database: "employee",
  },
  console.log("Connected to the employee database.")
);

// connects to sql server and sql database
createConnection.connect(function (err) {
  if (err) throw err;
  choices();
});

// prompts user with list of options to choose from
function choices() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "Welcome to our employee database! What would you like to do?",
      choices: [
        "View all employees",
        "View all departments",
        "View all roles",
        "Add an employee",
        "Add a department",
        "Add a role",
        "Update employee role",
        "Delete an employee",
        "EXIT",
      ],
    })
    .then(function (answer) {
      switch (answer.action) {
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
        case "Add a department":
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

// view all employees in the database
function viewEmployees() {
  const query = "SELECT * FROM employee";
  createConnection.query(query, function (err, res) {
    if (err) throw err;
    console.log(res.length + " employees found!");
    console.table("All Employees:", res);
    choices();
  });
}

// view all departments in the database
function viewDepartments() {
  const query = "SELECT * FROM department";
  createConnection.query(query, function (err, res) {
    if (err) throw err;
    console.table("All Departments:", res);
    choices();
  });
}

// view all roles in the database
function viewRoles() {
  const query = "SELECT * FROM role";
  createConnection.query(query, function (err, res) {
    if (err) throw err;
    console.table("All Roles:", res);
    choices();
  });
}

// add an employee to the database
function addEmployee() {
  createConnection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "first_name",
          type: "input",
          message: "What is the employee's fist name? ",
        },
        {
          name: "last_name",
          type: "input",
          message: "What is the employee's last name? ",
        },
        {
          name: "manager_id",
          type: "input",
          message: "What is the employee's manager's ID? ",
        },
        {
          name: "role",
          type: "list",
          choices: function () {
            let roleArray = [];
            for (let i = 0; i < res.length; i++) {
              roleArray.push(res[i].title);
            }
            return roleArray;
          },
          message: "What is this employee's role? ",
        },
      ])
      .then(function (answer) {
        let role_id;
        for (let a = 0; a < res.length; a++) {
          if (res[a].title == answer.role) {
            role_id = res[a].id;
            console.log(role_id);
          }
        }
        createConnection.query(
          "INSERT INTO employee SET ?",
          {
            first_name: answer.first_name,
            last_name: answer.last_name,
            manager_id: answer.manager_id,
            role_id: role_id,
          },
          function (err) {
            if (err) throw err;
            console.log("Your employee has been added!");
            choices();
          }
        );
      });
  });
}

// add a department to the database
function addDepartment() {
  inquirer
    .prompt([
      {
        name: "newDepartment",
        type: "input",
        message: "Which department would you like to add?",
      },
    ])
    .then(function (answer) {
      createConnection.query("INSERT INTO department SET ?", {
        name: answer.newDepartment,
      });
      const query = "SELECT * FROM department";
      createConnection.query(query, function (err, res) {
        if (err) throw err;
        console.log("Your department has been added!");
        console.table("All Departments:", res);
        choices();
      });
    });
}

// add a role to the database
function addRole() {
  createConnection.query("SELECT * FROM department", function (err, res) {
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
            let deptArry = [];
            for (let i = 0; i < res.length; i++) {
              deptArry.push(res[i].name);
            }
            return deptArry;
          },
        },
      ])
      .then(function (answer) {
        let department_id;
        for (let a = 0; a < res.length; a++) {
          if (res[a].name == answer.Department) {
            department_id = res[a].id;
          }
        }

        createConnection.query(
          "INSERT INTO role SET ?",
          {
            title: answer.new_role,
            salary: answer.salary,
            department_id: department_id,
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

// update a role in the database
function updateRole() {
  createConnection.query("SELECT * FROM employee", function (err, result) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "employeeName",
          type: "list",
          message: "Which employee's role is changing?",
          choices: function () {
            let employeeArray = [];
            result.forEach((result) => {
              employeeArray.push(result.last_name);
            });
            return employeeArray;
          },
        },
      ])
      .then(function (answer) {
        console.log(answer);
        const name = answer.employeeName;

        createConnection.query("SELECT * FROM role", function (err, res) {
          inquirer
            .prompt([
              {
                name: "role",
                type: "list",
                message: "What is their new role?",
                choices: function () {
                  let roleArray = [];
                  res.forEach((res) => {
                    roleArray.push(res.title);
                  });
                  return roleArray;
                },
              },
            ])
            .then(function (roleAnswer) {
              const role = roleAnswer.role;
              console.log(role);
              createConnection.query(
                "SELECT * FROM role WHERE title = ?",
                [role],
                function (err, res) {
                  if (err) throw err;
                  let roleId = res[0].id;

                  let query =
                    "UPDATE employee SET role_id = ? WHERE last_name = ?";
                  let values = [parseInt(roleId), name];

                  createConnection.query(
                    query,
                    values,
                    function (err, res, fields) {
                      console.log(
                        `You have updated ${name}'s role to ${role}.`
                      );
                    }
                  );
                  viewRoles();
                }
              );
            });
        });
      });
  });
}


// exit the app
function exitApp() {
  createConnection.end();
}

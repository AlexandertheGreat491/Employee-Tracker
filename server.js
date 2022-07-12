//imported modules
const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const { appendFile } = require('fs');
const { options, choices } = require('yargs');



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
createConnection.connect(function(err){
  if (err) throw err;
  choices();
})

// User is prompted with a list of options to choose from.
function choices() {
  inquirer.prompt({
    name: 'action',
    type: 'list',
    message: 'Welcome to the employee database! Please select what you would like to do.',
    choices: [
      'View all employees',
      'View all departments',
      'View all roles',
      'Add an employee',
      'Add a role',
      'Update employee role',
      'Delete an employee',
      'EXIT'
    ]
  })
}



















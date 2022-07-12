//imported modules
const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const db = require('./db/connection');

//Connect to the database
const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "Winston123@$",
        database: "employee",
    },
    console.log("Connected to the employee database.")
);

module.exports = db;













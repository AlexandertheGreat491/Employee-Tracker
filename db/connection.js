const mysql = require("mysql2");

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
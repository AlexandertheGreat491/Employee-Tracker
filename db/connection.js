const mysql = require("mysql2");

//Connect to the database
const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "Winston123@$",
        database: "employee manager",
    },
    console.log("Connected to the employee manager database.")
);

module.exports = db;
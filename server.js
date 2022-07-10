//imported modules
const express = require("express");
const inquirer = require("inquirer");
const db = require("./db/connection");
const apiRoutes = require("./routes/apiRoutes");

const PORT = process.env.PORT || 3001;
const app = express();

//Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Directs the app to use apiRoutes
app.use("/api", apiRoutes);

// The default response for any other request.
app.use((req, res) => {
  res.status(404).end();
});

// Server is started after a database connection
db.connect((err) => {
  if (err) throw err;
  console.log("You are connected to the database!");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

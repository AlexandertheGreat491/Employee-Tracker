//imported modules
const express = require('express');
const router = express.Router();
const inquirer = require("inquirer");

//all the routes
router.use('./departmentRoutes');
router.use('./roleRoutes');
router.use('./employeeRoutes');


//module exports for router
module.exports = router;
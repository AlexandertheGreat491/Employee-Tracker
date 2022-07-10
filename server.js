//imported modules
const express = require('express');
const inquirer = require('inquirer');
const db = require('./db/connection');
const apiRoutes = require('./routes/apiRoutes');

const PORT = process.env.PORT || 3001;
const app = express();

//Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Directs the app to use apiRoutes
app.use('/api', apiRoutes);

// The default response for any other request.
app.use((req, res) => {
    res.status(404).end();
})
const express = require('express');
const app = express();
const path = require('path');
const winston = require('winston');
const mongoose = require('mongoose');

const router = express.Router();

const port = process.env.PORT || 3000;

require('./setup/logging')();
require('./setup/db')(mongoose);
require('./setup/routes')(app, router);
require('./setup/config')();

app.listen(port, () =>{
    console.log('Server started..');
    console.log(`Listening on port ${port}`);
    winston.info(`Listening on port ${port}`);
});

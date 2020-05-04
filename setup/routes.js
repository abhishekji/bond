const express = require('express');
const cookieParser = require('cookie-parser');

const himalayanRivers = require('../routes/himalayanRivers');
const users = require('../routes/users');
const err = require('../middleware/error');

module.exports = function(app, router) {
    app.use(express.json());
  //  app.use('/rivers', subApp);
    app.use('/rivers/himalayas/north', himalayanRivers);
    app.use('/users', users);
    app.use('/', (req, res, next) => {
        res.status(404).send('Welcome please enter the required url for the rivers..');
    })
    app.use(err);
}

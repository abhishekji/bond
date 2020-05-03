const winston = require('winston');

module.exports = (err, req, res, next) => {
    winston.error(err);
    res.status(500).send('Something failed');
}
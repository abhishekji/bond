const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const headerToken = req.header('x-auth-token');
    if (!headerToken) return res.status(400).send('Access Denied! No token provided.');
    try {
        req.user = jwt.verify(headerToken, "4902394");
        next();
    } catch(ex) {
        res.status(400).send('Invalid Token...')
    }
}

module.exports = auth;
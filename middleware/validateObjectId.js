const mongoose = require('mongoose');

function validateObjectId(req, res, next) {
    if (!mongoose.Types.ObjectId.isValid(req.user._id)) {
        return res.status(400).send('Invalid Object ID...');
    }
    next();
}

module.exports = validateObjectId;
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const config = require('config');

const auth = require('../middleware/auth');
const validateObjectId = require('../middleware/validateObjectId');
const { userModel, schema, validateUser, generateAuthToken } = require('../models/users');

router.get('/', [auth, validateObjectId], async (req, res) => {
    const concernedUser = req.user;
    const user = await userModel.findById(concernedUser._id);
    // const user = await userModel.find().skip(1).limit(1);
    res.send(user);
});

router.post('/', async (req, res) => {
    const result = validateUser(req.body);
    if(!req.body || result.error) return res.send('Request error').status(400);
    const userDoc = new userModel(_.pick(req.body, ['name', 'age', 'password', 'isAdmin']));
    const salt = await bcrypt.genSalt(10);
    userDoc.password = await bcrypt.hash(userDoc.password, salt);
    const user = await userDoc.save();
    const token = generateAuthToken(user, jwt);
    res.header('x-auth-token', token).send(user);
});

router.delete('/:name', async(req, res) => {
    const deletedElement = await userModel.deleteMany({name: req.params.name.trim()});
    res.send(deletedElement);
})
module.exports = router;

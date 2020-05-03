const mongoose = require('mongoose');
const Joi = require('joi');
const config = require('config');

const schema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 4,
        maxlength: 40,
        required: true
    },
    age: {
        type: String,
        min: 10,
        required: true
    },
    password: {
        type: String,
        minlength: 4,
        maxlength: 1000,
        required: true
    },
    isAdmin: Boolean
});

const userModel = mongoose.model('user', schema);

function validateUser(user) {
    const userSchema = {
        name:     Joi.string().required(),
        age:      Joi.number().required(),
        password: Joi.required(),
        isAdmin:  Joi.required()
    }
    return Joi.validate(user, userSchema);
}

function generateAuthToken(user, jwt) {
    console.log(process.env.bond_jwtKey);
    // console.log(config.get(jwtPrivateKey));
    const token = jwt.sign({_id: user._id}, "4902394");
    return token;
}

module.exports = {
    schema: schema,
    userModel: userModel,
    validateUser: validateUser,
    generateAuthToken: generateAuthToken
}

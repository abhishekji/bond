const mongoose = require('mongoose');
const Joi = require('joi');

const riverSchema = new mongoose.Schema({
    name : {
        type: String,
        minlength: 0,
        trim: true
    },
    length : {
        type: Number
    },
    mouth: {
        type: String
    },
    sortByLength : {
        type: Number
    }
});

const globalRiver = mongoose.model('globalRiver', riverSchema);

function validateRivers() {
    const schema = {
        name: Joi.required(),
        length: Joi.required(),
        mouth: Joi.optional(),
        sortByLength: Joi.required()
    }
    return schema;
}

module.exports = {
    riverSchema: riverSchema,
    globalRiver: globalRiver,
    validateRivers: validateRivers
};
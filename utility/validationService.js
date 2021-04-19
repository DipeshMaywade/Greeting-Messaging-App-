const joi = require('joi');

class Validation{
    schema = joi.object({
        id: joi.number().required(),
        name : joi.string().min(3).max(10).pattern(new RegExp("^[A-Z]{1}[a-z]{2,}$")).required(),
        message : joi.string().required()
    })
}

module.exports = new Validation();
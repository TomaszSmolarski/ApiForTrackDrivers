const Joi = require('@hapi/joi');
const Transits = require('../transits/model');

const registerValidation = data =>{
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        password: Joi.string().min(6).required(),
        transits: Joi.array().items(Transits)
    });

    return schema.validate(data);
}

const loginValidation = data =>{
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        password: Joi.string().min(6).required(),
        transits: Joi.array().items(Transits)
    });
    
    return schema.validate(data);
    }

const updateValidation= data =>{
    const schema = Joi.object({
        name: Joi.string().min(6),
        password: Joi.string().min(6),
        transits: Joi.array().items(Transits)
    });
    
    return schema.validate(data);
    }

module.exports = {registerValidation, loginValidation, updateValidation};           
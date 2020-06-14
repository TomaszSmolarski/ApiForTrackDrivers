const Joi = require('@hapi/joi');

const registerValidation = data => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        password: Joi.string().min(6).required(),
        email: Joi.string().email({tlds: {allow: false}}).required()
    });

    return schema.validate(data);
}

const loginValidation = data => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        password: Joi.string().min(6).required()
    });

    return schema.validate(data);
}

const updateValidation = data => {
    const schema = Joi.object({
        password: Joi.string().min(6),
    });

    return schema.validate(data);
}

module.exports = {registerValidation, loginValidation, updateValidation};

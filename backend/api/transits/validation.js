const Joi = require('@hapi/joi');


const createValidation = data => {
    const schema = Joi.object({
        locations: Joi.array().required(),
        price: Joi.number().required(),
        date: Joi.date().required()
    });

    return schema.validate(data);
};

const updateValidation = data => {
    const schema = Joi.object({
        source_address: Joi.string().required(),
        destination_address: Joi.string().required(),
        addresses_between: Joi.array().required(),
        price: Joi.number().required(),
        date: Joi.date().required()
    });

    return schema.validate(data);
};

module.exports = {createValidation, updateValidation};

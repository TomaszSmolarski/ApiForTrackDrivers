const Joi = require('@hapi/joi');


const createValidation= data =>{
    const schema = Joi.object({
        addresses_between: Joi.array(),
        source_address: Joi.string().required(),
        destination_address: Joi.string().required(),
        price: Joi.number().required(),
        date: Joi.date().required()
    });
    
    return schema.validate(data);
    }

    const updateValidation= data =>{
        const schema = Joi.object({
            addresses_between: Joi.array(),
            source_address: Joi.string(),
            destination_address: Joi.string(),
            price: Joi.number(),
            date: Joi.date()
        });
        
        return schema.validate(data);
        }

module.exports = {createValidation, updateValidation};
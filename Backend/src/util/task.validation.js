const joi = require('joi');

exports.taskValidation = (data) => {
    const schema = joi.object({
        title: joi.string().required().messages({
            'string.empty': 'Title is required',
        }),
        status: joi.string().valid('completed', 'pending').messages({
            'any.only': 'Status should be either completed or pending'
        }),
    }).unknown(true);
    const {value, error} = schema.validate(data);

    return{
        value,
        error
    }
};
const joi = require('joi');

exports.signupValidation = (data) => {
    const schema = joi.object({
        name: joi.string().min(6).required().messages({
            'string.empty': 'name is required',
            'string.min': 'name should have a minimum length of 6'
        }),
        email: joi.string().required().email().messages({
            'string.empty': 'Email is required',
            'string.email': 'Email is invalid',
        }),
        phone: joi.string().required().messages({
            'string.empty': 'Phone number is required',
        }),
        password: joi.string().min(6).required().messages({
            'string.empty': 'Password is required',
            'string.min': 'Password should have a minimum length of 6'
        })
    });
    const {value, error} = schema.validate(data);

    return{
        value,
        error
    }
};

exports.loginValidation = (data) => {
    const schema = joi.object({
        email: joi.string().required().email().messages({
            'string.empty': 'Email is required',
            'string.email': 'Email is invalid',
        }),
        password: joi.string().required().messages({
            'string.empty': 'Password is required',
        })
    });
    const {value, error} = schema.validate(data);

    return{
        value,
        error
    }
};


exports.updateUserValidation = (data) => {
    const schema = joi.object({
        name: joi.string().min(6).messages({
            'string.empty': 'name is required',
            'string.min': 'name should have a minimum length of 6'
        }),
        email: joi.string().email().messages({
            'string.empty': 'Email is required',
            'string.email': 'Email is invalid',
        }),
        password: joi.string().min(6).messages({
            'string.empty': 'Password is required',
            'string.min': 'Password should have a minimum length of 6'
        }),
        phone: joi.number().messages({
            'number.empty': 'Phone number is required',
        })
    }).unknown(true);
    const {value, error} = schema.validate(data);

    return{
        value,
        error
    }
};

exports.resetPasswordValidation = (data) => {
    const schema = joi.object({
        currentPassword: joi.string().required().messages({
            'string.empty': 'Current password is required',
        }),
        newPassword: joi.string().min(6).required().messages({
            'string.empty': 'New password is required',
            'string.min': 'New password should have a minimum length of 6'
        })
    }).unknown(true);
    const {value, error} = schema.validate(data);

    return{
        value,
        error
    }
};

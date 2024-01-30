const Joi = require('joi')

const EmployeeSchema = Joi.object({
    name: Joi.string().required(),
    designation: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    phone: Joi.string().pattern(new RegExp('^[0-9]{10}$')).required(),
    age: Joi.number().integer().positive().min(1).max(120).required()

});

const validateEmployee = (EmployeeData) => {
    return EmployeeSchema.validate(EmployeeData)
};

module.exports = {
    EmployeeSchema,
};
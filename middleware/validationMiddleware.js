const {EmployeeSchema} = require('../ValidationSchemas')

function validate(schema) {
    return (req,res,next) => {
        const { error } = schema.validate(req.body);

        if(error){
            return res.status(400).json({error: error.details[0].message })
        }
        next();

    }
}

module.exports = {
    validateEmployee: validate(EmployeeSchema)
}
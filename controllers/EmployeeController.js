const { response } = require('express')
const Employee = require('../models/Employee')

// show the list of employees
const index = (req,res,next) => {
    Employee.find()
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'An error ocuured!'
        })
    })
}

//show employee by id
const show = (req, res, next) => {
    let employeeID = req.body.employeeID;
    
    // Get the requested fields from the query parameters (e.g., /show?fields=name,designation,phone)
    let requestedFields = req.query.fields;

    // Build the projection object dynamically based on the requested fields
    let projection = {};
    if (requestedFields) {
        requestedFields.split(',').forEach(field => {
            projection[field] = 1;
        });
    }

    // Use the projection in the query
    Employee.findById(employeeID)
        .select(projection)
        .then(response => {
            res.json({
                response
            });
        })
        .catch(error => {
            res.json({
                message: 'An error occurred!'
            });
        });
};


//add new employee to db
const store = (req,res,next) => {
    let employee = new Employee({
        name: req.body.name,
        designation: req.body.designation,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age
    })
    if(req.files){
        //employee.image = req.file.path
        let path = '';
        req.files.forEach(function(files,index,arr){
            path = path + files.path + ','
        })
        path = path.substring(0,path.lastIndexOf(","))
        employee.image = path
    }
    employee.save()
    .then(response => {
        res.json({
            message: 'Employee added succesfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'an error ocuured!'
        })
    })
}

//update an employee
const update = (req,res,next) => {
    let employeeId = req.body.employeeID

    let updatedData = {
        name: req.body.name,
        designation: req.body.designation,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age
    }
    Employee.findByIdAndUpdate(employeeId,{$set: updatedData})
    .then(() => {
        res.json({
            message: 'employee updated successfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'an error ocuured!'
        })
    })
}

//delete an employee
const destroy = (req,res,next) => {
    let employeeID = req.body.employeeID
    Employee.findByIdAndDelete(employeeID)
    .then(() => {
        res.json({
            message: 'employee deleted successfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'an error ocuured!'
        })
    })
}

module.exports = {
    index,show,store,update,destroy
}

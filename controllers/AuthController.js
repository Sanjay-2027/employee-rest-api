const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = (req,res,next) => {
    bcrypt.hash(req.body.password, 10, function(err, hashedpass){
        if(err){
            res.json({
                error: err
            })
        }
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: hashedpass
        })
        user.save()
        .then(user => {
            res.json({
                message: 'user added successfully!'
            })
        })
        .catch(error => {
            res.json({
                message: 'an error has occured!'
            })
        })
    })

}

const login = (req, res, next) => {

    var username = req.body.username
    var password = req.body.password

    User.findOne({$or: [{email:username},{phone:username}]})
    .then(user => {
        if(user){
            bcrypt.compare(password,user.password,function(err,result){
                if(err){
                    res.json({
                        error: err
                    })
                }
                if(result){
                    let token = jwt.sign({name: user.name},process.env.accessTokenSecret,{expiresIn: process.env.accessTokenExpiry})
                    let refreshtoken = jwt.sign({name: user.name},process.env.refreshTokenSecret,{expiresIn: process.env.refreshTokenExpiry})
                    res.json({
                        message: 'Login successful!',
                        token,
                        refreshtoken
                    })
                }
                else{
                    res.json({
                        message: 'password does not matched!'
                    })
                }
            })
        }
        else{
            res.json({
                message: "No such user found!"
            })
        }
    })
}

const refreshToken = (req,res,next) => {
    const refreshToken = req.body.refreshToken
    jwt.verify(refreshToken,process.env.refreshTokenSecret,function(err,decode){
        if(err){
            res.status(400).json({
                err
            })
        }
        else{
            let token = jwt.sign({name: decode.name},process.env.accessTokenSecret,{expiresIn:'60s'})
            let refreshToken = req.body.refreshToken
            res.status(200).json({
                message: "token refreshed successfuly",
                token,
                refreshToken
            })
        }
    })
}



module.exports = {
    register,login,refreshToken
}

 
// $or
// operator performs a logical OR operation on an array of one or more <expressions> and selects the documents that satisfy at least one of the <expressions>.
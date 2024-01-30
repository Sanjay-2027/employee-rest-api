const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv')
dotenv.config()

const EmployeeRoute = require('./routes/Employee')
const AuthRoute = require('./routes/Auth')

mongoose.connect('mongodb://localhost:27017/node_crud')
const db = mongoose.connection

db.on('error',(err)=>{
    console.log(err)
})

db.once('open',()=>{
    console.log("database connection established!")
})

const app = express()
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use('/uploads',express.static('uploads'))

const PORT = 3000

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})

app.use('/api/employee',EmployeeRoute)
app.use('/api',AuthRoute)
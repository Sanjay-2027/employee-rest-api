const express = require('express')
const router = express.Router()
const EmployeeController = require('../controllers/EmployeeController')
const upload = require('../middleware/upload')
const authenticate = require('../middleware/authenticate')
const {validateEmployee} = require('../middleware/validationMiddleware')

router.get('/',authenticate,EmployeeController.index)
router.post('/show',EmployeeController.show)
//router.post('/store',upload.single('image'),EmployeeController.store)
//router.post('/store',upload.array('image[]'),EmployeeController.store)
router.post('/store',validateEmployee,EmployeeController.store)
router.post('/update',EmployeeController.update)
router.post('/delete',EmployeeController.destroy)

module.exports = router

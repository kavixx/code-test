const express = require('express');
const { employeeValditaion } = require('../../../config/Validations');

const router = express.Router();
const {
  getAllEmployee,
  getEmployee,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} = require('../controllers/EmployeeController');

router.route('/list').get(getAllEmployee); //get employee list router
router.route('/:id').get(getEmployee); //get an employee by Id router
router.route('/add').post(employeeValditaion, addEmployee); //add an employee router
router.route('/update/:id').put(employeeValditaion, updateEmployee); //update an employee router
router.route('/delete/:id').delete(deleteEmployee); //delete an employee router

module.exports = router;

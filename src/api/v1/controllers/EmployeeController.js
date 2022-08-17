const ErrorCodes = require('../../../config/ErrorCodes');
const Employee = require('../models/EmployeeModel');

const getAllEmployee = async (req, res) => {
  try {
    const employee = await Employee.find();
    res.status(200).send(employee);
  } catch (err) {
    res.status(500).send({ message: `error ${err}` });
  }
};

const getEmployee = async (req, res) => {
  let id = req.params.id;
  try {
    const employee = await Employee.findById(id);
    if (!employee._id) {
      res.status(ErrorCodes.NOT_FOUND).send({ message: `User not found` });
    } else {
      res.send({ status: ErrorCodes.OK, data: employee.toJSON() });
    }
  } catch (err) {
    res.status(ErrorCodes.INTERNAL_SERVER).send({ message: `Error ${err}` });
  }
};

const addEmployee = async (req, res) => {
  try {
    const emp = new Employee({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      number: req.body.number,
      gender: req.body.gender,
    });
    const newEmp = await new Employee(emp);
    newEmp.save();
    res.status(ErrorCodes.OK).send({ status: 'Success' });
  } catch (error) {
    res
      .status(ErrorCodes.INTERNAL_SERVER)
      .send({ message: `Adding error ${err}` });
  }
};

const updateEmployee = async (req, res) => {
  const id = req.params.id;
  try {
    const employee = await Employee.findByIdAndUpdate(id, req.body);
    res.status(ErrorCodes.OK).send({ message: 'Updated' });
  } catch (err) {
    res.status(ErrorCodes.INTERNAL_SERVER).send({ message: `Error ${err}` });
  }
};

const deleteEmployee = async (req, res) => {
  const id = req.params.id;
  try {
    const employee = await Employee.findByIdAndDelete(id);
    res.status(ErrorCodes.OK).send({ message: 'Deleted' });
  } catch (err) {
    res.status(ErrorCodes.INTERNAL_SERVER).send({ message: `Error ${err}` });
  }
};

module.exports = {
  getAllEmployee,
  getEmployee,
  addEmployee,
  updateEmployee,
  deleteEmployee,
};

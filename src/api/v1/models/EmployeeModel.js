const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  first_name: { type: String, required: true, min: 6, max: 10 },
  last_name: { type: String, required: true, min: 6, max: 10 },
  email: { type: String, required: true, unique: true, sparse: true },
  number: { type: String, required: true },
  gender: { type: String, required: true },
});

const Employee = mongoose.model('employee', employeeSchema);

module.exports = Employee;

const Joi = require('joi');

const empSchema = Joi.object({
  first_name: Joi.string().min(6).max(10).required(),
  last_name: Joi.string().min(6).max(10).required(),
  email: Joi.string().email().required(),
  number: Joi.number().required(),
  gender: Joi.string().required(),
});

const employeeValditaion = (req, res, next) => {
  const body = req.body;
  const { error, value } = empSchema.schema.validate(body);
  if (error) return res.status(400).send({ error: error.details[0].message });
  next();
};

module.exports = { employeeValditaion };

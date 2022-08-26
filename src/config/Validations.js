const { validationResult, check } = require('express-validator');

const employeeValditaion = [
  check('first_name').exists().isLength({ min: 6, max: 10 }),
  check('last_name').exists().isLength({ min: 6, max: 10 }),
  check('email').isEmail(),
  check('gender').exists(),
  check('number').exists(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },
];

module.exports = { employeeValditaion };

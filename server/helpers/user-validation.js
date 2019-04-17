import joi from 'joi';

exports.validateUser = (user) => {
  const userSchema = {
    firstName: joi.string().min(3).trim().required()
      .regex(/^[A-Za-z]+$/),
    lastName: joi.string().min(3).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    isAdmin: joi.boolean().valid('true', 'false'),
    type: joi.string().valid('user', 'cashier'),
  };
  return joi.validate(user, userSchema);
};

exports.validateLogin = (user) => {
  const login = {
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
  };
  return joi.validate(user, login);
};

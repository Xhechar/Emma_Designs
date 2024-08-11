import Joi from 'joi';

const loginsValidator = Joi.object({
  email: Joi.string().email().required().messages({
    'email': 'Please enter a valid email',
    'string.empty': 'Please enter email'
  }),
  password: Joi.string().required().pattern(new RegExp('^[A-Za-z0-9]{8}$')).messages({
    'password.empty': 'Password is required',
    'password.pattern.base': 'The password should contain atleast one special character, letters and numbers, 8 characters or more.'
  })
})
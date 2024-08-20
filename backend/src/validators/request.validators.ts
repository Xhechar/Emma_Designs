import Joi from 'joi';

export const loginsValidator = Joi.object({
  email: Joi.string().email().required().messages({
    'email': 'Please enter a valid email',
    'string.empty': 'Please enter email'
  }),
  password: Joi.string().required().min(8).max(30).pattern(new RegExp('^[A-Za-z0-9]{8,30}$')).messages({
    "password.min": "The password should contain a minimum of 8 characters",
    "password.max": "The password should contain a max of 30 character(s)",
    "password.required": "Please enter password",
    "password.pattern": "Password should contain Capital, small letters and numbers"
  })
});

export const userValidator = Joi.object({
  fullname: Joi.string().required().min(3).messages({
    'fullname.min': 'The fullname field entered has less characters',
    'fullname.empty': 'Please enter fullname',
    'fullname.required': 'Fullname field cannot be empty'
  }),
  email: Joi.string().email().required().min(8).messages({
    'email.required': 'Please enter email',
    'email.email': 'Please enter a valid email',
    'email.min': 'Email should be 8 characters or more in length'
  }),
  phone_number: Joi.string().required().pattern(new RegExp('^[0-9]{10}$')).messages({
    'phone_number.required': 'Please enter phone number',
    'phone_number.pattern.base': 'Phone number should contain only numbers with 10 characters'
  }),
  gender: Joi.string().required().max(8).messages({
    'gender.required': 'Gender is required'
  }),
  country: Joi.string().required(),
  county: Joi.string().required(),
  address: Joi.string().required(),
  profile_image: Joi.string().required(),
  password: Joi.string().required().min(8).max(30).pattern(new RegExp('^[A-Za-z0-9]{8,30}$')).messages({
    "password.min": "The password should contain a minimum of 8 characters",
    "password.max": "The password should contain a max of 30 character(s)",
    "password.required": "Please enter password",
    "password.pattern": "Password should contain Capital, small letters and numbers"
  })
});

export const productSchema = Joi.object({
  name: Joi.string().required().min(3).messages({
    'name.min': 'The product name field entered has less characters',
    'name.empty': 'Please enter product name',
    'name.required': 'Product name field cannot be empty'
  }),
  images: Joi.string().required().messages({
    'images.required': 'Please enter images'
  }),
  short_desc: Joi.string().required().max(30).messages({
    'short_desc.required': 'Please enter short description',
    'short_desc.max': 'The short description field entered should have a max of 16 characters'
  }),
  long_desc: Joi.string().required().min(20).messages({
    'long_desc.required': 'Please enter short description',
    'long_desc.min': 'The short description field entered should have a min of 20 characters'
  }),
  price: Joi.number().required(),
  stock_quantity: Joi.number().required(),
  cartegory: Joi.string().required(),
  type: Joi.string().required(),
  discount: Joi.number().required(),
  max_quantity: Joi.number().required()
});
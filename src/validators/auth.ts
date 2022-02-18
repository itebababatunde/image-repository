import Joi from 'joi';

const PUBLIC = 'public';
const PRIVATE = 'private';

const signUpSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': 'Email is required',
    'string.email': 'Invalid email',
  }),
  firstName: Joi.string().min(3).required().messages({
    'any.required': 'First name is required',
    'string.min': 'First name must be at least 3 characters',
  }),
  lastName: Joi.string().min(3).required().messages({
    'any.required': 'Last name is required',
    'string.min': 'Last name must be at least 3 characters',
  }),

  password: Joi.string().min(8).required().messages({
    'any.required': 'Password is required',
    'string.min': 'Password must be at least 8 characters',
  }),
  passwordConfirm: Joi.string().required().valid(Joi.ref('password')).messages({
    'any.required': 'Please confirm your password',
    'any.only': 'Password mismatch',
  }),
});

const logInSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': 'Email is required',
    'string.email': 'Invalid email',
  }),
  
  password: Joi.string().min(8).required().messages({
    'any.required': 'Password is required',
    'string.min': 'Password must be at least 8 characters',
  }),
});


const addImageSchema = Joi.object({
  permission: Joi.string()
    .required()
    .valid(PUBLIC, PRIVATE)
    .messages({
      'any.required': 'image permission is required',
      'string.valid': `permissions can either be ${PUBLIC} OR ${PRIVATE}`,
    }),
  image: Joi.optional(),
  images: Joi.optional(),

});


export { signUpSchema, logInSchema, addImageSchema };
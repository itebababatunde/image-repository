import Joi from 'joi';
const PUBLIC = 'public';
const PRIVATE = 'private';

const addImageSchema = Joi.object({
    permission: Joi.string()
      .valid(PUBLIC, PRIVATE)
      .messages({
        'any.required': 'image permission is required',
        'string.valid': `permissions can either be ${PUBLIC} OR ${PRIVATE}`,
      }),
    image: Joi.optional(),
    images: Joi.optional(),
  
  });

  const searchImageSchema = Joi.object({
    image: Joi.optional(),
  
  });
  

  
  export { addImageSchema, searchImageSchema };
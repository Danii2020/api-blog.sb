import Joi = require('joi');

const id = Joi.number();

const name = Joi.string()
  .min(3)
  .max(15);

const email = Joi.string().email();


const createUserSchema = Joi.object({
  name:name.required(),
  email:email.required()
});

const updateUserSchema = Joi.object({
  name:name,
  email:email
});

const getUserSchema = Joi.object({
  id:id.required()
})

export {createUserSchema, updateUserSchema, getUserSchema}

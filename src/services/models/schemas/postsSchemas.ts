import Joi = require('joi');

const id = Joi.string().alphanum();

const userId = Joi.string().alphanum();

const title = Joi.string()
  .min(3)
  .max(15);

const content = Joi.string()
  .min(3);


const createPostSchema = Joi.object({
  title:title.required(),
  content:content.required()
});

const updatePostSchema = Joi.object({
  title:title,
  content:content
});

const getPostSchema = Joi.object({
  id:id.required()
})

export {createPostSchema, updatePostSchema, getPostSchema}

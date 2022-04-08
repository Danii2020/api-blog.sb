"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostSchema = exports.updatePostSchema = exports.createPostSchema = void 0;
const Joi = require("joi");
const id = Joi.string().alphanum();
const userId = Joi.string().alphanum();
const title = Joi.string()
    .min(3)
    .max(15);
const content = Joi.string()
    .min(3);
const createPostSchema = Joi.object({
    title: title.required(),
    content: content.required()
});
exports.createPostSchema = createPostSchema;
const updatePostSchema = Joi.object({
    title: title,
    content: content
});
exports.updatePostSchema = updatePostSchema;
const getPostSchema = Joi.object({
    id: id.required()
});
exports.getPostSchema = getPostSchema;

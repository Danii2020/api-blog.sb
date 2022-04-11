"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserSchema = exports.updateUserSchema = exports.createUserSchema = void 0;
const Joi = require("joi");
const id = Joi.number();
const name = Joi.string()
    .min(3)
    .max(15);
const email = Joi.string().email();
const createUserSchema = Joi.object({
    name: name.required(),
    email: email.required()
});
exports.createUserSchema = createUserSchema;
const updateUserSchema = Joi.object({
    name: name,
    email: email
});
exports.updateUserSchema = updateUserSchema;
const getUserSchema = Joi.object({
    id: id.required()
});
exports.getUserSchema = getUserSchema;

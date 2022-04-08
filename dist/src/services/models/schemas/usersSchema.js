"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserSchema = exports.updateUserSchema = exports.createUserSchema = void 0;
const Joi = require("joi");
const id = Joi.string().alphanum();
const username = Joi.string()
    .min(3)
    .max(15);
const firstname = Joi.string()
    .min(3)
    .max(15);
const lastname = Joi.string()
    .min(3)
    .max(15);
const email = Joi.string().email();
const createUserSchema = Joi.object({
    username: username.required(),
    firstname: firstname.required(),
    lastname: lastname.required(),
    email: email.required()
});
exports.createUserSchema = createUserSchema;
const updateUserSchema = Joi.object({
    username: username,
    firstname: firstname,
    lastname: lastname,
    email: email
});
exports.updateUserSchema = updateUserSchema;
const getUserSchema = Joi.object({
    id: id.required()
});
exports.getUserSchema = getUserSchema;

import * as restify from "restify";
import Joi from "joi";
import { validate } from "./validator";

const joiPassword = Joi.string().pattern(/^[a-zA-Z0-9]{8,30}$/);

function validateCreateUser(
  req: restify.Request,
  res: restify.Response,
  next: restify.Next
): void {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: joiPassword.required(),
  });

  return validate(schema, req, next);
}

function validateGetUserById(
  req: restify.Request,
  res: restify.Response,
  next: restify.Next
): void {
  const schema = Joi.object({
    id: Joi.number().integer().min(1),
  });

  return validate(schema, req, next);
}

function validateUpdateUserInfo(
  req: restify.Request,
  res: restify.Response,
  next: restify.Next
): void {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    id: Joi.number().integer().min(1),
    password: joiPassword.required(),
  });

  return validate(schema, req, next);
}

export default {
  validateCreateUser,
  validateGetUserById,
  validateUpdateUserInfo,
};

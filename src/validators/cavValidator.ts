import * as restify from "restify";
import Joi from "joi";
import { validate } from "./validator";

function validateCreateCav(
  req: restify.Request,
  res: restify.Response,
  next: restify.Next
): void {
  const schema = Joi.object({
    name: Joi.string().required(),
  });

  return validate(schema, req, next);
}

function validateGetCavByName(
  req: restify.Request,
  res: restify.Response,
  next: restify.Next
): void {
  const schema = Joi.object({
    name: Joi.string().required(),
  });

  return validate(schema, req, next);
}

function validateUpdateCavInfo(
  req: restify.Request,
  res: restify.Response,
  next: restify.Next
): void {
  const schema = Joi.object({
    oldName: Joi.string().required(),
    newName: Joi.string().required(),
  }).rename("name", "newName");

  return validate(schema, req, next);
}

export default {
  validateCreateCav,
  validateGetCavByName,
  validateUpdateCavInfo,
};

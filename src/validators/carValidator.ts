import * as restify from "restify";
import Joi from "joi";
import { validate } from "./validator";

function validateCreateCar(
  req: restify.Request,
  res: restify.Response,
  next: restify.Next
): void {
  const schema = Joi.object({
    brand: Joi.string().required(),
    cav: Joi.string().required(),
    model: Joi.string().required(),
  });

  return validate(schema, req, next);
}

function validateGetCarById(
  req: restify.Request,
  res: restify.Response,
  next: restify.Next
): void {
  const schema = Joi.object({
    id: Joi.number().integer().min(1).required(),
  });

  return validate(schema, req, next);
}

function validateUpdateCarInfo(
  req: restify.Request,
  res: restify.Response,
  next: restify.Next
): void {
  const schema = Joi.object({
    brand: Joi.string(),
    cav: Joi.string(),
    id: Joi.number().integer().min(1).required(),
    model: Joi.string(),
  }).min(2);
  // TODO: when there is less than 1 parameter (only the id, for instance), the
  // error message tells that there should be at least 2 keys, but the user may
  // be misguided, since 1 of these keys (the id) is a URL params, not in the
  // request body.

  return validate(schema, req, next);
}

export default {
  validateCreateCar,
  validateGetCarById,
  validateUpdateCarInfo,
};

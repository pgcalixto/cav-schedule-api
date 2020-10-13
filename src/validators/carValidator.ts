import * as restify from "restify";
import Joi from "joi";
import { validate } from "./validator";

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

export default {
  validateGetCarById,
};

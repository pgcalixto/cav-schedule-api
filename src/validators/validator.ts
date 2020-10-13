import * as restify from "restify";
import * as restifyErrors from "restify-errors";
import Joi from "joi";

export function validate(
  schema: Joi.ObjectSchema,
  req: restify.Request,
  next: restify.Next
): void {
  const { value, error } = schema.validate(req.params);

  if (error) {
    return next(new restifyErrors.BadRequestError(error.details[0].message));
  }

  req.params = value;

  return next();
}

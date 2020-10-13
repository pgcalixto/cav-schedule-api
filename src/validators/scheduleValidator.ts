import * as restify from "restify";
import Joi from "joi";
import { validate } from "./validator";

const joiDate = Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/);
const joiEventType = Joi.string().allow("inspection", "visit");
const joiHour = Joi.number().integer().min(10).max(17).cast("string");

function validateDeleteSchedule(
  req: restify.Request,
  res: restify.Response,
  next: restify.Next
): void {
  const schema = Joi.object({
    cav: Joi.string().required(),
    date: joiDate.required(),
    eventType: joiEventType.required(),
    hour: joiHour.required(),
  });

  return validate(schema, req, next);
}

function validateGetScheduleByParams(
  req: restify.Request,
  res: restify.Response,
  next: restify.Next
): void {
  const schema = Joi.object({
    date: joiDate.required(),
    cav: Joi.string(),
    eventType: joiEventType,
    hour: joiHour,
  })
    .with("eventType", "cav")
    .with("hour", ["cav", "eventType"]);

  return validate(schema, req, next);
}

function validateUpdateSchedule(
  req: restify.Request,
  res: restify.Response,
  next: restify.Next
): void {
  const schema = Joi.object({
    car: Joi.number().min(1).required(),
    cav: Joi.string().required(),
    date: joiDate.required(),
    eventType: joiEventType.required(),
    hour: joiHour.required(),
  });

  return validate(schema, req, next);
}

export default {
  validateDeleteSchedule,
  validateGetScheduleByParams,
  validateUpdateSchedule,
};

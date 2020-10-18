import * as restify from "restify";
import * as restifyErrors from "restify-errors";
import * as jwt from "jsonwebtoken";
import Joi from "joi";
import { validate } from "./validator";
import loggerService from "../services/loggerService";
import userService from "../services/userService";
import { IUserDocument } from "../models/userModel";

const SECRET = process.env.JWT_SECRET as string;

interface IUserRequest extends restify.Request {
  user: IUserDocument;
}

const joiPassword = Joi.string().pattern(/^[a-zA-Z0-9]{8,30}$/);

async function validateJWT(
  req: restify.Request,
  res: restify.Response,
  next: restify.Next
): Promise<void> {
  // facilitate test runs
  if (process.env.NODE_ENV === "test") {
    return next();
  }

  const token = req.headers["x-access-token"] as string;

  if (!token) {
    return next(new restifyErrors.UnauthorizedError("No token provided."));
  }

  try {
    const { id } = jwt.verify(token, SECRET) as { id: number };

    const user = await userService.getUserById(id);

    if (!user) {
      return next(new restifyErrors.UnauthorizedError("User not found."));
    }

    (req as IUserRequest).user = user;
  } catch (err) {
    loggerService.error(err);

    return next(
      new restifyErrors.InternalError("Failed to authenticate token.")
    );
  }

  return next();
}

function validateLogin(
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

export default {
  validateJWT,
  validateLogin,
};

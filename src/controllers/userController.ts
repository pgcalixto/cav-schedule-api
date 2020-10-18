import * as restify from "restify";
import * as restifyErrors from "restify-errors";
import { StatusCodes } from "http-status-codes";
import loggerService from "../services/loggerService";
import userService from "../services/userService";

async function createUser(
  req: restify.Request,
  res: restify.Response,
  next: restify.Next
): Promise<void> {
  const { email, password } = req.params;

  try {
    const result = await userService.createUser({ email, password });

    res.send(StatusCodes.CREATED, result);

    return next();
  } catch (err) {
    loggerService.error(err);

    return next(err);
  }
}

async function getAllUsers(
  req: restify.Request,
  res: restify.Response,
  next: restify.Next
): Promise<void> {
  try {
    const result = await userService.getAllUsers();

    res.send(result);

    return next();
  } catch (err) {
    loggerService.error(err);

    return next(err);
  }
}

async function getUserById(
  req: restify.Request,
  res: restify.Response,
  next: restify.Next
): Promise<void> {
  const { id } = req.params;

  try {
    const result = await userService.getUserById(id);

    if (!result) {
      return next(new restifyErrors.NotFoundError("User not found."));
    }

    res.send(result);

    return next();
  } catch (err) {
    loggerService.error(err);

    return next(err);
  }
}

async function updateUserInfo(
  req: restify.Request,
  res: restify.Response,
  next: restify.Next
): Promise<void> {
  const { email, id, password } = req.params;

  try {
    const result = await userService.updateUserInfo({ email, id, password });

    if (!result) {
      return next(new restifyErrors.NotFoundError("User ID not found."));
    }

    res.send(result);

    return next();
  } catch (err) {
    loggerService.error(err);

    return next(err);
  }
}

export default {
  createUser,
  getAllUsers,
  getUserById,
  updateUserInfo,
};

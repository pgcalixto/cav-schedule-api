import * as restify from "restify";
import * as restifyErrors from "restify-errors";
import * as jwt from "jsonwebtoken";
import loggerService from "../services/loggerService";
import userService from "../services/userService";

const SECRET = process.env.JWT_SECRET as string;
const EXPIRATION_MINUTES = Number(process.env.JWT_EXPIRATION_MINUTES);

async function login(
  req: restify.Request,
  res: restify.Response,
  next: restify.Next
): Promise<void> {
  try {
    const user = await userService.getUserByParams(req.params);

    if (!user) {
      return next(new restifyErrors.UnauthorizedError("Wrong credentials."));
    }

    const token = jwt.sign({ id: user.id }, SECRET, {
      expiresIn: 60 * EXPIRATION_MINUTES,
    });

    res.send({
      token,
      auth: true,
    });

    return next();
  } catch (err) {
    loggerService.error(err);

    return next(err);
  }
}

function logout(
  req: restify.Request,
  res: restify.Response,
  next: restify.Next
): void {
  res.send({ auth: false, token: null });

  return next();
}

export default {
  login,
  logout,
};

import * as restify from "restify";
import * as restifyErrors from "restify-errors";
import { StatusCodes } from "http-status-codes";
import cavService from "../services/cavService";
import logger from "../services/loggerService";

async function createCav(
  req: restify.Request,
  res: restify.Response,
  next: restify.Next
): Promise<void> {
  const { name } = req.params;

  try {
    const result = await cavService.createCav(name);

    res.send(StatusCodes.CREATED, result);

    return next();
  } catch (err) {
    logger.error(err);

    return next(err);
  }
}

async function getAllCavs(
  req: restify.Request,
  res: restify.Response,
  next: restify.Next
): Promise<void> {
  try {
    const result = await cavService.getAllCavs();

    res.send(result);

    return next();
  } catch (err) {
    logger.error(err);

    return next(err);
  }
}

async function getCavByName(
  req: restify.Request,
  res: restify.Response,
  next: restify.Next
): Promise<void> {
  const { name } = req.params;

  try {
    const result = await cavService.getCavByName(name);

    if (!result) {
      return next(new restifyErrors.NotFoundError("CAV name not found."));
    }

    res.send(result);

    return next();
  } catch (err) {
    logger.error(err);

    return next(err);
  }
}

async function updateCavInfo(
  req: restify.Request,
  res: restify.Response,
  next: restify.Next
): Promise<void> {
  const { oldName, newName } = req.params;

  try {
    const result = await cavService.updateCavInfo(oldName, newName);

    if (!result) {
      return next(new restifyErrors.NotFoundError("CAV name not found."));
    }

    res.send(result);

    return next();
  } catch (err) {
    logger.error(err);

    return next(err);
  }
}

export default {
  createCav,
  getAllCavs,
  getCavByName,
  updateCavInfo,
};

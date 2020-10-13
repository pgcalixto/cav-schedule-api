import * as restify from "restify";
import * as restifyErrors from "restify-errors";
import carService from "../services/carService";
import logger from "../services/loggerService";

async function getAllCars(
  req: restify.Request,
  res: restify.Response,
  next: restify.Next
): Promise<void> {
  try {
    const result = await carService.getAllCars();

    res.send(result);

    return next();
  } catch (err) {
    logger.error(err);

    return next(err);
  }
}

async function getCarById(
  req: restify.Request,
  res: restify.Response,
  next: restify.Next
): Promise<void> {
  const { id } = req.params;

  try {
    const result = await carService.getCarById(id);

    if (!result) {
      return next(new restifyErrors.NotFoundError("Car ID not found."));
    }

    res.send(result);

    return next();
  } catch (err) {
    logger.error(err);

    return next(err);
  }
}

export default {
  getAllCars,
  getCarById,
};

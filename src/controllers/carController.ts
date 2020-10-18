import * as restify from "restify";
import * as restifyErrors from "restify-errors";
import { StatusCodes } from "http-status-codes";
import carService from "../services/carService";
import loggerService from "../services/loggerService";

async function createCar(
  req: restify.Request,
  res: restify.Response,
  next: restify.Next
): Promise<void> {
  const { brand, cav, model } = req.params;

  try {
    const result = await carService.createCar({
      brand,
      cav,
      model,
    });

    res.send(StatusCodes.CREATED, result);

    return next();
  } catch (err) {
    loggerService.error(err);

    return next(err);
  }
}

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
    loggerService.error(err);

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
    loggerService.error(err);

    return next(err);
  }
}

async function updateCarInfo(
  req: restify.Request,
  res: restify.Response,
  next: restify.Next
): Promise<void> {
  try {
    const result = await carService.updateCarInfo(req.params);

    if (!result) {
      return next(new restifyErrors.NotFoundError("Car ID not found."));
    }

    res.send(result);

    return next();
  } catch (err) {
    loggerService.error(err);

    return next(err);
  }
}

export default {
  createCar,
  getAllCars,
  getCarById,
  updateCarInfo,
};

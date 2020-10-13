import * as restifyErrors from "restify-errors";
import { ICarDocument } from "../models/carModel";
import carRepository from "../repositories/carRepository";
import cavService from "./cavService";

async function createCar({
  brand,
  cav,
  model,
}: {
  brand: string;
  cav: string;
  model: string;
}): Promise<ICarDocument> {
  if (!(await cavService.getCavByName(cav))) {
    throw new restifyErrors.NotFoundError("CAV does not exist.");
  }

  return carRepository.createOne({ brand, cav, model });
}

// TODO: add a limit/pagination to avoid database stress
async function getAllCars(): Promise<ICarDocument[]> {
  return carRepository.getAll();
}

async function getCarById(id: number): Promise<ICarDocument | null> {
  return carRepository.getOneById(id);
}

async function updateCarInfo({
  brand,
  cav,
  id,
  model,
}: {
  brand?: string;
  cav?: string;
  id: number;
  model?: string;
}): Promise<ICarDocument | null> {
  if (cav && !(await cavService.getCavByName(cav))) {
    throw new restifyErrors.NotFoundError("CAV does not exist.");
  }

  return carRepository.updateOneById({ brand, cav, id, model });
}

export default {
  createCar,
  getAllCars,
  getCarById,
  updateCarInfo,
};

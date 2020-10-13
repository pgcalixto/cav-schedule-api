import { ICarDocument } from "../models/carModel";
import carRepository from "../repositories/carRepository";

// TODO: add a limit/pagination to avoid database stress
async function getAllCars(): Promise<ICarDocument[]> {
  return carRepository.getAll();
}

async function getCarById(id: number): Promise<ICarDocument | null> {
  return carRepository.getOneById(id);
}

export default {
  getAllCars,
  getCarById,
};

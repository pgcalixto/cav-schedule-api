import Car, { ICarDocument } from "../models/carModel";

async function getAll(): Promise<ICarDocument[]> {
  return Car.find({});
}

async function getOneById(id: number): Promise<ICarDocument | null> {
  return Car.findOne({ id });
}

export default {
  getAll,
  getOneById,
};

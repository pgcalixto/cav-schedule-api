import * as restifyErrors from "restify-errors";
import { ICavDocument } from "../models/cavModel";
import cavRepository from "../repositories/cavRepository";

async function createCav(name: string): Promise<ICavDocument> {
  if (await getCavByName(name)) {
    throw new restifyErrors.ConflictError(
      "Another CAV already has the desired name."
    );
  }

  return cavRepository.createOne(name);
}

// TODO: add a limit/pagination to avoid database stress
async function getAllCavs(): Promise<ICavDocument[]> {
  return cavRepository.getAll();
}

async function getCavByName(name: string): Promise<ICavDocument | null> {
  return cavRepository.getOneByName(name);
}

async function updateCavInfo(
  oldName: string,
  newName: string
): Promise<ICavDocument | null> {
  if (await getCavByName(newName)) {
    throw new restifyErrors.ConflictError(
      "Another CAV already has the desired name."
    );
  }

  return cavRepository.updateOneByName(oldName, newName);
}

export default {
  createCav,
  getAllCavs,
  getCavByName,
  updateCavInfo,
};

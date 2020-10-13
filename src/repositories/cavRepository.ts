import Cav, { ICavDocument } from "../models/cavModel";

async function createOne(name: string): Promise<ICavDocument> {
  const newCav = new Cav({ name });

  return newCav.save();
}

async function getAll(): Promise<ICavDocument[]> {
  return Cav.find({});
}

async function getOneByName(name: string): Promise<ICavDocument | null> {
  return Cav.findOne({ name });
}

async function updateOneByName(
  oldName: string,
  newName: string
): Promise<ICavDocument | null> {
  return Cav.findOneAndUpdate({ name: oldName }, { name: newName });
}

export default {
  createOne,
  getAll,
  getOneByName,
  updateOneByName,
};

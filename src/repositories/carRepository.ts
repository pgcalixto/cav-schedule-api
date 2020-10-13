import Car, { ICarDocument } from "../models/carModel";

async function createOne(params: {
  brand: string;
  cav: string;
  model: string;
}): Promise<ICarDocument> {
  const newCar = new Car(params);

  return newCar.save();
}

async function getAll(): Promise<ICarDocument[]> {
  return Car.find({});
}

async function getOneById(id: number): Promise<ICarDocument | null> {
  return Car.findOne({ id });
}

async function updateOneById({
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
  type IProperties = { [index: string]: string };

  const properties = { brand, cav, model };

  const definedProperties: IProperties = Object.entries(properties).reduce(
    (definedPropertiesAccum: IProperties, [property, value]) => {
      if (value) {
        definedPropertiesAccum[property] = value;
      }

      return definedPropertiesAccum;
    },
    {}
  );

  return Car.findOneAndUpdate({ id }, { $set: definedProperties });
}

export default {
  createOne,
  getAll,
  getOneById,
  updateOneById,
};

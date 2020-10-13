import mongoose from "mongoose";
import * as autoIncrement from "mongoose-auto-increment";

const carSchema = new mongoose.Schema({
  id: { type: Number, min: 1, index: true, required: true, unique: true },
  brand: { type: String, required: true },
  cav: { type: String, required: true },
  model: { type: String, required: true },
});

carSchema.plugin(autoIncrement.plugin, {
  model: "Car",
  field: "id",
  startAt: 1,
});

export interface ICar {
  id: number;
  brand: string;
  cav: string;
  model: string;
}

export type ICarDocument = ICar & mongoose.Document;

export interface ICarModel extends mongoose.Model<ICarDocument> {
  resetCount(callback: (err: Error, val: number | undefined) => void): void;
}

const Car: ICarModel = mongoose.model<ICarDocument, ICarModel>(
  "Car",
  carSchema
);

export default Car;

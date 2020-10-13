import mongoose from "mongoose";
import * as autoIncrement from "mongoose-auto-increment";

const cavSchema = new mongoose.Schema({
  id: { type: Number, min: 1, index: true, required: true, unique: true },
  name: { type: String, index: true, required: true, unique: true },
});

cavSchema.plugin(autoIncrement.plugin, {
  model: "Cav",
  field: "id",
  startAt: 1,
});

export interface ICav {
  id: number;
  name: string;
}

export type ICavDocument = ICav & mongoose.Document;

export interface ICavModel extends mongoose.Model<ICavDocument> {
  resetCount(callback: (err: Error, val: number | undefined) => void): void;
}

const Cav: ICavModel = mongoose.model<ICavDocument, ICavModel>(
  "Cav",
  cavSchema
);

export default Cav;

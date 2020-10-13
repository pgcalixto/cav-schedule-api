import Joi from "joi";
import mongoose from "mongoose";
import * as autoIncrement from "mongoose-auto-increment";

const userSchema = new mongoose.Schema({
  id: { type: Number, min: 1, index: true, required: true, unique: true },
  email: {
    type: String,
    validate: {
      validator: function (val: string) {
        const hasError = Boolean(Joi.string().email().validate(val).error);

        return !hasError;
      },
      message: "Invalid email.",
    },
    index: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    match: /^[a-zA-Z0-9]{8,30}$/,
    index: true,
    required: true,
  },
});

userSchema.plugin(autoIncrement.plugin, {
  model: "User",
  field: "id",
  startAt: 1,
});

export interface IUser {
  id: number;
  email: string;
  password: string;
}

export type IUserDocument = IUser & mongoose.Document;

export interface IUserModel extends mongoose.Model<IUserDocument> {
  resetCount(callback: (err: Error, val: number | undefined) => void): void;
}

const User: IUserModel = mongoose.model<IUserDocument, IUserModel>(
  "User",
  userSchema
);

export default User;

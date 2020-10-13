import User, { IUserDocument } from "../models/userModel";

async function createOne(params: {
  email: string;
  password: string;
}): Promise<IUserDocument> {
  const newUser = new User(params);

  return newUser.save();
}

async function getAll(): Promise<IUserDocument[]> {
  return User.find({});
}

async function getOneById(id: number): Promise<IUserDocument | null> {
  return User.findOne({ id });
}

async function getOneByParams(params: {
  email: string;
  password?: string;
}): Promise<IUserDocument | null> {
  return User.findOne(params);
}

async function updateOneById({
  email,
  id,
  password,
}: {
  email: string;
  id: number;
  password: string;
}): Promise<IUserDocument | null> {
  return User.findOneAndUpdate({ id }, { email, password });
}

export default {
  createOne,
  getAll,
  getOneById,
  getOneByParams,
  updateOneById,
};

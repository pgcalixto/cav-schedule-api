import * as restifyErrors from "restify-errors";
import { IUserDocument } from "../models/userModel";
import userRepository from "../repositories/userRepository";

async function createUser(params: {
  email: string;
  password: string;
}): Promise<IUserDocument> {
  if (await getUserByParams({ email: params.email })) {
    throw new restifyErrors.ConflictError(
      "Another user already has the desired email."
    );
  }

  return userRepository.createOne(params);
}

// TODO: add a limit/pagination to avoid database stress
async function getAllUsers(): Promise<IUserDocument[]> {
  return userRepository.getAll();
}

async function getUserById(id: number): Promise<IUserDocument | null> {
  return userRepository.getOneById(id);
}

async function getUserByParams(params: {
  email: string;
  password?: string;
}): Promise<IUserDocument | null> {
  return userRepository.getOneByParams(params);
}

async function updateUserInfo(params: {
  email: string;
  id: number;
  password: string;
}): Promise<IUserDocument | null> {
  return userRepository.updateOneById(params);
}

export default {
  createUser,
  getAllUsers,
  getUserById,
  getUserByParams,
  updateUserInfo,
};

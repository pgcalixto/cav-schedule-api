import mongoose from "mongoose";
import { ICav, ICavDocument } from "../../../src/models/cavModel";
import cavRepository from "../../../src/repositories/cavRepository";
import cavService from "../../../src/services/cavService";

import faker from "faker";
import { mocked } from "ts-jest/utils";

jest.mock("mongoose");
jest.mock("mongoose-auto-increment");
jest.mock("../../../src/models/cavModel");
jest.mock("../../../src/repositories/cavRepository");

let mockCav: ICavDocument;

beforeEach(() => {
  mocked(cavRepository.getAll).mockReset();
  mocked(cavRepository.getOneByName).mockReset();

  mockCav = {
    id: faker.random.number(),
    name: faker.lorem.word(),
  } as ICav & mongoose.Document;
});

afterEach(() => {
  jest.restoreAllMocks();
});

test("Should get all CAVs", async () => {
  // arrange
  const mockCavs: ICavDocument[] = [
    {
      id: faker.random.number(),
      name: faker.lorem.word(),
    } as ICav & mongoose.Document,
    {
      id: faker.random.number(),
      name: faker.lorem.word(),
    } as ICav & mongoose.Document,
  ];

  mocked(cavRepository.getAll).mockResolvedValue(mockCavs);

  // act
  const result = await cavService.getAllCavs();

  // assert
  expect(mocked(cavRepository.getAll)).toBeCalledTimes(1);
  expect(mocked(cavRepository.getAll)).toBeCalledWith();
  expect(result).toEqual(mockCavs);
});

test("Should get CAV by name", async () => {
  // arrange
  mocked(cavRepository.getOneByName).mockResolvedValue(mockCav);

  const name = faker.lorem.word();

  // act
  const result = await cavService.getCavByName(name);

  // assert
  expect(mocked(cavRepository.getOneByName)).toBeCalledTimes(1);
  expect(mocked(cavRepository.getOneByName)).toBeCalledWith(name);
  expect(result).toEqual(mockCav);
});

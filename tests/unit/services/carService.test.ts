import mongoose from "mongoose";
import * as restifyErrors from "restify-errors";
import { ICar, ICarDocument } from "../../../src/models/carModel";
import { ICav, ICavDocument } from "../../../src/models/cavModel";
import carRepository from "../../../src/repositories/carRepository";
import carService from "../../../src/services/carService";
import cavService from "../../../src/services/cavService";

import faker from "faker";
import { mocked } from "ts-jest/utils";

jest.mock("mongoose");
jest.mock("mongoose-auto-increment");
jest.mock("../../../src/models/carModel");
jest.mock("../../../src/models/cavModel");
jest.mock("../../../src/repositories/carRepository");
jest.mock("../../../src/services/cavService");

let mockCar: ICarDocument;
let mockCav: ICavDocument;

beforeEach(() => {
  mocked(carRepository.createOne).mockReset();
  mocked(carRepository.getAll).mockReset();
  mocked(carRepository.getOneById).mockReset();
  mocked(cavService.getCavByName).mockReset();
  mocked(carRepository.updateOneById).mockReset();

  mockCar = {
    id: faker.random.number(),
    brand: faker.lorem.word(),
    cav: faker.lorem.word(),
    model: faker.lorem.word(),
  } as ICar & mongoose.Document;
  mockCav = {
    id: faker.random.number(),
    name: faker.lorem.word(),
  } as ICav & mongoose.Document;
});

test("Should create car if CAV exists", async () => {
  // arrange
  mocked(cavService.getCavByName).mockResolvedValue(mockCav);

  const brand = faker.lorem.word();
  const cav = faker.lorem.word();
  const model = faker.lorem.word();

  mocked(carRepository.createOne).mockResolvedValue(mockCar);

  // act
  const result = await carService.createCar({ brand, cav, model });

  // assert
  expect(mocked(cavService.getCavByName)).toBeCalledTimes(1);
  expect(mocked(cavService.getCavByName)).toBeCalledWith(cav);
  expect(mocked(carRepository.createOne)).toBeCalledTimes(1);
  expect(mocked(carRepository.createOne)).toBeCalledWith({ brand, cav, model });
  expect(result).toBe(mockCar);
});

test("Should not create car if CAV does not exist", async () => {
  // arrange
  mocked(cavService.getCavByName).mockResolvedValue(null);

  const brand = faker.lorem.word();
  const cav = faker.lorem.word();
  const model = faker.lorem.word();

  // act
  const fn = () => carService.createCar({ brand, cav, model });

  // assert
  await expect(fn()).rejects.toThrow(restifyErrors.NotFoundError);
  expect(mocked(cavService.getCavByName)).toBeCalledTimes(1);
  expect(mocked(cavService.getCavByName)).toBeCalledWith(cav);
});

test("Should get all cars", async () => {
  // arrange
  const mockCars: ICarDocument[] = [
    {
      id: faker.random.number(),
      brand: faker.lorem.word(),
      cav: faker.lorem.word(),
      model: faker.lorem.word(),
    } as ICar & mongoose.Document,
    {
      id: faker.random.number(),
      brand: faker.lorem.word(),
      cav: faker.lorem.word(),
      model: faker.lorem.word(),
    } as ICar & mongoose.Document,
  ];

  mocked(carRepository.getAll).mockResolvedValue(mockCars);

  // act
  const result = await carService.getAllCars();

  // assert
  expect(mocked(carRepository.getAll)).toBeCalledTimes(1);
  expect(mocked(carRepository.getAll)).toBeCalledWith();
  expect(result).toEqual(mockCars);
});

test("Should get car by ID", async () => {
  // arrange
  mocked(carRepository.getOneById).mockResolvedValue(mockCar);

  const mockId = faker.random.number();

  // act
  const result = await carService.getCarById(mockId);

  // assert
  expect(mocked(carRepository.getOneById)).toBeCalledTimes(1);
  expect(mocked(carRepository.getOneById)).toBeCalledWith(mockId);
  expect(result).toEqual(mockCar);
});

test("Should update car info if CAV is not passed", async () => {
  // arrange
  mocked(carRepository.updateOneById).mockResolvedValue(mockCar);

  const brand = faker.lorem.word();
  const id = faker.random.number();
  const model = faker.lorem.word();

  // act
  const result = await carService.updateCarInfo({ brand, id, model });

  // assert
  expect(mocked(cavService.getCavByName)).toBeCalledTimes(0);
  expect(mocked(carRepository.updateOneById)).toBeCalledTimes(1);
  expect(mocked(carRepository.updateOneById)).toBeCalledWith({
    brand,
    id,
    model,
  });
  expect(result).toEqual(mockCar);
});

test("Should update car info if CAV exists", async () => {
  // arrange
  mocked(cavService.getCavByName).mockResolvedValue(mockCav);
  mocked(carRepository.updateOneById).mockResolvedValue(mockCar);

  const brand = faker.lorem.word();
  const cav = faker.lorem.word();
  const id = faker.random.number();
  const model = faker.lorem.word();

  // act
  const result = await carService.updateCarInfo({ brand, cav, id, model });

  // assert
  expect(mocked(cavService.getCavByName)).toBeCalledTimes(1);
  expect(mocked(cavService.getCavByName)).toBeCalledWith(cav);
  expect(mocked(carRepository.updateOneById)).toBeCalledTimes(1);
  expect(mocked(carRepository.updateOneById)).toBeCalledWith({
    brand,
    cav,
    id,
    model,
  });
  expect(result).toEqual(mockCar);
});

test("Should not update car info if CAV does not exist", async () => {
  // arrange
  mocked(cavService.getCavByName).mockResolvedValue(null);

  const brand = faker.lorem.word();
  const cav = faker.lorem.word();
  const id = faker.random.number();
  const model = faker.lorem.word();

  // act
  const fn = () => carService.updateCarInfo({ brand, cav, id, model });

  // assert
  await expect(fn()).rejects.toThrow(restifyErrors.NotFoundError);
  expect(mocked(cavService.getCavByName)).toBeCalledTimes(1);
  expect(mocked(cavService.getCavByName)).toBeCalledWith(cav);
});

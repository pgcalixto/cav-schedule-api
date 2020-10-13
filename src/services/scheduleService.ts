import * as restifyErrors from "restify-errors";
import { IScheduleDocument } from "../models/scheduleModel";
import carService from "./carService";
import cavService from "./cavService";
import scheduleRepository from "../repositories/scheduleRepository";

async function deleteSchedule({
  cav,
  date,
  eventType,
  hour,
}: {
  cav: string;
  date: string;
  eventType: string;
  hour: number;
}): Promise<IScheduleDocument | null> {
  return scheduleRepository.deleteOneHourEntry({ cav, date, eventType, hour });
}

async function getAllSchedules(): Promise<IScheduleDocument[]> {
  return scheduleRepository.getAll();
}

async function getScheduleByParams(params: {
  date: string;
  cav?: string;
  eventType?: string;
  hour?: number;
}): Promise<IScheduleDocument | null> {
  return scheduleRepository.getOneByParams(params);
}

async function updateSchedule({
  car,
  cav,
  date,
  eventType,
  hour,
}: {
  car: number;
  cav: string;
  date: string;
  eventType: string;
  hour: number;
}): Promise<IScheduleDocument | null> {
  await validateCavCar(cav, car);

  return scheduleRepository.updateOneHourEntry({
    car,
    cav,
    date,
    eventType,
    hour,
  });
}

async function validateCavCar(cav: string, carId: number): Promise<void> {
  if (!(await cavService.getCavByName(cav))) {
    throw new restifyErrors.NotFoundError("CAV not found.");
  }

  const car = await carService.getCarById(carId);

  if (!car) {
    throw new restifyErrors.NotFoundError("Car ID not found.");
  }

  if (car.cav !== cav) {
    throw new restifyErrors.ConflictError(
      "Car is not associated to the given CAV."
    );
  }
}

export default {
  deleteSchedule,
  getAllSchedules,
  getScheduleByParams,
  updateSchedule,
};

import mongoose from "mongoose";
import Schedule, { IScheduleDocument } from "../models/scheduleModel";

type Filter = mongoose.MongooseFilterQuery<
  Pick<IScheduleDocument, "date" | "cav" | "_id">
>;

function buildQueryParams({
  date,
  cav,
  eventType,
  hour,
}: {
  date: string;
  cav?: string;
  eventType?: string;
  hour?: number;
}) {
  const filter: Filter = { date };
  const projection = ["date"];

  if (cav && eventType && hour) {
    const property = `cav.${cav}.${eventType}.${hour}`;

    filter[property] = { $exists: true };

    projection.push(property);
  } else if (cav && eventType) {
    const property = `cav.${cav}.${eventType}`;

    filter[property] = { $exists: true };

    projection.push(property);
  } else if (cav) {
    const property = `cav.${cav}`;

    filter[property] = { $exists: true };

    projection.push(property);
  } else {
    projection.push("cav");
  }

  return {
    filter,
    projection,
  };
}

async function deleteOneHourEntry({
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
  const hourProperty = `cav.${cav}.${eventType}.${hour}`;

  const filter = {
    date,
    [hourProperty]: { $exists: true },
  };

  const replacement = {
    [hourProperty]: {},
  };

  return Schedule.findOneAndUpdate(filter, replacement);
}

async function getAll(): Promise<IScheduleDocument[]> {
  return Schedule.find({});
}

async function getOneByDate(date: string): Promise<IScheduleDocument | null> {
  return Schedule.findOne({ date });
}

async function getOneByParams(params: {
  date: string;
  cav?: string;
  eventType?: string;
  hour?: number;
}): Promise<IScheduleDocument | null> {
  const { filter, projection } = buildQueryParams(params);

  return Schedule.findOne(filter, projection);
}

async function updateOneHourEntry({
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
  const hourProperty = `cav.${cav}.${eventType}.${hour}`;

  const filter = {
    date,
    [hourProperty]: { $exists: true },
  };

  const replacement = {
    [hourProperty]: { car },
  };

  return Schedule.findOneAndUpdate(filter, replacement);
}

export default {
  deleteOneHourEntry,
  getAll,
  getOneByDate,
  getOneByParams,
  updateOneHourEntry,
};

if (!process.env.POPULATE_DB) {
  process.exit(0);
}

import { connection } from "../src/infra/mongoDB";
import mongoose from "mongoose";
import Car, { ICar } from "../src/models/carModel";
import Cav, { ICav } from "../src/models/cavModel";
import Schedule, { ISchedule } from "../src/models/scheduleModel";
import User, { IUser } from "../src/models/userModel";
import { promisify } from "util";

import calendarData from "../data/init/calendar.json";
import carsData from "../data/init/cars.json";
import cavsData from "../data/init/cav.json";
import usersData from "../data/init/users.json";

const allData = [
  [Schedule, calendarData],
  [Car, carsData],
  [Cav, cavsData],
  [User, usersData],
];

type IData = ICar | ICav | ISchedule | IUser;
type IModel = mongoose.Model<mongoose.Document>;

async function populate(): Promise<void> {
  console.log("Database population started.");

  await connection;

  const deletePromises = allData.map(([model]) =>
    (model as mongoose.Model<mongoose.Document>).deleteMany({})
  );

  await Promise.all(deletePromises);

  const resetCountPromises = [
    promisify(Car.resetCount)(),
    promisify(Cav.resetCount)(),
    promisify(User.resetCount)(),
  ];

  await Promise.all(resetCountPromises);

  const insertPromises: Array<Promise<mongoose.Document>[]> = allData.map(
    ([model, modelData]) =>
      (modelData as Array<IData>).map((documentData) => {
        const newDocument: mongoose.Document = new (model as IModel)(
          documentData
        );

        return newDocument.save();
      })
  );

  const flatInsertPromises = insertPromises.reduce(
    (accum, val) => accum.concat(val),
    []
  );

  await Promise.all(flatInsertPromises);

  console.log("Database population finished.");

  return mongoose.connection.close();
}

populate();

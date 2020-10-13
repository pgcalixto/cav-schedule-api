import mongoose from "mongoose";

const eventType = {
  type: mongoose.Schema.Types.Map,
  of: {
    car: { type: Number, min: 1 },
  },
  required: true,
};

const scheduleSchema = new mongoose.Schema({
  date: {
    type: String,
    match: /^\d{4}-\d{2}-\d{2}$/,
    index: true,
    required: true,
    unique: true,
  },
  cav: {
    type: mongoose.Schema.Types.Map,
    of: {
      inspection: eventType,
      visit: eventType,
    },
  },
});

export interface ISchedule {
  date: string;
  cav: {
    [index: string]: {
      [E in "inspection" | "visit"]: {
        [index: string]: {
          car?: number;
        };
      };
    };
  };
}

export type IScheduleDocument = ISchedule & mongoose.Document;

export interface IScheduleModel extends mongoose.Model<IScheduleDocument> {
  resetCount(callback: (err: Error, val: number | undefined) => void): void;
}

const Schedule: IScheduleModel = mongoose.model<
  IScheduleDocument,
  IScheduleModel
>("Schedule", scheduleSchema);

export default Schedule;

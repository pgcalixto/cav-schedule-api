import * as restify from "restify";
import scheduleService from "../services/scheduleService";
import logger from "../services/loggerService";

async function deleteSchedule(
  req: restify.Request,
  res: restify.Response,
  next: restify.Next
): Promise<void> {
  const { cav, date, eventType, hour } = req.params;

  try {
    const response = await scheduleService.deleteSchedule({
      cav,
      date,
      eventType,
      hour,
    });

    res.send(response);

    return next();
  } catch (err) {
    logger.error(err);

    return next(err);
  }
}

async function getAllSchedules(
  req: restify.Request,
  res: restify.Response,
  next: restify.Next
): Promise<void> {
  try {
    const result = await scheduleService.getAllSchedules();

    res.send(result);

    return next();
  } catch (err) {
    logger.error(err);

    return next(err);
  }
}

async function getScheduleByParams(
  req: restify.Request,
  res: restify.Response,
  next: restify.Next
): Promise<void> {
  try {
    const result = await scheduleService.getScheduleByParams(req.params);

    res.send(result);

    return next();
  } catch (err) {
    logger.error(err);

    return next(err);
  }
}

async function updateSchedule(
  req: restify.Request,
  res: restify.Response,
  next: restify.Next
): Promise<void> {
  const { car, cav, date, eventType, hour } = req.params;

  try {
    const response = await scheduleService.updateSchedule({
      car,
      cav,
      date,
      eventType,
      hour,
    });

    res.send(response);

    return next();
  } catch (err) {
    logger.error(err);

    return next(err);
  }
}

export default {
  deleteSchedule,
  getAllSchedules,
  getScheduleByParams,
  updateSchedule,
};

import * as restify from "restify";
import authValidator from "../validators/authValidator";
import scheduleController from "../controllers/scheduleController";
import scheduleValidator from "../validators/scheduleValidator";

function set(server: restify.Server): void {
  server.get(
    "/schedules",
    authValidator.validateJWT,
    scheduleController.getAllSchedules
  );
  server.get(
    "/schedules/:date",
    authValidator.validateJWT,
    scheduleValidator.validateGetScheduleByParams,
    scheduleController.getScheduleByParams
  );
  server.get(
    "/schedules/:date/:cav",
    authValidator.validateJWT,
    scheduleValidator.validateGetScheduleByParams,
    scheduleController.getScheduleByParams
  );
  server.get(
    "/schedules/:date/:cav/:eventType",
    authValidator.validateJWT,
    scheduleValidator.validateGetScheduleByParams,
    scheduleController.getScheduleByParams
  );
  server.get(
    "/schedules/:date/:cav/:eventType/:hour",
    authValidator.validateJWT,
    scheduleValidator.validateGetScheduleByParams,
    scheduleController.getScheduleByParams
  );
  server.put(
    "/schedules/:date/:cav/:eventType/:hour",
    authValidator.validateJWT,
    scheduleValidator.validateUpdateSchedule,
    scheduleController.updateSchedule
  );
  server.del(
    "/schedules/:date/:cav/:eventType/:hour",
    authValidator.validateJWT,
    scheduleValidator.validateDeleteSchedule,
    scheduleController.deleteSchedule
  );
}

export default {
  set,
};

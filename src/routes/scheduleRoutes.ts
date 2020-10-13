import * as restify from "restify";
import authValidator from "../validators/authValidator";
import scheduleController from "../controllers/scheduleController";
import scheduleValidator from "../validators/scheduleValidator";

function set(server: restify.Server): void {
  server.get(
    "/dates",
    authValidator.validateJWT,
    scheduleController.getAllSchedules
  );
  server.get(
    "/dates/:date",
    authValidator.validateJWT,
    scheduleValidator.validateGetScheduleByParams,
    scheduleController.getScheduleByParams
  );
  server.get(
    "/dates/:date/:cav",
    authValidator.validateJWT,
    scheduleValidator.validateGetScheduleByParams,
    scheduleController.getScheduleByParams
  );
  server.get(
    "/dates/:date/:cav/:eventType",
    authValidator.validateJWT,
    scheduleValidator.validateGetScheduleByParams,
    scheduleController.getScheduleByParams
  );
  server.get(
    "/dates/:date/:cav/:eventType/:hour",
    authValidator.validateJWT,
    scheduleValidator.validateGetScheduleByParams,
    scheduleController.getScheduleByParams
  );
  server.put(
    "/dates/:date/:cav/:eventType/:hour",
    authValidator.validateJWT,
    scheduleValidator.validateUpdateSchedule,
    scheduleController.updateSchedule
  );
  server.del(
    "/dates/:date/:cav/:eventType/:hour",
    authValidator.validateJWT,
    scheduleValidator.validateDeleteSchedule,
    scheduleController.deleteSchedule
  );
}

export default {
  set,
};

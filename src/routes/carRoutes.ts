import { Server } from "restify";
import carController from "../controllers/carController";
import authValidator from "../validators/authValidator";
import carValidator from "../validators/carValidator";

function set(server: Server): void {
  server.get("/cars", authValidator.validateJWT, carController.getAllCars);
  server.post(
    "/cars",
    authValidator.validateJWT,
    carValidator.validateCreateCar,
    carController.createCar
  );
  server.get(
    "/cars/:id",
    authValidator.validateJWT,
    carValidator.validateGetCarById,
    carController.getCarById
  );
  server.put(
    "/cars/:id",
    authValidator.validateJWT,
    carValidator.validateUpdateCarInfo,
    carController.updateCarInfo
  );
  // TODO: add car delete endpoint
}

export default {
  set,
};

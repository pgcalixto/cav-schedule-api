import { Server } from "restify";
import carController from "../controllers/carController";
import carValidator from "../validators/carValidator";

function set(server: Server): void {
  server.get("/cars", carController.getAllCars);
  server.post("/cars", carValidator.validateCreateCar, carController.createCar);
  server.get(
    "/cars/:id",
    carValidator.validateGetCarById,
    carController.getCarById
  );
  server.put(
    "/cars/:id",
    carValidator.validateUpdateCarInfo,
    carController.updateCarInfo
  );
  // TODO: add car delete endpoint
}

export default {
  set,
};

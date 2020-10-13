import { Server } from "restify";
import carController from "../controllers/carController";
import carValidator from "../validators/carValidator";

function set(server: Server): void {
  server.get("/cars", carController.getAllCars);
  server.get(
    "/cars/:id",
    carValidator.validateGetCarById,
    carController.getCarById
  );
}

export default {
  set,
};

import { Server } from "restify";
import authController from "../controllers/authController";
import authValidator from "../validators/authValidator";

function set(server: Server): void {
  server.post("/login", authValidator.validateLogin, authController.login);
  server.post("/logout", authController.logout);
}

export default {
  set,
};

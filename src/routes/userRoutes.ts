import { Server } from "restify";
import userController from "../controllers/userController";
import userValidator from "../validators/userValidator";

function set(server: Server): void {
  server.get("/users", userController.getAllUsers);
  server.post(
    "/users",
    userValidator.validateCreateUser,
    userController.createUser
  );
  server.get(
    "/users/:id",
    userValidator.validateGetUserById,
    userController.getUserById
  );
  server.put(
    "/users/:id",
    userValidator.validateUpdateUserInfo,
    userController.updateUserInfo
  );
  // TODO: add user delete endpoint
}

export default {
  set,
};

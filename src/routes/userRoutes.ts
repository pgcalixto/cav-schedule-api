import { Server } from "restify";
import userController from "../controllers/userController";
import authValidator from "../validators/authValidator";
import userValidator from "../validators/userValidator";

function set(server: Server): void {
  server.get("/users", authValidator.validateJWT, userController.getAllUsers);
  server.post(
    "/users",
    authValidator.validateJWT,
    userValidator.validateCreateUser,
    userController.createUser
  );
  server.get(
    "/users/:id",
    authValidator.validateJWT,
    userValidator.validateGetUserById,
    userController.getUserById
  );
  server.put(
    "/users/:id",
    authValidator.validateJWT,
    userValidator.validateUpdateUserInfo,
    userController.updateUserInfo
  );
  // TODO: add user delete endpoint
}

export default {
  set,
};

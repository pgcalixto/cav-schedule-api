import { Server } from "restify";
import cavController from "../controllers/cavController";
import authValidator from "../validators/authValidator";
import cavValidator from "../validators/cavValidator";

function set(server: Server): void {
  server.get("/cavs", authValidator.validateJWT, cavController.getAllCavs);
  server.post(
    "/cavs",
    authValidator.validateJWT,
    cavValidator.validateCreateCav,
    cavController.createCav
  );
  server.get(
    "/cavs/:name",
    authValidator.validateJWT,
    cavValidator.validateGetCavByName,
    cavController.getCavByName
  );
  server.put(
    "/cavs/:oldName",
    authValidator.validateJWT,
    cavValidator.validateUpdateCavInfo,
    cavController.updateCavInfo
  );
  // TODO: add cav delete endpoint
}

export default {
  set,
};

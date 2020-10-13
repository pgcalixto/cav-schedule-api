import { Server } from "restify";
import cavController from "../controllers/cavController";
import cavValidator from "../validators/cavValidator";

function set(server: Server): void {
  server.get("/cavs", cavController.getAllCavs);
  server.post("/cavs", cavValidator.validateCreateCav, cavController.createCav);
  server.get(
    "/cavs/:name",
    cavValidator.validateGetCavByName,
    cavController.getCavByName
  );
  server.put(
    "/cavs/:oldName",
    cavValidator.validateUpdateCavInfo,
    cavController.updateCavInfo
  );
  // TODO: add cav delete endpoint
}

export default {
  set,
};

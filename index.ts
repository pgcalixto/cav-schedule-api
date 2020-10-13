import { connection as dbConnection } from "./src/infra/mongoDB";
import * as restify from "restify";
import corsMiddleware from "restify-cors-middleware";
import logger from "./src/services/loggerService";
import authRoutes from "./src/routes/authRoutes";
import carRoutes from "./src/routes/carRoutes";
import cavRoutes from "./src/routes/cavRoutes";
import scheduleRoutes from "./src/routes/scheduleRoutes";
import userRoutes from "./src/routes/userRoutes";

const PORT = process.env.PORT || 5000;

function setupServer() {
  const server = restify.createServer();

  const cors = corsMiddleware({
    preflightMaxAge: 5,
    origins: ["*"], // TODO: restrict origins
    allowHeaders: ["API-Token"],
    exposeHeaders: ["API-Token-Expiry"],
  });

  server.pre(cors.preflight);
  server.use(cors.actual);
  server.use(restify.plugins.bodyParser({ mapParams: true }));

  authRoutes.set(server);
  carRoutes.set(server);
  cavRoutes.set(server);
  scheduleRoutes.set(server);
  userRoutes.set(server);

  server.listen(PORT, function () {
    console.log("%s listening at %s", server.name, server.url);
  });
}

async function main() {
  try {
    await dbConnection;

    setupServer();
  } catch (err) {
    logger.error(err);
  }
}

main();

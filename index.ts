import * as restify from "restify";
import corsMiddleware from "restify-cors-middleware";
import logger from "./src/services/loggerService";

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

  server.listen(PORT, function () {
    console.log("%s listening at %s", server.name, server.url);
  });
}

async function main() {
  try {
    setupServer();
  } catch (err) {
    logger.error(err);
  }
}

main();

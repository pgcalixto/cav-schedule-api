import { createLogger, format, transports } from "winston";
import { name as serviceName } from "../../package.json";

// TODO: improve log messages
const loggerService = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: serviceName },
  transports: [new transports.Console()],
});

export default loggerService;

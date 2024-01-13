import { createLogger, transports, format } from "winston";
import expressWinston from "express-winston";

import { isDev } from "@utils/initial";

const { combine, timestamp, json } = format;

const logDir = isDev ? "logs" : "/var/log";
const errLog = `${logDir}/error.log`;
const combinedLog = `${logDir}/server.log`;
const options = {
  level: "info",
  format: combine(timestamp(), json()),
  transports: [
    new transports.File({ filename: errLog, level: "error" }),
    new transports.File({ filename: combinedLog }),
  ],
};

export const loggingMiddleware = expressWinston.logger(options);
export const logger = createLogger(options);

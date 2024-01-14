import { Request, Response } from "express";
import winston from "winston";
import expressWinston from "express-winston";
import "winston-daily-rotate-file";
import { DailyRotateFileTransportOptions } from "winston-daily-rotate-file";

import { isDev } from "@utils/initial";

const { combine, timestamp, json } = winston.format;

const timestampFormat = { format: "YYYY-MM-DDTHH:mm:ss.SSSZ" };
const logDir = isDev ? "logs" : "/var/log";
const transportOptions: DailyRotateFileTransportOptions = {
  zippedArchive: true,
  maxSize: "5m",
  maxFiles: "30d",
  filename: `${logDir}/server.%DATE%.log`,
};
const dynamicMeta = (req: Request, res: Response) => {
  if (!req) return {};
  const { reqId } = req;
  return { reqId };
};
const options = {
  format: combine(timestamp(timestampFormat), json()),
  transports: [new winston.transports.DailyRotateFile(transportOptions)],
  dynamicMeta,
};

// TODO: level should be a config
winston.configure({ ...options, level: "verbose" });

expressWinston.requestWhitelist.push("body");
expressWinston.responseWhitelist.push("body");
export const infoLogger = expressWinston.logger(options);

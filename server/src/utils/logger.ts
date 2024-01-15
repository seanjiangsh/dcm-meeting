import { Request, Response } from "express";
import winston from "winston";
import expressWinston from "express-winston";
import "winston-daily-rotate-file";
import { DailyRotateFileTransportOptions } from "winston-daily-rotate-file";

import { appDir, isDev, config } from "@utils/initial";

const { combine, timestamp, json } = winston.format;
const { logLevel } = config;

const timestampFormat = { format: "YYYY-MM-DDTHH:mm:ss.SSSZ" };
const logDir = isDev ? "logs" : `${appDir}/log`;
const transportOptions: DailyRotateFileTransportOptions = {
  zippedArchive: true,
  maxSize: "5m",
  maxFiles: "30d",
  filename: `${logDir}/%DATE%.log`,
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

const winstonOptions = { ...options, level: logLevel };
winston.configure(winstonOptions);

expressWinston.requestWhitelist.push("body");
expressWinston.responseWhitelist.push("body");
const middlewaresOptions = { ...options, level: "http" };
export const infoLogger = expressWinston.logger(middlewaresOptions);

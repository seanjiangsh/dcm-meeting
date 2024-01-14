import path from "path";
import { randomUUID } from "crypto";
import express from "express";
import cors from "cors";
import winston from "winston";
import expressWinston from "express-winston";

import { isDev } from "@utils/initial";
import { infoLogger } from "@utils/logger";
const app = express();
app.disable("x-powered-by");

// ! middlewares
// * register JSON parser
app.use(express.json());

// * add reqId
app.use((req, res, next) => {
  req.reqId = randomUUID();
  next();
});

// * info logger
app.use(infoLogger);

// * set CORS allowed for local dev
if (isDev) app.use(cors({ origin: "http://localhost:3000" }));

// ! endpoints
// app.use("/v1.0", apiV1.0);
app.get("/test", (req, res) => {
  const { reqId, body } = req;
  winston.log({ level: "verbose", message: "verbose logging" });
  winston.log({ level: "info", message: "info logging", reqId, body });
  winston.log({ level: "warn", message: "warn logging" });
  res.send({ hi: "Hello World!" });
});

app.get("/error", (req, res, next) => {
  winston.error(new Error().stack);
  res.status(500).send();
});

// * serve public files on root
const publicDir = path.resolve("public");
app.use(express.static(publicDir));
app.get("/*", (req, res) => {
  const index = `${publicDir}/index.html`;
  res.sendFile(index);
});

export default app;

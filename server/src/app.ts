import path from "path";
import express from "express";
import cors from "cors";

import { isDev } from "@utils/initial";
import { loggingMiddleware, logger } from "@utils/logger";
const app = express();
app.disable("x-powered-by");

// ! middlewares
// * logger
app.use(loggingMiddleware);

// * register JSON parser
app.use(express.json());

// * set CORS allow on localhost
if (isDev) app.use(cors({ origin: "http://localhost:3000" }));

// * endpoints
// app.use("/v1.0", apiV1.0);
app.get("/test", (req, res) => {
  logger.log({ level: "info", message: "test logging" });
  res.send("Hello World!");
});

// * serve public files on root
const publicDir = path.resolve("public");
app.use(express.static(publicDir));
app.get("/*", (req, res) => {
  const index = `${publicDir}/index.html`;
  res.sendFile(index);
});

export default app;

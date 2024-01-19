import { randomUUID } from "crypto";
import express from "express";
import cors from "cors";

import { isDev, config, ServerConfig } from "@utils/initial";
import { infoLogger } from "@utils/logger";
import route from "@routes/routes";

export default function (serverConfig: ServerConfig = config) {
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

  // * add prefix
  const routePrefix = serverConfig.routePrefix || "";
  app.use(routePrefix, route);

  return app;
}

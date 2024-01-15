import path from "path";
import { randomUUID } from "crypto";
import express from "express";
import cors from "cors";

import { isDev, config } from "@utils/initial";
import { infoLogger } from "@utils/logger";
import route from "@routes/routes";

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

// ! routes
const routePrefix = config.routePrefix || "";
app.use(routePrefix, route);

export default app;

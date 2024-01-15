import path from "path";
import express from "express";
import winston from "winston";

const route = express.Router();

// * serve static web page
const publicDir = path.resolve("public");
route.use(express.static(publicDir));
route.get("/meeting", (req, res) => {
  const index = `${publicDir}/index.html`;
  res.sendFile(index);
});

// * test endpoints
route.get("/test", (req, res) => {
  const { reqId, body } = req;
  winston.log({ level: "verbose", message: "verbose logging" });
  winston.log({ level: "info", message: "info logging", reqId, body });
  winston.log({ level: "warn", message: "warn logging" });
  res.send({ hi: "Hello World!" });
});

route.get("/error", (req, res, next) => {
  winston.error(new Error().stack);
  res.status(500).send();
});

export default route;

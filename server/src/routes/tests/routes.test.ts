import request from "supertest";

import app from "@/app";
import { ServerConfig } from "@utils/initial";

test(`server config WITHOUT "routePrefix"`, async () => {
  const config: ServerConfig = { logLevel: "verbose" };
  const response = await request(app(config)).get("/meeting/");
  const { statusCode, headers } = response;
  expect(statusCode).toStrictEqual(200);
  expect(headers["content-type"]).toContain("text/html");
});

test(`server config WITH "routePrefix"`, async () => {
  const routePrefix = "/test";
  const config: ServerConfig = { logLevel: "verbose", routePrefix };
  const response = await request(app(config)).get(`${routePrefix}/meeting/`);
  const { statusCode, headers } = response;
  expect(statusCode).toStrictEqual(200);
  expect(headers["content-type"]).toContain("text/html");
});

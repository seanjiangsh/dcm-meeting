import fse from "fs-extra";

export const isDev = process.env.NODE_ENV === "dev";

export const appDir = isDev ? "." : "/app";

type ServerConfig = {
  logLevel: "error" | "warn" | "info" | "http" | "verbose" | "debug" | "silly";
  routePrefix?: string;
};
export const config: ServerConfig = fse.readJSONSync(`${appDir}/config.json`);

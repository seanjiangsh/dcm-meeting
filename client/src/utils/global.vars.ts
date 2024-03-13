const prefix = window.location.pathname.split("/meeting")[0].replace(/\/$/, "");

export const appPaths = {
  prefix,
  basePath: "",
  apiPath: "/api/v2.0",
};

console.log({ mode: import.meta.env.MODE, prod: import.meta.env.PROD });

if (import.meta.env.PROD) {
  appPaths.basePath = `${prefix}/meeting`;
  appPaths.apiPath = `${prefix}/api/v1.0`;

  // console.trace = () => {};
  // console.debug = () => {};
  // console.log = () => {};
  // console.info = () => {};
  // console.warn = () => {};
  // console.error = () => {};
  document.addEventListener("contextmenu", (event) => event.preventDefault());
}

export const appBarHeight = 64;

const wadoBase = `wadouri:${appPaths.basePath}/dcm/DX-cat`;
export const catWadoIds = [
  `${wadoBase}/1.dcm`,
  `${wadoBase}/2.dcm`,
  `${wadoBase}/3.dcm`,
  `${wadoBase}/4.dcm`,
  `${wadoBase}/5.dcm`,
];
export const RENDERER_ID = "meeting-renderer";
export const VIEWPORT_ID = "meeting-stack-viewport";
export const TOOL_GROUP_ID = "meeting-tool-group";

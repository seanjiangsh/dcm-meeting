export const appPaths = {
  basePath: "",
  apiPath: "/api/v1.0",
};

console.log({ mode: import.meta.env.MODE, prod: import.meta.env.PROD });

if (import.meta.env.PROD) {
  const [basePath] = window.location.pathname.split("/meeting");
  appPaths.basePath = `${basePath}/meeting`;
  appPaths.apiPath = `${basePath}/api/v1.0`;

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

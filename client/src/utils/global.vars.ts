export const appPaths = {
  basePath: "",
  apiPath: "/api/v1.0",
};

if (import.meta.env.PROD) {
  const [basePath] = window.location.pathname.split("/meeting");
  appPaths.basePath = `${basePath}/meeting`;
  appPaths.apiPath = `${basePath}/api/v1.0`;

  console.trace = () => {};
  console.debug = () => {};
  console.log = () => {};
  console.info = () => {};
  console.warn = () => {};
  console.error = () => {};
  document.addEventListener("contextmenu", (event) => event.preventDefault());
}

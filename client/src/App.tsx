import { BrowserRouter } from "react-router-dom";

import { appPaths } from "@utils/global.vars";

import Routing from "@routes/Routing";

export default function App() {
  return (
    <BrowserRouter basename={appPaths.basePath}>
      <Routing />
    </BrowserRouter>
  );
}

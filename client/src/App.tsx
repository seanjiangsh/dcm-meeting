import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

import { appPaths } from "@utils/global.vars";

import Routing from "@routes/Routing";
import { store, persister } from "@redux/root-store";
import { Provider } from "react-redux";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persister}>
        <BrowserRouter basename={appPaths.basePath}>
          <Routing />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

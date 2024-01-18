import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store, persister } from "@redux/root-store";
import { appPaths } from "@utils/global.vars";
import Routing from "@routes/Routing";

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

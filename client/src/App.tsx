import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";

import { store, persister } from "@redux/root-store";
import { appPaths } from "@utils/global.vars";
import Routing from "@routes/routing/Routing";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persister}>
        <ThemeProvider theme={createTheme()}>
          <BrowserRouter basename={appPaths.basePath}>
            <Routing />
          </BrowserRouter>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import { RenderOptions, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { RootState, setupStore, AppStore, persister } from "@redux/root-store";
import { initialState as userInitState } from "@redux/user/initialState";
import { appPaths } from "./global.vars";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: RootState;
  store?: AppStore;
}

const rootState: RootState = {
  user: userInitState,
  _persist: { version: 0, rehydrated: true },
};

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = rootState,
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  const user = userEvent.setup();
  const wrapper = ({ children }: React.PropsWithChildren<object>) => (
    <Provider store={store}>
      <PersistGate persistor={persister}>
        <BrowserRouter basename={appPaths.basePath}>
          <ThemeProvider theme={createTheme()}>{children}</ThemeProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
  // Return an object with the store and all of RTL's query functions
  return { store, user, ...render(ui, { wrapper, ...renderOptions }) };
}

export function renderWithoutRouter(
  ui: React.ReactElement,
  {
    preloadedState = rootState,
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  const user = userEvent.setup();
  const wrapper = ({ children }: React.PropsWithChildren<object>) => (
    <Provider store={store}>
      <PersistGate persistor={persister}>
        <ThemeProvider theme={createTheme()}>{children}</ThemeProvider>
      </PersistGate>
    </Provider>
  );
  // Return an object with the store and all of RTL's query functions
  return { store, user, ...render(ui, { wrapper, ...renderOptions }) };
}

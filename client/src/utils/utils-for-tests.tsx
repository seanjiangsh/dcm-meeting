import React from "react";
import { Provider } from "react-redux";
import { RenderOptions, render } from "@testing-library/react";

import { RootState, setupStore, AppStore } from "@redux/root-store";
import { initialState as userInitState } from "@redux/user/initialState";

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
  const wrapper = ({ children }: React.PropsWithChildren<object>) => (
    <Provider store={store}>{children}</Provider>
  );
  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper, ...renderOptions }) };
}

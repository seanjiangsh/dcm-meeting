import {
  Action,
  ThunkAction,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { createLogger } from "redux-logger";

import { userReducer } from "./user/reducer";
import { toolReducer } from "./tool/reducer";

const logger = createLogger({ duration: true, collapsed: true });
const middlewares: Array<any> = import.meta.env.DEV ? [logger] : [];

const rootReducer = combineReducers({
  user: userReducer,
  tool: toolReducer,
});
const persistWhitelist = ["user"];
const persistedReducer = persistReducer(
  { key: "root", storage, whitelist: persistWhitelist },
  rootReducer,
);
const defaultMiddlewareConfig = {
  serializableCheck: {
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  },
};

const setupStore = (preloadedState?: RootState) => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (gDM) => gDM(defaultMiddlewareConfig).concat(middlewares),
    preloadedState,
  });
};
export const store = setupStore();
export const persister = persistStore(store);

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
export type RootState = ReturnType<typeof persistedReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

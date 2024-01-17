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

const logger = createLogger({ duration: true, collapsed: true });
const middlewares: Array<any> = import.meta.env.DEV ? [logger] : [];

const rootReducer = combineReducers({
  user: userReducer,
});
const persistedReducer = persistReducer({ key: "root", storage }, rootReducer);
const defaultMiddlewareConfig = {
  serializableCheck: {
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  },
};
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (gDM) => gDM(defaultMiddlewareConfig).concat(middlewares),
});
export const persister = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

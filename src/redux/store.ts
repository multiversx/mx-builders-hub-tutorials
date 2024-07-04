import { combineReducers, configureStore } from "@reduxjs/toolkit";
import tutorialReducer from "./slices/tutorial";
import tutorialStepsReducer from "./slices/tutorialSteps";
import currentRouteReducer from "./slices/currentRoute";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import { RootApi } from "./rootApi";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["API"],
};

const rootReducer = combineReducers({
  tutorial: tutorialReducer,
  tutorialSteps: tutorialStepsReducer,
  currentRoute: currentRouteReducer,
  [RootApi.reducerPath]: RootApi.reducer,
});

export const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(RootApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import accountReducer from "./slices/account";
import tutorialStepsReducer from "./slices/tutorialSteps";
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
};

const rootReducer = combineReducers({
  account: persistReducer(persistConfig, accountReducer),
  tutorialSteps: persistReducer(persistConfig, tutorialStepsReducer),
  [RootApi.reducerPath]: RootApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
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

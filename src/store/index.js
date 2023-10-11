import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import { createApi } from "@reduxjs/toolkit/query/react";

import { authReducer } from "./slices/authReducer";
import { axiosBaseQuery } from "api/AxiosBaseQuery";

// initialize an empty api service that we'll inject endpoints into later as needed
export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: axiosBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),
  tagTypes: [],
  endpoints: () => ({}),
});

export const appReducer = combineReducers({
  auth: authReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const rootReducer = (state, action) => {
  if (action.type === "auth/logout") {
    // this applies to all keys defined in persistConfig(s)
    storage.removeItem("persist:todo");

    state = {};
  }
  return appReducer(state, action);
};

const DEV = process.env.NODE_ENV !== "production";

const persistConfig = {
  key: "todo",
  version: 1,
  storage,
  blacklist: ["apiSlice"],
};

const middleware = [...getDefaultMiddleware({}).concat(apiSlice.middleware)];

if (DEV) {
  middleware.push(logger);
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware,
  devTools: DEV,
});
const persistor = persistStore(store);
export { persistor };

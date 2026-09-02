import { configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import createIndexedDBStorage from "redux-persist-indexeddb-storage";
import rootReducer from "./rootReducer";

const storage = createIndexedDBStorage("ecommers-app");

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "product", "cart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);

export default store;

import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import productSlice from "./features/productSlice";
import userSlice from "./features/userSlice";
import appApi from "./services/appApi";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";

// reducers
const reducer = combineReducers({
  user: userSlice,
  products: productSlice,
  [appApi.reducerPath]: appApi.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  blackList: [appApi.reducerPath, "products"],
};

// persist our store
const persistedReducer = persistReducer(persistConfig, reducer);

// creating the store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(appApi.middleware),
});

export default store;

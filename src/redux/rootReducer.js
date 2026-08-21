import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import productReducer from "./productSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  products: productReducer,
});

export default rootReducer;

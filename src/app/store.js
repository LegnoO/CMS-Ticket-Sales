/** @format */

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import ticketSlice from "../features/ticketSlice";
import packageSlice from "../features/packageSlice";
import thunk from "redux-thunk";
import logger from "redux-logger";

const rootReducer = combineReducers({
  ticketSlice: ticketSlice,
  packageSlice: packageSlice,
});

const middleware = [thunk, logger];

const store = configureStore({
  reducer: rootReducer,
  middleware: middleware,
});

export default store;

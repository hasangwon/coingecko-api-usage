import { configureStore, combineReducers } from "@reduxjs/toolkit";
import globalReducer from "./globalSlice";

const rootReducer = combineReducers({
  global: globalReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

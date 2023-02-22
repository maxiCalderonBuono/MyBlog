import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { supabaseApi, usersSlice } from "./slices/index.js";

const reducer = combineReducers({
  [supabaseApi.reducerPath]: supabaseApi.reducer,
  users: usersSlice.reducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(supabaseApi.middleware),
});

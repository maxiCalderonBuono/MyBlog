import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { postsSlice, usersSlice } from "./slices/index.js";

const reducer = combineReducers({
  posts: postsSlice.reducer,
  users: usersSlice.reducer,
});

export const store = configureStore({
  reducer,
});

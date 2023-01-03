import { createSlice } from "@reduxjs/toolkit";

export const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    newState: {},
  },
  reducers: {
    first: (state /* action */) => {},
  },
});

export const { first } = commentsSlice.actions;

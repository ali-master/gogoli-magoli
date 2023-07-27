import { createSlice } from "@reduxjs/toolkit";
import { userInitialState } from "./user.initial";

export const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    prepare: (state, action) => {
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { prepare } = userSlice.actions;
export const userReducer = userSlice.reducer;

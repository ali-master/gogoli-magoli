import { configureStore } from "@reduxjs/toolkit";
// Reducers
import { userReducer } from "./slices/User/user.slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./LoginSlice";
import searchSlice from "./SearchSlice";
import messageSlice from "./MessageSlice";

export const store = configureStore({
  reducer: {
    login: loginSlice,
    search: searchSlice,
    message: messageSlice,
  },
});

import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./LoginSlice";
import searchSlice from "./SearchSlice";
import messageSlice from "./MessageSlice";
import cartSlice from "./CartSlice"

export const store = configureStore({
  reducer: {
    login: loginSlice,
    search: searchSlice,
    message: messageSlice,
    cart : cartSlice ,
  },
});

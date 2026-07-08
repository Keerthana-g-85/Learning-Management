import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
const token = localStorage.getItem("token");

const initialState = {
  token: token,
  user: token ? jwtDecode(token) : null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    addToken: (state, action) => {
      // state.token = action.payload;
      return{
        ...state , token: action.payload
      }
    },

    addUser: (state, action) => {
      // state.user = action.payload;
      return{
        ...state , user : action.payload
      }
    },
  },
});

export const { addToken, addUser } = loginSlice.actions;

export default loginSlice.reducer;

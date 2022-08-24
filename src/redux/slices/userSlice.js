import { createSlice } from "@reduxjs/toolkit";
import { axios } from "axios";

const initialState = {
  user: {
    id: "0",
    name: "",
    email: "",
    cocktails: [],
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    SignInUser: (state, action) => {
      state.user.id = action.payload.googleId;
      state.user.name = action.payload.name;
      state.user.email = action.payload.email;
      state.user.cocktails = [{}];
    },
    SignOutUser: (state, action) => {
      state.user.name = "";
      state.user.email = "";
    },
    AddNewUser: (state, action) => {
      state.user.name = action.payload.name;
      state.user.email = action.payload.email;
    },
  },
});

export const { SignInUser, SignOutUser, AddNewUser } = userSlice.actions;

export default userSlice.reducer;

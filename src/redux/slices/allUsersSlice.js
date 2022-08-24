import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allUsers: [{}],
};

const allUsersSlice = createSlice({
  name: "allUsers",
  initialState,

  reducers: {
    AllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
  },
});

export const { AllUsers } = allUsersSlice.actions;

export default allUsersSlice.reducer;

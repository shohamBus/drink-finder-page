import { configureStore } from "@reduxjs/toolkit";
import drinkReducer from "./slices/drinkSlice";
import displayReducer from "./slices/displaySlice";
import filterReducer from "./slices/filtersSlice";
import userReducer from "./slices/userSlice";
import allUsersReducer from "./slices/allUsersSlice";

export const store = configureStore({
  reducer: {
    drink: drinkReducer,
    display: displayReducer,
    filters: filterReducer,
    user: userReducer,
    allUsers: allUsersReducer,
  },
});

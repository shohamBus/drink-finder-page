import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mainSearch: "",
  ingredient: "",
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    UpdateMainSearch: (state, action) => {
      state.mainSearch = action.payload;
    },
    UpdateIngredient: (state, action) => {
      state.ingredient = action.payload;
    },
  },
});
export const { UpdateMainSearch, UpdateIngredient } = filterSlice.actions;
export default filterSlice.reducer;

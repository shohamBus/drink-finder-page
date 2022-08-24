import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  display: [],
};
export const fetchRandom = createAsyncThunk("display/fetchRandom", () => {
  return axios
    .get(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
    .then((res) => res.data.drinks);
});
export const fetchdisplay = createAsyncThunk("display/fetchdisplay", (id) => {
  return axios
    .get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) => res.data.drinks);
});
const displaySlice = createSlice({
  name: "display",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchRandom.fulfilled, (state, action) => {
      state.display = action.payload;
    });
    builder.addCase(fetchdisplay.fulfilled, (state, action) => {
      state.display = action.payload;
    });
  },
  reducers: {},
});
export default displaySlice.reducer;

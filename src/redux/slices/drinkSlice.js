import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  drinks: [],
  filteredDrinks: [],
  isFilter: false,
};

export const fetchDrinks = createAsyncThunk("drink/fetchDrinks", () => {
  return axios
    .get(
      "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink"
    )
    .then((res) => res.data.drinks)
    .then((res) =>
      axios.all(
        res.map((drink) =>
          axios
            .get(
              `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drink.idDrink}`
            )

            .then((res) => res.data.drinks.find((drink) => drink))
        )
      )
    );
});

const buildDrinkObj = (drinks) => {
  const cleanDrinksArr = drinks.map((drink) => {
    //ingredients
    const ingredientKeys = Object.keys(drink).filter((key) =>
      key.startsWith("strIngredient")
    );
    const ingredientWithValues = ingredientKeys.filter((key) => drink[key]);
    const ingredient = ingredientWithValues.map((key) => drink[key]);

    return {
      idDrink: drink.idDrink,
      strDrink: drink.strDrink,
      strCategory: drink.strCategory,
      ingredient: ingredient,
      dateModified: drink.dateModified,
    };
  });
  return cleanDrinksArr;
};

const drinkSlice = createSlice({
  name: "drink",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchDrinks.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchDrinks.fulfilled, (state, action) => {
      state.loading = false;
      state.drinks = buildDrinkObj([...action.payload]);
      state.filteredDrinks = [...action.payload];
    });
  },
  reducers: {
    filterDrinks: (state, action) => {
      const inpName = action.payload.mainSearch.toLowerCase();
      const inpIngredient = action.payload.ingredient.toLowerCase();
      state.filteredDrinks = [...state.drinks].filter((drink) => {
        return (
          drink.strDrink.toLowerCase().startsWith(inpName) &&
          drink.ingredient.find((item) =>
            item.toLowerCase().startsWith(inpIngredient)
          )
        );
      });
    },

    sortByName: (state) => {
      state.filteredDrinks = [...state.filteredDrinks].sort((a, b) =>
        a.strDrink > b.strDrink ? 1 : b.strDrink > a.strDrink ? -1 : 0
      );
    },
    sortByDate: (state) => {
      state.filteredDrinks = [...state.filteredDrinks].sort(
        (a, b) => Date.parse(b.dateModified) - Date.parse(a.dateModified)
      );
    },
    resetFilterWORK: (state) => {
      state.filteredDrinks = [...state.drinks];
    },
  },
});

export const { filterDrinks, sortByName, sortByDate, resetFilterWORK } =
  drinkSlice.actions;
export default drinkSlice.reducer;

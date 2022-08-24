import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterDrinks } from "../../redux/slices/drinkSlice";
import { UpdateIngredient } from "../../redux/slices/filtersSlice";
import { IconButton, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function FilterBy() {
  const [display, setDisplay] = useState("");
  const filters = useSelector((state) => state.filters);
  const dispatch = useDispatch();

  //send to reducer-filter && set the display
  const handleChange = (event) => {
    setDisplay(event.target.value);
    dispatch(
      filterDrinks({
        mainSearch: filters.mainSearch,
        ingredient: event.target.value,
      })
    );
  };
  //render icon at the search field
  const SearchButton = () => (
    <IconButton>
      <SearchIcon />
    </IconButton>
  );
  return (
    <TextField
      sx={{
        width: "90%",
        borderRadius: 1,
        "& .MuiOutlinedInput-root.Mui-focused": {
          "& > fieldset": {
            borderColor: "#FF5757",
          },
        },
        "& .MuiOutlinedInput-root": {
          "& > fieldset": { border: "3px solid #FF5757" },
        },
      }}
      label={"Filter by ingredient:"}
      variant="outlined"
      value={display}
      onChange={(e) => {
        dispatch(UpdateIngredient(e.target.value));
        handleChange(e);
      }}
      InputProps={{
        endAdornment: <SearchButton />,
        style: { fontSize: 20 },
      }}
    />
  );
}

export default FilterBy;

import React, { useState } from "react";
import { sortByDate, sortByName } from "../../redux/slices/drinkSlice";
import { useDispatch } from "react-redux";
import { MenuItem, TextField } from "@mui/material";
import AbcIcon from "@mui/icons-material/Abc";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

function SortBy() {
  const dispatch = useDispatch();
  const [display, setDisplay] = useState("");

  //change the display inside the search field and send to reducer
  const handleChange = (event) => {
    setDisplay(event.target.value);
    if (event.target.value === "Name") dispatch(sortByName());
    if (event.target.value === "Date") dispatch(sortByDate());
  };

  return (
    <>
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
        label={`Sort by Date/Name:`}
        id="demo-simple-select"
        value={display}
        onChange={handleChange}
        select
        InputProps={{
          style: { fontSize: 20 },
        }}
      >
        <MenuItem value="Name">
          Sort By Name <AbcIcon />
        </MenuItem>
        <MenuItem value="Date">
          Sort By Date
          <CalendarMonthIcon />
        </MenuItem>
      </TextField>
    </>
  );
}

export default SortBy;

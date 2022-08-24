import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterDrinks, resetFilterWORK } from "../../redux/slices/drinkSlice";
import { UpdateMainSearch } from "../../redux/slices/filtersSlice";
import { Paper, Chip, styled, TextField, Button, Box } from "@mui/material";
import "./MainSearch.css";

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function generateString(length) {
  let result = " ";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function MainSearch() {
  const filters = useSelector((state) => state.filters);
  const [currentSearch, setCurrentSearch] = useState("");
  const [prevSearch, setPrevSearch] = useState([]);
  const dispatch = useDispatch();
  const ListItem = styled("li")(({ theme }) => ({
    margin: theme.spacing(0.5),
  }));

  useEffect(() => {
    if (prevSearch.length === 0) {
      dispatch(resetFilterWORK());
    }
  }, [prevSearch]);

  //prev search
  const handleDelete = (chipToDelete) => () => {
    setPrevSearch((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  //send to reducer
  const searchApply = (str) => {
    dispatch(filterDrinks(filters));
    if (!str) {
      if (prevSearch.length === 5) prevSearch.shift();
      (currentSearch !== " " || "") &&
        prevSearch.push({ key: generateString(5), value: currentSearch });
      setCurrentSearch(" ");
    }
  };

  //press enter
  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.key === "Enter") {
      searchApply();
    }
  };

  //render search button
  const SearchButton = () => (
    <Button
      sx={{ bgcolor: "text.secondary" }}
      size="large"
      variant="contained"
      onClick={() => {
        searchApply();
      }}
    >
      {" "}
      SEARCH
    </Button>
  );

  return (
    <>
      <div className="search-bar">
        <TextField
          onKeyPress={handleKeypress}
          label={`Search name of cocktail..`}
          value={currentSearch}
          sx={{
            width: "100%",
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
          variant="outlined"
          onChange={(e) => {
            setCurrentSearch(e.target.value);
            dispatch(UpdateMainSearch(e.target.value));
          }}
          InputProps={{
            endAdornment: (
              <Box
                onClick={(e) => {
                  dispatch(UpdateMainSearch(currentSearch));
                  searchApply("add");
                }}
              >
                {" "}
                <SearchButton />
              </Box>
            ),
            style: { fontSize: 20 },
          }}
        />
      </div>
      <div className="spans">
        <Paper
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            listStyle: "none",
            p: 0.5,
            m: 0,
          }}
          component="ul"
        >
          {prevSearch.length !== 0 &&
            prevSearch?.map((data) => {
              let icon;
              return (
                <ListItem key={data.key}>
                  <Chip
                    onClick={(e) => {
                      setCurrentSearch("");
                      dispatch(UpdateMainSearch(e.target.innerHTML));
                      dispatch(
                        filterDrinks({
                          mainSearch: e.target.innerHTML,
                          ingredient: filters.ingredient,
                        })
                      );
                    }}
                    icon={icon}
                    label={data.value}
                    onDelete={handleDelete(data)}
                  />
                </ListItem>
              );
            })}
        </Paper>
      </div>
    </>
  );
}

export default MainSearch;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchdisplay, fetchRandom } from "../../redux/slices/displaySlice";
import { fetchDrinks } from "../../redux/slices/drinkSlice";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import "../../fonts/Caraque_Trial_RgMelted.ttf";
import "../../fonts/Cute_Aurora_demo.ttf";
import "./DrinkList.css";

function DrinkList() {
  const { loading, filteredDrinks, drinks, isFilter } = useSelector(
    (state) => state.drink
  );
  const dispatch = useDispatch();
  //start- details drinks && random drink
  useEffect(() => {
    dispatch(fetchDrinks());
    dispatch(fetchRandom());
  }, []);

  //row in the list
  function renderRow(id, name, category, style) {
    return (
      <ListItem key={id} component="div" disablePadding>
        <ListItemButton onClick={(e) => dispatch(fetchdisplay(id))}>
          <ListItemText
            sx={{ color: "error.main", fontFamily: "Def" }}
            primary={`${name}`}
            secondary={`Category:${category}`}
          />
        </ListItemButton>
      </ListItem>
    );
  }
  return (
    <div className="drink-list">
      <h1 style={{ textDecoration: "underline", fontFamily: "Light" }}>
        Drinks
      </h1>
      {loading ? (
        <h5>loading...</h5>
      ) : (
        <Paper style={{ maxHeight: 750, overflow: "auto", width: "100%" }}>
          <List height={400} width={360}>
            {filteredDrinks.map((drink) =>
              renderRow(drink.idDrink, drink.strDrink, drink.strCategory)
            )}
          </List>
        </Paper>
      )}
    </div>
  );
}

export default DrinkList;

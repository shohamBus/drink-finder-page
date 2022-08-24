import { Modal, ModalContent } from "./Modal";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { List, Divider, ListItem, ListItemText, Paper } from "@mui/material";
import "./DrinkDetails.css";
import "../../fonts/Caraque_Trial_RgMelted.ttf";

function DrinkDetails() {
  const { display } = useSelector((state) => state.display);
  const [isOpen, setIsopen] = useState(false);

  //modal toggle
  const showModal = () => setIsopen((prev) => !prev);

  return (
    <div className="drink-details">
      <h1 style={{ textDecoration: "underline", fontFamily: "Light" }}>
        Drink Details{" "}
      </h1>

      {display.map((v) => (
        <div key={v} className="details">
          <div key={v} className="content">
            <Paper
              sx={{
                width: "100%",
                bgcolor: "background.paper",
              }}
            >
              <List>
                <ListItem>
                  <ListItemText
                    sx={{ color: "success.main", fontFamily: "Def" }}
                    primary="Name:"
                    secondary={v?.strDrink}
                  />
                </ListItem>
                <Divider component="li" />
                <ListItem>
                  <ListItemText
                    sx={{ color: "success.main", fontFamily: "Def" }}
                    primary="Category:"
                    secondary={v?.strCategory}
                  />
                </ListItem>
                <Divider component="li" />
                <ListItem>
                  <ListItemText
                    sx={{ color: "success.main", fontFamily: "Def" }}
                    primary="CreativeCommonsConfirmed:"
                    secondary={v?.strCreativeCommonsConfirmed}
                  />
                </ListItem>
                <Divider component="li" />
                <ListItem>
                  <ListItemText
                    sx={{ color: "success.main", fontFamily: "Def" }}
                    primary="Glass:"
                    secondary={v?.strGlass}
                  />
                </ListItem>
                <Divider component="li" />
                <ListItem>
                  <List>
                    <ListItemText
                      sx={{ color: "success.main", fontFamily: "Def" }}
                      primary="Ingredients:"
                    />
                    <ListItemText secondary={v?.strIngredient1} />
                    <ListItemText secondary={v?.strIngredient2} />
                    <ListItemText secondary={v?.strIngredient3} />
                    <ListItemText secondary={v?.strIngredient4} />
                    <ListItemText secondary={v?.strIngredient5} />
                    <ListItemText secondary={v?.strIngredient6} />
                    <ListItemText secondary={v?.strIngredient7} />
                    <ListItemText secondary={v?.strIngredient8} />
                    <ListItemText secondary={v?.strIngredient9} />
                    <ListItemText secondary={v?.strIngredient10} />
                  </List>
                </ListItem>
                <Divider component="li" />
                <ListItem>
                  <ListItemText
                    sx={{ color: "success.main", fontFamily: "Def" }}
                    primary="Instructions:"
                    secondary={v?.strInstructions}
                  />
                </ListItem>
                <Divider component="li" />
                {v?.strTags && (
                    <ListItem>
                      <ListItemText
                        sx={{ color: "success.main", fontFamily: "Def" }}
                        primary="Tags::"
                        secondary={v?.strTags}
                      />
                    </ListItem>
                  ) && <Divider component="li" />}
                <ListItem>
                  <ListItemText
                    sx={{ color: "success.main", fontFamily: "Def" }}
                    primary="Date:"
                    secondary={v.dateModified}
                  />
                </ListItem>
                <Divider component="li" />
              </List>
            </Paper>
          </div>
          <div>
            <Modal onOpen={showModal}>
              <div className="image">
                <img
                  src={v?.strDrinkThumb}
                  alt={v?.strDrink}
                  width={200}
                  height={300}
                />
              </div>
            </Modal>
          </div>
          {isOpen && (
            <ModalContent onClose={() => setIsopen(false)}>
              <img
                width="50%"
                height="80%"
                src={v?.strDrinkThumb}
                alt={v?.strDrink}
              />
            </ModalContent>
          )}
        </div>
      ))}
    </div>
  );
}

export default DrinkDetails;

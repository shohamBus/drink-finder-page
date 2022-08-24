import React from "react";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import Header from "../header/Header";
import MainSearch from "../mainSearch/MainSearch";
import FilterBy from "../filterBy/FilterBy";
import SortBy from "../sortBy/SortBy";
import DrinkList from "../drinkList/DrinkList";
import DrinkDetails from "../drinkDetails/DrinkDetails";

function GridComp() {
  return (
    <Box sx={{ flexGrow: 1, m: 2 }}>
      <Grid container spacing={2} p={2}>
        <Grid item xs={12} justifyContent="center" alignItems="center">
          <Header />
        </Grid>
        <Grid
          container
          justifyContent="space-between"
          alignItems="flex-start"
          py={4}
          mb={2}
          spacing={1}
        >
          <Grid item md={4} xs={12} justifyContent="center" alignItems="center">
            <FilterBy />
          </Grid>
          <Grid item md={4} xs={11} m="0 auto">
            <MainSearch />
          </Grid>
          <Grid item md={4} xs={12} justifyContent="center" alignItems="center">
            <SortBy />
          </Grid>
        </Grid>
        <Grid container justifyContent="center" border="1px solid black">
          <Grid item md={4} xs={12} borderRight="1px solid black">
            <DrinkList />
          </Grid>
          <Grid item md={8} sm={12}>
            <DrinkDetails />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
export default GridComp;

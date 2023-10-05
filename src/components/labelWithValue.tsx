import React from "react";
import { Grid } from "@mui/material";
import { ILabelWithValue } from "../interfaces/component";

export const LabelWithValue = (props: ILabelWithValue) => {
  return (
    <Grid
      container
      spacing={{ xs: 1, md: 1 }}
      columns={{ xs: 4, sm: 4, md: 4 }}
    >
      <Grid item xs={4} sm={4} md={4}>
        {props.label}
      </Grid>
      <Grid item xs={4} sm={4} md={4}>
        {props.value}
      </Grid>
    </Grid>
  );
};

import React from "react";
import Grid from "@material-ui/core/Grid";

import { PlayersForm } from "./PlayersForm";

export const AddPlayers = () => {
  return (
    <Grid justify="center" container>
      <Grid item xs={6}>
        <PlayersForm />
      </Grid>
    </Grid>
  );
};

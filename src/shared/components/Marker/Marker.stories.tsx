import React from "react";
import Grid from "@material-ui/core/Grid";

import { Marker } from "./Marker";

export default {
  title: "Marker",
};

export const yesMarker = () => (
  <Grid alignItems="center" spacing={2} container>
    <Grid item>
      <Marker type="yes" />
    </Grid>
    <Grid item>
      <Marker type="yes" size="md" />
    </Grid>
    <Grid item>
      <Marker type="yes" size="sm" />
    </Grid>
  </Grid>
);

export const noMarker = () => (
  <Grid alignItems="center" spacing={2} container>
    <Grid item>
      <Marker type="no" />
    </Grid>
    <Grid item>
      <Marker type="no" size="md" />
    </Grid>
    <Grid item>
      <Marker type="no" size="sm" />
    </Grid>
  </Grid>
);

export const maybeMarker = () => (
  <Grid alignItems="center" spacing={2} container>
    <Grid item>
      <Marker type="maybe" />
    </Grid>
    <Grid item>
      <Marker type="maybe" size="md" />
    </Grid>
    <Grid item>
      <Marker type="maybe" size="sm" />
    </Grid>
  </Grid>
);

export const soFarMarker = () => (
  <Grid alignItems="center" spacing={2} container>
    <Grid item>
      <Marker type="so far" />
    </Grid>
    <Grid item>
      <Marker type="so far" size="md" />
    </Grid>
    <Grid item>
      <Marker type="so far" size="sm" />
    </Grid>
  </Grid>
);

export const soCloseMarker = () => (
  <Grid alignItems="center" spacing={2} container>
    <Grid item>
      <Marker type="so close" />
    </Grid>
    <Grid item>
      <Marker type="so close" size="md" />
    </Grid>
    <Grid item>
      <Marker type="so close" size="sm" />
    </Grid>
  </Grid>
);

export const correctMarker = () => (
  <Grid alignItems="center" spacing={2} container>
    <Grid item>
      <Marker type="correct" />
    </Grid>
    <Grid item>
      <Marker type="correct" size="md" />
    </Grid>
    <Grid item>
      <Marker type="correct" size="sm" />
    </Grid>
  </Grid>
);

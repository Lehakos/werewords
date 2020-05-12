import React, { FC } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

type Props = {
  backgroundColor: string;
  color: string;
  text: string;
};

export const Card: FC<Props> = ({ backgroundColor, color, text, children }) => {
  const classes = useStyles({ backgroundColor, color });

  return (
    <Paper className={classes.root}>
      <Typography variant="h2" component="h3">
        {text}
      </Typography>
    </Paper>
  );
};

const useStyles = makeStyles<Theme, { backgroundColor: string; color: string }>(
  {
    root: ({ backgroundColor, color }) => {
      return {
        display: "flex",
        width: "500px",
        height: "250px",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor,
        color,
        textTransform: "uppercase",
      };
    },
  }
);

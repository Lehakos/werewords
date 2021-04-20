import React from "react";
import cx from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";

import { useSelectPlayers, useSelectMaster } from "model/players";

export const FinishStep = () => {
  const players = useSelectPlayers();
  const master = useSelectMaster();
  const classes = useStyles();

  return (
    <List>
      {players.map((player) => {
        const isMaster = player.id === master?.id;
        const namesFirstLetter = player.name[0] || "";

        return (
          <ListItem key={player.id} disableGutters>
            <ListItemAvatar>
              <Avatar className={cx({ [classes.masterAvatar]: isMaster })}>
                {namesFirstLetter.toUpperCase()}
              </Avatar>
            </ListItemAvatar>

            <ListItemText
              primary={player.name}
              secondary={isMaster && "Ведущий"}
            />
          </ListItem>
        );
      })}
    </List>
  );
};

const useStyles = makeStyles({
  masterAvatar: {
    backgroundColor: green[400],
  },
});

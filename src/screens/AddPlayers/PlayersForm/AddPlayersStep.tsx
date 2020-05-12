import React from "react";
import { useStore } from "effector-react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

import { addPlayer, deletePlayer, editPlayer, $players } from "../model";
import { PlayerField } from "./PlayerField";

export const AddPlayersStep = () => {
  const players = useStore($players);

  return (
    <>
      <Box mb={3}>
        {players.map((player, ind) => {
          const isLast = ind === players.length - 1;
          return (
            <Box key={player.id} mb={isLast ? 0 : 2}>
              <PlayerField
                data={player}
                onChange={editPlayer}
                onDelete={deletePlayer}
                onEnter={() => addPlayer()}
                cannotDelete={players.length <= 1}
              />
            </Box>
          );
        })}
      </Box>

      <Box display="flex" justifyContent="center">
        <Button
          onClick={() => addPlayer()}
          variant="contained"
          color="primary"
          size="large"
          startIcon={<AddIcon />}
        >
          Добавить игрока
        </Button>
      </Box>
    </>
  );
};

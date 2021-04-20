import React from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

import {
  useSelectPlayers,
  createPlayer,
  deletePlayer,
  updatePlayer,
} from "model/players";
import { useAppDispatch } from "shared/app-state";

import { PlayerField } from "./PlayerField";

export const AddPlayersStep = () => {
  const dispatch = useAppDispatch();
  const players = useSelectPlayers();

  return (
    <>
      <Box mb={3}>
        {players.map((player, ind) => {
          const isLast = ind === players.length - 1;
          return (
            <Box key={player.id} mb={isLast ? 0 : 2}>
              <PlayerField
                data={player}
                onChange={(data) => dispatch(updatePlayer(data))}
                onDelete={(id) => dispatch(deletePlayer(id))}
                onEnter={() => dispatch(createPlayer())}
                cannotDelete={players.length <= 1}
              />
            </Box>
          );
        })}
      </Box>

      <Box display="flex" justifyContent="center">
        <Button
          onClick={() => dispatch(createPlayer())}
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

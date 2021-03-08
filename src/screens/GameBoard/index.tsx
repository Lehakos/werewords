import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { useStore } from "effector-react";

import { PlayerCard } from "components/PlayerCard";
import { giveMarkerToPlayerRequest } from "model/game";

import {
  $playersList,
  $availableMarkers,
  $remainedAnswersNum,
  onStartNewGame,
} from "./model";

export const GameBoard = () => {
  const players = useStore($playersList);
  const availableMarkers = useStore($availableMarkers);
  const remainedAnswersNum = useStore($remainedAnswersNum);

  return (
    <>
      <Grid spacing={2} container>
        {players.map((player) => (
          <Grid key={player.id} xs={4} item>
            <PlayerCard
              onAddMarker={(markerType) => {
                giveMarkerToPlayerRequest({ markerType, playerId: player.id });
              }}
              availableMarkers={availableMarkers}
              name={player.name}
              markers={player.markers}
            />
          </Grid>
        ))}
      </Grid>

      <Box mt={2}>
        <Typography>Осталось вопросов: {remainedAnswersNum}</Typography>
      </Box>

      <Box mt={2} display="flex" justifyContent="center">
        <Button variant="outlined" onClick={() => onStartNewGame()}>
          Начать новую игру
        </Button>
      </Box>
    </>
  );
};

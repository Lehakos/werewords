import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import reduce from "lodash/reduce";

import { MarkerType } from "shared/constants/markerTypes";
import { PlayerCard } from "shared/components/PlayerCard";
import {
  giveMarkerToPlayer,
  startNewGame,
  useSelectMarkersByPlayer,
  useSelectRemainedMarkers,
} from "model/game";
import { useSelectPlayers } from "model/players";
import { setScreen, ScreensEnum } from "model/routing";
import { useAppDispatch } from "shared/app-state";

const useSelectAvailableMarkers = () => {
  const remainedMarkers = useSelectRemainedMarkers();

  return reduce<typeof remainedMarkers, MarkerType[]>(
    remainedMarkers,
    (acc, count, markerType) => {
      if (count > 0) {
        acc.push(markerType as MarkerType);
      }

      return acc;
    },
    []
  );
};

const useSelectPlayersList = () => {
  const players = useSelectPlayers();
  const markersByPlayer = useSelectMarkersByPlayer();

  return players.map((player) => {
    const playerMarkers = markersByPlayer[player.id];
    return {
      ...player,
      markers: reduce<
        typeof playerMarkers,
        { type: MarkerType; count: number }[]
      >(
        playerMarkers,
        (acc, count, type) => {
          acc.push({ type: type as MarkerType, count: count as number });
          return acc;
        },
        []
      ),
    };
  });
};

const useSelectRemainedAnswersNum = () => useSelectRemainedMarkers().yes;

export const GameBoard = () => {
  const players = useSelectPlayersList();
  const availableMarkers = useSelectAvailableMarkers();
  const remainedAnswersNum = useSelectRemainedAnswersNum();
  const dispatch = useAppDispatch();

  return (
    <>
      <Grid spacing={2} container>
        {players.map((player) => (
          <Grid key={player.id} xs={4} item>
            <PlayerCard
              onAddMarker={(markerType) => {
                dispatch(
                  giveMarkerToPlayer({ markerType, playerId: player.id })
                );
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
        <Button
          variant="outlined"
          onClick={() => {
            dispatch(startNewGame());
            dispatch(setScreen(ScreensEnum.addPlayers));
          }}
        >
          Начать новую игру
        </Button>
      </Box>
    </>
  );
};

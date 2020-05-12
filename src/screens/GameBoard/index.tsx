import React from "react";
import Grid from "@material-ui/core/Grid";
import { useStore } from "effector-react";

import { PlayerCard } from "components/PlayerCard";
import { giveMarkerToPlayerRequest } from "model/game";

import { $playersList, $availableMarkers } from "./model";

export const GameBoard = () => {
  const players = useStore($playersList);
  const availableMarkers = useStore($availableMarkers);

  return (
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
  );
};

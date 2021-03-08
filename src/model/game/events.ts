import { createEvent } from "effector";

import { MarkerType } from "shared/markerTypes";

export const setWord = createEvent<string>("set word");

type GiveMarkerToPlayer = {
  playerId: string;
  markerType: MarkerType;
};

export const giveMarkerToPlayerRequest = createEvent<GiveMarkerToPlayer>(
  "give marker to player request"
);

export const markerGivenToPlayer = createEvent<GiveMarkerToPlayer>(
  "marker given to player request"
);

export const minusRemainedMarker = createEvent<MarkerType>(
  "minus remained marker"
);

export const startNewGame = createEvent("start new game");

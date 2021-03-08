import { createEvent } from "effector";

import { MarkerType } from "shared/markerTypes";

import { PlayerBaseInformation, Ids } from "./types";

export const savePlayers = createEvent<{
  byId: { [id: string]: PlayerBaseInformation };
  ids: Ids;
  master: string;
}>("save players");

export const addMarker = createEvent<{
  markerType: MarkerType;
  playerId: string;
}>("add marker");

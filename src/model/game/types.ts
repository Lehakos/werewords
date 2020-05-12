import { MarkerType } from "shared/markerTypes";

export type RemainedMarkers = Record<MarkerType, number>;

export type PlayerMarkers = Record<MarkerType, number>;

export type MarkersByPlayer = {
  [playerId: string]: PlayerMarkers;
};

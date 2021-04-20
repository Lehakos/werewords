import { MarkerType } from "shared/constants/markerTypes";

export type RemainedMarkers = Record<MarkerType, number>;

export type PlayerMarkers = Partial<Record<MarkerType, number>>;

export type MarkersByPlayer = {
  [playerId: string]: PlayerMarkers;
};

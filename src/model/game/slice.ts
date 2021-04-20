import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { markerTypes, MarkerType } from "shared/constants/markerTypes";
import {
  MAYBE_MARKERS,
  YES_NO_MARKERS,
  SO_CLOSE_FAR_MARKERS,
} from "shared/constants/config";
import { useAppSelector } from "shared/app-state";

import { RemainedMarkers, MarkersByPlayer } from "./types";

export interface GameState {
  word: string;
  remainedMarkers: RemainedMarkers;
  markersByPlayer: MarkersByPlayer;
}

const initialRemainedMarkers = {
  [markerTypes.correct]: 1,
  [markerTypes.maybe]: MAYBE_MARKERS,
  [markerTypes.no]: YES_NO_MARKERS,
  [markerTypes.yes]: YES_NO_MARKERS,
  [markerTypes.soClose]: SO_CLOSE_FAR_MARKERS,
  [markerTypes.soFar]: SO_CLOSE_FAR_MARKERS,
};

const initialState: GameState = {
  word: "",
  remainedMarkers: initialRemainedMarkers,
  markersByPlayer: {},
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setWord: (state, action: PayloadAction<string>) => {
      state.word = action.payload;
    },
    startNewGame: (state) => {
      return initialState;
    },
    giveMarkerToPlayer: (
      state,
      {
        payload: { playerId, markerType },
      }: PayloadAction<{ playerId: string; markerType: MarkerType }>
    ) => {
      const { remainedMarkers, markersByPlayer } = state;
      const markerTypeRemained = remainedMarkers[markerType];

      if (markerTypeRemained === 0) {
        return;
      }

      if (!markersByPlayer[playerId]) {
        markersByPlayer[playerId] = {};
      }

      const playerMarkers = markersByPlayer[playerId];
      const markerCount = playerMarkers[markerType] || 0;

      playerMarkers[markerType] = markerCount + 1;

      if (markerType === markerTypes.yes || markerType === markerTypes.no) {
        state.remainedMarkers[markerTypes.yes] -= 1;
        state.remainedMarkers[markerTypes.no] -= 1;
        return;
      }

      state.remainedMarkers[markerType] -= 1;
    },
  },
});

export const useSelectGameState = () => useAppSelector((state) => state.game);
export const useSelectWord = () => useAppSelector((state) => state.game.word);
export const useSelectRemainedMarkers = () =>
  useAppSelector((state) => state.game.remainedMarkers);
export const useSelectMarkersByPlayer = () =>
  useAppSelector((state) => state.game.markersByPlayer);

export const { setWord, startNewGame, giveMarkerToPlayer } = gameSlice.actions;

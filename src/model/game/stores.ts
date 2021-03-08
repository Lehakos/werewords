import { createStore, guard, sample } from "effector";

import { markerTypes } from "shared/markerTypes";
import {
  MAYBE_MARKERS,
  YES_NO_MARKERS,
  SO_CLOSE_FAR_MARKERS,
} from "shared/config";

import {
  setWord,
  giveMarkerToPlayerRequest,
  minusRemainedMarker,
  markerGivenToPlayer,
  startNewGame,
} from "./events";
import { RemainedMarkers, MarkersByPlayer } from "./types";

export const $word = createStore<string>("")
  .on(setWord, (_, word) => word)
  .on(startNewGame, () => "");

const initialRemainedMarkers = {
  [markerTypes.correct]: 1,
  [markerTypes.maybe]: MAYBE_MARKERS,
  [markerTypes.no]: YES_NO_MARKERS,
  [markerTypes.yes]: YES_NO_MARKERS,
  [markerTypes.soClose]: SO_CLOSE_FAR_MARKERS,
  [markerTypes.soFar]: SO_CLOSE_FAR_MARKERS,
};

export const $remainedMarkers = createStore<RemainedMarkers>(
  initialRemainedMarkers
)
  .on(minusRemainedMarker, (state, type) => {
    const currentVal = state[type];
    const newVal = currentVal - 1;

    if (newVal < 0) {
      return state;
    }

    if (type === markerTypes.yes || type === markerTypes.no) {
      return {
        ...state,
        [markerTypes.yes]: newVal,
        [markerTypes.no]: newVal,
      };
    }

    return {
      ...state,
      [type]: newVal,
    };
  })
  .on(startNewGame, () => initialRemainedMarkers);

guard({
  source: giveMarkerToPlayerRequest,
  filter: ({ markerType }) => {
    const remainedMarkers = $remainedMarkers.getState();
    const markerTypeRemained = remainedMarkers[markerType];

    return markerTypeRemained > 0;
  },
  target: markerGivenToPlayer,
});

export const $markersByPlayer = createStore<MarkersByPlayer>({})
  .on(markerGivenToPlayer, (state, { playerId, markerType }) => {
    const playerMarkers = state[playerId] || {};
    const markerCount = playerMarkers[markerType] || 0;

    return {
      ...state,
      [playerId]: {
        ...playerMarkers,
        [markerType]: markerCount + 1,
      },
    };
  })
  .on(startNewGame, () => ({}));

sample({
  source: markerGivenToPlayer,
  fn: ({ markerType }) => markerType,
  target: minusRemainedMarker,
});

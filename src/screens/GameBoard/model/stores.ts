import { combine } from "effector";
import reduce from "lodash/reduce";

import { $remainedMarkers, $markersByPlayer } from "model/game";
import { $players } from "model/players";
import { MarkerType } from "shared/markerTypes";

export const $availableMarkers = $remainedMarkers.map((remainedMarkers) =>
  reduce<typeof remainedMarkers, MarkerType[]>(
    remainedMarkers,
    (acc, count, markerType) => {
      if (count > 0) {
        acc.push(markerType as MarkerType);
      }

      return acc;
    },
    []
  )
);

export const $playersList = combine(
  [$markersByPlayer, $players],
  ([markersByPlayer, players]) => {
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
            acc.push({ type: type as MarkerType, count });
            return acc;
          },
          []
        ),
      };
    });
  }
);

export const $remainedAnswersNum = $remainedMarkers.map((state) => state.yes);

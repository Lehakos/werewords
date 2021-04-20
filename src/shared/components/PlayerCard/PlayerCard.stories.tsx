import React from "react";

import { markerTypes } from "shared/constants/markerTypes";

import { PlayerCard } from "./PlayerCard";

export default {
  title: "PlayerCard",
};

export const basic = () => (
  <PlayerCard
    name="Вася"
    availableMarkers={[
      markerTypes.yes,
      markerTypes.no,
      markerTypes.maybe,
      markerTypes.soFar,
      markerTypes.soClose,
    ]}
    markers={[
      {
        type: markerTypes.yes,
        count: 5,
      },
      {
        type: markerTypes.no,
        count: 5,
      },
      {
        type: markerTypes.maybe,
        count: 2,
      },
      {
        type: markerTypes.soFar,
        count: 1,
      },
      {
        type: markerTypes.soClose,
        count: 1,
      },
    ]}
    onAddMarker={() => {}}
  />
);

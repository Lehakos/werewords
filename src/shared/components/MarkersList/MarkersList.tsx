import React from "react";
import Box from "@material-ui/core/Box";

import { Marker, MarkerProps, markerSizeMap } from "../Marker";

type Props = MarkerProps & {
  count: number;
};

export const MarkersList = ({ size = "l", type, count }: Props) => {
  const markerSize = markerSizeMap[size];
  const markerShift = markerSize / 4;

  return (
    <Box display="flex" flexWrap="wrap" pl={`${markerShift}px`}>
      {[...new Array(count)].map((_, index) => {
        return (
          <Box key={index} ml={`-${markerShift}px`}>
            <Marker type={type} size={size} />
          </Box>
        );
      })}
    </Box>
  );
};

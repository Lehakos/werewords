import React from "react";
import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";

import { markerNames, MarkerType } from "shared/constants/markerTypes";
import { useHover } from "shared/libs/useHover";

import { Marker } from "../Marker";
import { MarkersList } from "../MarkersList";

type Props = {
  name: string;
  markers: { type: MarkerType; count: number }[];
  availableMarkers: MarkerType[];
  onAddMarker: (type: MarkerType) => void;
};

export const PlayerCard = ({
  name,
  markers,
  onAddMarker,
  availableMarkers,
}: Props) => {
  const { isHovered, setIsHovered, handlers } = useHover();
  const handleAddMarker = (markerType: MarkerType) => {
    setIsHovered(false);
    onAddMarker(markerType);
  };
  const hasMarkers = markers.length > 0;

  return (
    <Root {...handlers}>
      <Box px={4} py={2}>
        <Typography variant="h3">{name}</Typography>
      </Box>

      {hasMarkers && (
        <>
          <Divider />

          <Box px={4} py={2}>
            {markers.map(({ type, count }, index) => {
              const isLast = index === markers.length - 1;
              return (
                <Box key={type} display="flex">
                  <Box mr={2} py="2px" mb={isLast ? 0 : 1}>
                    <Typography variant="subtitle1">
                      {markerNames[type]}:
                    </Typography>
                  </Box>
                  <Box>
                    <MarkersList size="md" type={type} count={count} />
                  </Box>
                </Box>
              );
            })}
          </Box>
        </>
      )}

      <ActionsWrapper isVisible={isHovered}>
        <Grid justify="center" spacing={1} container>
          {availableMarkers.map((type) => {
            return (
              <Grid key={type} item>
                <Marker
                  type={type}
                  onClick={() => handleAddMarker(type)}
                  button
                />
              </Grid>
            );
          })}
        </Grid>
      </ActionsWrapper>
    </Root>
  );
};

const ActionsWrapper = styled.div<{ isVisible: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(0, 0, 0, 0.5);
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  pointer-events: ${(props) => (props.isVisible ? "all" : "none")};

  transition: opacity 0.3s;
`;

const Root = styled(Paper)`
  position: relative;
`;

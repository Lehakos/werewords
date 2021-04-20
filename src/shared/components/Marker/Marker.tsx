import React, { ComponentType } from "react";
import { makeStyles, useTheme, Theme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { yellow } from "@material-ui/core/colors";
import { SvgIconProps } from "@material-ui/core/SvgIcon";
import ButtonBase from "@material-ui/core/ButtonBase";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import StarIcon from "@material-ui/icons/Star";

import { markerTypes, MarkerType } from "shared/constants/markerTypes";

import { QuestionIcon } from "../Icons";

export const markerSizeMap = {
  l: 48,
  md: 32,
  sm: 24,
};

const iconSizeMap = {
  l: 32,
  md: 24,
  sm: 16,
};

type Size = "l" | "md" | "sm";

type AllMarkersProps = {
  size?: Size;
} & (
  | { button: true; onClick: () => void }
  | { button?: false; onClick?: never }
);

type MarkerBaseProps = AllMarkersProps & {
  bgColor: string;
  hoverColor: string;
  iconColor?: string;
  iconComponent: ComponentType<SvgIconProps>;
  size?: Size;
};

export const MarkerBase = ({
  iconComponent: Icon,
  iconColor = "#fff",
  size = "l",
  button = false,
  onClick,
  bgColor,
  hoverColor,
}: MarkerBaseProps) => {
  const markerSize = markerSizeMap[size];
  const iconSize = iconSizeMap[size];
  const classes = useStyles({ button, root: { bgColor, hoverColor } });

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      borderRadius="50%"
      width={markerSize}
      height={markerSize}
      boxShadow={2}
      color={iconColor}
      fontSize={iconSize}
      component={button ? ButtonBase : "div"}
      onClick={onClick}
      className={classes.root}
    >
      <Icon color="inherit" fontSize="inherit" />
    </Box>
  );
};

export const YesMarker = (props: AllMarkersProps) => {
  const theme = useTheme();

  return (
    <MarkerBase
      {...props}
      iconComponent={CheckIcon}
      bgColor={theme.palette.success.light}
      hoverColor={theme.palette.success.main}
    />
  );
};

export const NoMarker = (props: AllMarkersProps) => {
  const theme = useTheme();

  return (
    <MarkerBase
      {...props}
      iconComponent={CloseIcon}
      bgColor={theme.palette.error.light}
      hoverColor={theme.palette.error.main}
    />
  );
};

export const MaybeMarker = (props: AllMarkersProps) => {
  const theme = useTheme();

  return (
    <MarkerBase
      {...props}
      iconComponent={QuestionIcon}
      bgColor={theme.palette.info.light}
      hoverColor={theme.palette.info.main}
    />
  );
};

export const SoFarMarker = (props: AllMarkersProps) => {
  const theme = useTheme();

  return (
    <MarkerBase
      {...props}
      iconComponent={ThumbDownIcon}
      bgColor={theme.palette.warning.main}
      hoverColor={theme.palette.warning.dark}
    />
  );
};

export const SoCloseMarker = (props: AllMarkersProps) => {
  const theme = useTheme();

  return (
    <MarkerBase
      {...props}
      iconComponent={ThumbUpIcon}
      bgColor={theme.palette.primary.light}
      hoverColor={theme.palette.primary.main}
    />
  );
};

export const CorrectMarker = (props: AllMarkersProps) => {
  return (
    <MarkerBase
      {...props}
      iconComponent={StarIcon}
      bgColor={yellow[700]}
      hoverColor={yellow[800]}
    />
  );
};

const markersMap = {
  [markerTypes.yes]: YesMarker,
  [markerTypes.no]: NoMarker,
  [markerTypes.maybe]: MaybeMarker,
  [markerTypes.soFar]: SoFarMarker,
  [markerTypes.soClose]: SoCloseMarker,
  [markerTypes.correct]: CorrectMarker,
};

export type Props = AllMarkersProps & {
  type: MarkerType;
};

export const Marker = ({ type, ...rest }: Props) => {
  const MarkerComponent = markersMap[type];
  return <MarkerComponent {...rest} />;
};

const useStyles = makeStyles<
  Theme,
  { root: { bgColor: string; hoverColor: string }; button: boolean }
>({
  root: ({ root: { bgColor, hoverColor }, button }) => ({
    backgroundColor: bgColor,
    borderRadius: "50%",
    transition: "background-color 0.3s",

    "&:hover": {
      backgroundColor: button ? hoverColor : bgColor,
    },
  }),
});

import React from "react";
import { useTheme, Theme } from "@material-ui/core/styles";
import { red, green } from "@material-ui/core/colors";

import { Card } from "shared/components/Card";
import { Role, roles, roleNames } from "shared/constants/roles";

type Props = {
  role: Role;
};

const getColorsMap = (theme: Theme) => ({
  [roles.helper]: [green[700], "#fff"],
  [roles.traitor]: [red[900], "#fff"],
  [roles.regular]: [theme.palette.grey[200], theme.palette.text.primary],
});

export const RoleCard = ({ role }: Props) => {
  const theme = useTheme();
  const [backgroundColor, color] = getColorsMap(theme)[role];

  return (
    <Card
      text={roleNames[role]}
      backgroundColor={backgroundColor}
      color={color}
    />
  );
};

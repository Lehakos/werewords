import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import { useTheme } from "@material-ui/core/styles";

import { DisplaySecret } from "shared/components/DisplaySecret";
import { Card } from "shared/components/Card";
import { useSelectWord } from "model/game";
import { roleNames, roles } from "shared/constants/roles";
import { nextScreen } from "model/routing";
import { useAppDispatch } from "shared/app-state";

const showToRoles = [roleNames[roles.traitor], roleNames[roles.helper]];

export const ShowWord = () => {
  const [showToIndex, setShowToIndex] = useState(0);
  const word = useSelectWord();
  const theme = useTheme();
  const showTo = showToRoles[showToIndex];
  const dispatch = useAppDispatch();

  const nextShowTo = () => {
    const nextIndex = showToIndex + 1;

    if (nextIndex >= showToRoles.length) {
      dispatch(nextScreen());
      return;
    }

    setShowToIndex(nextIndex);
  };

  if (!showTo) {
    return null;
  }

  return (
    <DisplaySecret
      title={
        <>
          Слово смотрит{" "}
          <Box display="block" fontWeight="bold">
            {showTo.toLowerCase()}
          </Box>
        </>
      }
      onHideSecret={nextShowTo}
    >
      <Card
        backgroundColor={theme.palette.grey[200]}
        color={theme.palette.text.primary}
        text={word}
      />
    </DisplaySecret>
  );
};

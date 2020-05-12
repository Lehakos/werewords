import React from "react";
import { useStore } from "effector-react";
import Box from "@material-ui/core/Box";
import { useTheme } from "@material-ui/core/styles";

import { DisplaySecret } from "components/DisplaySecret";
import { Card } from "components/Card";
import { $word } from "model/game";

import { $showTo, changeIndexRequest } from "./model";

export const ShowWord = () => {
  const showTo = useStore($showTo);
  const word = useStore($word);
  const theme = useTheme();

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
      onHideSecret={() => changeIndexRequest()}
    >
      <Card
        backgroundColor={theme.palette.grey[200]}
        color={theme.palette.text.primary}
        text={word}
      />
    </DisplaySecret>
  );
};

import React from "react";
import Box from "@material-ui/core/Box";

import { PlayersForm } from "./PlayersForm";

export default {
  title: "PlayersForm",
  decorators: [
    (storyFn: any) => (
      <Box width="650px" mx="auto">
        {storyFn()}
      </Box>
    ),
  ],
};

export const basic = () => <PlayersForm />;

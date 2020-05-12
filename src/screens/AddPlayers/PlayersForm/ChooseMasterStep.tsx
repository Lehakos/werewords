import React, { ChangeEvent } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { changeMaster, $master, $players } from "../model";
import { useStore } from "effector-react";

export const ChooseMasterStep = () => {
  const master = useStore($master);
  const players = useStore($players);

  return (
    <RadioGroup
      value={master}
      onChange={({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
        changeMaster(value)
      }
    >
      {players.map((player) => {
        return (
          <FormControlLabel
            key={player.id}
            value={player.id}
            control={<Radio />}
            label={player.name}
          />
        );
      })}
    </RadioGroup>
  );
};

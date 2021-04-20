import React, { ChangeEvent } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { useSelectPlayers, changeMaster, useSelectMaster } from "model/players";
import { useAppDispatch } from "shared/app-state";

export const ChooseMasterStep = () => {
  const players = useSelectPlayers();
  const master = useSelectMaster();
  const dispatch = useAppDispatch();

  return (
    <RadioGroup
      value={master?.id}
      onChange={({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
        dispatch(changeMaster(value))
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

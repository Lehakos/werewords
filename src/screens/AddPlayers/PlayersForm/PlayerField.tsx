import React, { ChangeEvent, KeyboardEvent } from "react";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import { Player } from "model/players";

type PlayerFieldProps = {
  onDelete: (id: string) => void;
  onChange: (data: Player) => void;
  onEnter: () => void;
  cannotDelete: boolean;
  data: Player;
};

export const PlayerField = ({
  onDelete,
  onChange,
  onEnter,
  data,
  cannotDelete,
}: PlayerFieldProps) => {
  const handleChangeName = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    onChange({ ...data, name: value });
  };

  const handleKeyDown = ({ key }: KeyboardEvent) => {
    if (key !== "Enter") {
      return;
    }

    onEnter();
  };

  return (
    <Box display="flex" width={1} alignItems="center">
      <Box flexGrow={1} flexShrink={1} mr="4px">
        <TextField
          onChange={handleChangeName}
          value={data.name}
          label="Введите имя"
          variant="outlined"
          onKeyDown={handleKeyDown}
          fullWidth
          autoFocus
        />
      </Box>
      <Box flexShrink={0} mr={-2}>
        <IconButton onClick={() => onDelete(data.id)} disabled={cannotDelete}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

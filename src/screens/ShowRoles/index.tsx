import React, { useState } from "react";

import { DisplaySecret } from "shared/components/DisplaySecret";
import { useSelectPlayers } from "model/players";
import { nextScreen } from "model/routing";
import { useAppDispatch } from "shared/app-state";

import { RoleCard } from "./RoleCard";

export const ShowRoles = () => {
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const players = useSelectPlayers();
  const currentPlayer = players[currentPlayerIndex];
  const dispatch = useAppDispatch();

  if (!currentPlayer) {
    return null;
  }

  const nextPlayer = () => {
    const nextPlayerIndex = currentPlayerIndex + 1;

    if (nextPlayerIndex >= players.length) {
      dispatch(nextScreen());
      return;
    }

    setCurrentPlayerIndex(nextPlayerIndex);
  };

  return (
    <DisplaySecret title={currentPlayer.name} onHideSecret={nextPlayer}>
      <RoleCard role={currentPlayer.role} />
    </DisplaySecret>
  );
};

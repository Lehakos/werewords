import React from "react";
import { useStore } from "effector-react";

import { DisplaySecret } from "components/DisplaySecret";

import { RoleCard } from "./RoleCard";
import { $currentPlayer, changePlayerRequest } from "./model";

export const ShowRoles = () => {
  const player = useStore($currentPlayer);

  if (!player) {
    return null;
  }

  return (
    <DisplaySecret
      title={player.name}
      onHideSecret={() => changePlayerRequest()}
    >
      <RoleCard role={player.role} />
    </DisplaySecret>
  );
};

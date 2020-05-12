import { createEvent } from "effector";

import { getUniqueId } from "libs/getUniqueId";

import { PlayerData } from "./types";

const getPlayerId = getUniqueId("player");

export const getNewPlayerData = (): PlayerData => {
  const id = getPlayerId();
  return { id, name: "" };
};

export const nextStepRequest = createEvent("next step request");
export const nextStep = createEvent("next step");
export const prevStepRequest = createEvent("prev step request");
export const prevStep = createEvent("prev step");
export const submitForm = createEvent("submit form");

export const changeMaster = createEvent<string>("change master");

export const addPlayer = createEvent("add player");
export const addedPlayer = addPlayer.map<PlayerData>(() => getNewPlayerData());
export const deletePlayer = createEvent<string>("delete player");
export const editPlayer = createEvent<{ id: string } & Partial<PlayerData>>(
  "edit player"
);

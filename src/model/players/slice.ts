import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import shuffle from "lodash/shuffle";
import mapValues from "lodash/mapValues";

import { Role, roles as rolesMap } from "shared/constants/roles";
import { PLAYERS_NUM_FOR_SECOND_TRAITOR } from "shared/constants/config";
import { useAppSelector } from "shared/app-state";
import { getUniqueId } from "shared/libs/getUniqueId";
import { getRandomElements } from "shared/libs/getRandomElements";

import { ById, Ids, Player } from "./types";

const getPlayerId = getUniqueId("player");

export const getNewPlayerData = (): Player => {
  const id = getPlayerId();
  return { id, name: "", master: false, role: rolesMap.regular };
};

const getRoles = (playersNum: number) => {
  const roles: Role[] = [rolesMap.traitor, rolesMap.helper];

  if (playersNum > PLAYERS_NUM_FOR_SECOND_TRAITOR) {
    roles.push(rolesMap.traitor);
  }

  return shuffle(roles);
};

interface PlayersState {
  byId: ById;
  ids: Ids;
}

const getInitialState = (): PlayersState => {
  const player = getNewPlayerData();
  return {
    byId: {
      [player.id]: player,
    },
    ids: [player.id],
  };
};

export const playersSlice = createSlice({
  name: "players",
  initialState: getInitialState(),
  reducers: {
    createPlayer: (state) => {
      const newPlayer = getNewPlayerData();
      state.byId[newPlayer.id] = newPlayer;
      state.ids.push(newPlayer.id);
    },
    deletePlayer: (state, { payload }: PayloadAction<Player["id"]>) => {
      delete state.byId[payload];
      state.ids = state.ids.filter((id) => id !== payload);
    },
    updatePlayer: (state, { payload }: PayloadAction<Player>) => {
      state.byId[payload.id] = payload;
    },
    changeMaster: (state, { payload }: PayloadAction<Player["id"]>) => {
      mapValues(state.byId, (player) => {
        player.master = payload === player.id;
      });
    },
    savePlayers: (state) => {
      const roles = getRoles(state.ids.length);
      const ids = getRandomElements(state.ids, roles.length);

      roles.forEach((role, index) => {
        const id = ids[index];
        state.byId[id].role = role;
      });
    },
  },
});

const useSelectById = () => useAppSelector((state) => state.players.byId);
const useSelectIds = () => useAppSelector((state) => state.players.ids);

export const useSelectPlayers = () => {
  const byId = useSelectById();
  const ids = useSelectIds();

  return ids.map((id) => byId[id]);
};

export const useSelectMaster = () => {
  const byId = useSelectById();

  return Object.values(byId).find((player) => player.master);
};

export const {
  createPlayer,
  deletePlayer,
  updatePlayer,
  changeMaster,
  savePlayers,
} = playersSlice.actions;

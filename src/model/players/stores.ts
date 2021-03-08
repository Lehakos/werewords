import { createStore, combine } from "effector";
import mapValues from "lodash/mapValues";
import shuffle from "lodash/shuffle";

import { Role, roles as rolesMap } from "shared/roles";
import { PLAYERS_NUM_FOR_SECOND_TRAITOR } from "shared/config";

import { ById, Ids, Player } from "./types";
import { savePlayers } from "./events";

const generateRoles = (playersNum: number) => {
  const roles: Role[] = [rolesMap.traitor, rolesMap.helper];

  if (playersNum > PLAYERS_NUM_FOR_SECOND_TRAITOR) {
    roles.push(rolesMap.traitor);
  }

  for (let i = roles.length; i < playersNum; i += 1) {
    roles.push(rolesMap.regular);
  }

  return shuffle(roles);
};

export const $byId = createStore<ById>({}).on(
  savePlayers,
  (_, { byId, ids, master }) => {
    const roles = generateRoles(ids.length);

    return mapValues(
      byId,
      (player): Player => ({
        ...player,
        master: master === player.id,
        role: roles.pop() as Role,
      })
    );
  }
);

export const $ids = createStore<Ids>([]).on(savePlayers, (_, { ids }) => ids);

export const $players = combine($byId, $ids, (byId, ids) =>
  ids.map((id) => byId[id])
);

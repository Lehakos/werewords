import { createStore, combine, guard } from "effector";

import { $players } from "model/players";
import { startNewGame } from "model/game";
import { nextScreenRequest } from "model/routing";

import { playerChanged, changePlayerRequest } from "./events";

export const $currentPlayerIndex = createStore(0)
  .on(playerChanged, (index) => index + 1)
  .on(startNewGame, () => 0);

const $playersLength = $players.map((players) => players.length);

guard({
  source: changePlayerRequest,
  filter: combine([$currentPlayerIndex, $playersLength]).map(
    ([index, length]) => index >= length - 1
  ),
  target: nextScreenRequest,
});

guard({
  source: changePlayerRequest,
  filter: combine([$currentPlayerIndex, $playersLength]).map(
    ([index, length]) => index < length - 1
  ),
  target: playerChanged,
});

export const $currentPlayer = combine(
  $currentPlayerIndex,
  $players,
  (index, players) => players[index]
);

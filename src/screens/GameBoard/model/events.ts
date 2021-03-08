import { createEvent, forward } from "effector";

import { startNewGame } from "model/game";
import { setScreen, ScreensEnum } from "model/routing";

export const onStartNewGame = createEvent("on start new game");

forward({
  from: onStartNewGame,
  to: [startNewGame, setScreen.prepend(() => ScreensEnum.addPlayers)],
});

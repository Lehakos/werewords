import { createStore, guard } from "effector";

import { screensQueue } from "./constants";
import { nextScreenRequest, nextScreen } from "./events";

export const $currentScreenIndex = createStore(0).on(
  nextScreen,
  (index) => index + 1
);

guard({
  source: nextScreenRequest,
  filter: $currentScreenIndex.map((index) => index < screensQueue.length - 1),
  target: nextScreen,
});

export const $currentScreen = $currentScreenIndex.map(
  (index) => screensQueue[index]
);

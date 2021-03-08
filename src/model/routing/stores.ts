import { createStore, guard } from "effector";

import { ScreensEnum, ScreenName } from "./constants";
import { nextScreenRequest, nextScreen, setScreen } from "./events";

export const $currentScreenIndex = createStore(0)
  .on(nextScreen, (index) => index + 1)
  .on(setScreen, (state, screen) =>
    typeof screen === "string" ? ScreensEnum[screen] : screen
  );

guard({
  source: nextScreenRequest,
  filter: $currentScreenIndex.map(
    (index) => index < Object.keys(ScreensEnum).length - 1
  ),
  target: nextScreen,
});

export const $currentScreen = $currentScreenIndex.map(
  (index) => ScreensEnum[index] as ScreenName
);

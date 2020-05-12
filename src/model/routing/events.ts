import { createEvent } from "effector";

import { ScreenName } from "./constants";

export const setScreen = createEvent<ScreenName>("set screen");
export const nextScreenRequest = createEvent("next screen request");
export const nextScreen = createEvent("next screen");
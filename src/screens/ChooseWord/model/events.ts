import { createEvent, forward } from "effector";

import { setWord } from "model/game";
import { nextScreenRequest } from "model/routing";

export const onChooseWord = createEvent<string>("on choose word");

forward({
  from: onChooseWord,
  to: setWord,
});

forward({
  from: onChooseWord,
  to: nextScreenRequest,
});

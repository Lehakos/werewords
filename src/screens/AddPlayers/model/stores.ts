import { createStore, combine, guard, sample, forward } from "effector";
import omit from "lodash/omit";

import { MIN_PLAYERS } from "shared/config";
import { savePlayers } from "model/players";
import { nextScreenRequest } from "model/routing";

import {
  nextStepRequest,
  nextStep,
  prevStepRequest,
  prevStep,
  changeMaster,
  addedPlayer,
  deletePlayer,
  editPlayer,
  getNewPlayerData,
  submitForm,
} from "./events";
import { ById } from "./types";

export const steps = ["Добавьте игроков", "Выберите ведущего", "Проверьте"];

forward({
  from: prevStepRequest,
  to: prevStep,
});

export const $activeStep = createStore(0)
  .on(nextStep, (activeStep) => {
    const newStep = activeStep + 1;

    if (newStep >= steps.length) {
      return activeStep;
    }

    return activeStep + 1;
  })
  .on(prevStep, (activeStep) => {
    if (activeStep === 0) {
      return activeStep;
    }
    return activeStep - 1;
  });

export const $master = createStore("").on(changeMaster, (_, master) => master);

const initialPlayer = getNewPlayerData();

const $playersById = createStore<ById>({
  [initialPlayer.id]: initialPlayer,
})
  .on(addedPlayer, (state, player) => {
    return { ...state, [player.id]: player };
  })
  .on(deletePlayer, (state, id) => omit(state, id))
  .on(editPlayer, (state, player) => {
    const prevData = state[player.id];
    return {
      ...state,
      [player.id]: {
        ...prevData,
        ...player,
      },
    };
  });

const $playersIds = createStore<string[]>([initialPlayer.id])
  .on(addedPlayer, (state, player) => [...state, player.id])
  .on(deletePlayer, (state, idForDelete) =>
    state.filter((id) => id !== idForDelete)
  );

export const $players = combine($playersById, $playersIds, (byId, ids) =>
  ids.map((id) => byId[id])
);

export const $formError = createStore<null | string>(null);

sample({
  source: [$activeStep, $master, $players],
  clock: nextStepRequest,
  fn: ([activeStep, master, players]) => {
    if (activeStep === 0) {
      if (players.length < MIN_PLAYERS) {
        return `Должно быть не менее ${MIN_PLAYERS} игроков`;
      }

      if (players.some(({ name }) => !name.trim().length)) {
        return "Заполните все поля";
      }
    }

    if (activeStep === 1) {
      if (!master) {
        return "Выберите ведущего";
      }
    }

    return null;
  },
  target: $formError,
});

guard({
  source: nextStepRequest,
  filter: $activeStep.map((activeStep) => activeStep === steps.length - 1),
  target: submitForm,
});

guard({
  source: nextStepRequest,
  filter: $formError.map((formError) => !formError),
  target: nextStep,
});

sample({
  source: [$playersById, $playersIds, $master],
  clock: submitForm,
  fn: ([byId, ids, master]) => ({
    ids: [...ids],
    byId: {
      ...byId,
    },
    master,
  }),
  target: savePlayers,
});

forward({
  from: submitForm,
  to: nextScreenRequest,
});

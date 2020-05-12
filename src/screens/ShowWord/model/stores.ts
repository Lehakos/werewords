import { createStore, guard } from "effector";

import { nextScreenRequest } from "model/routing";
import { roleNames, roles } from "shared/roles";

import { indexChanged, changeIndexRequest } from "./events";

export const $showToIndex = createStore(0).on(
  indexChanged,
  (index) => index + 1
);

const showTo = [roleNames[roles.traitor], roleNames[roles.helper]];

guard({
  source: changeIndexRequest,
  filter: $showToIndex.map((index) => index >= showTo.length - 1),
  target: nextScreenRequest,
});

guard({
  source: changeIndexRequest,
  filter: $showToIndex.map((index) => index < showTo.length - 1),
  target: indexChanged,
});

export const $showTo = $showToIndex.map((index) => showTo[index]);

import { ValuesType } from "utility-types";

export const screenNames = {
  addPlayers: "addPlayers",
  chooseWord: "chooseWord",
  showRoles: "showRoles",
  showWord: "showWord",
  gameBoard: "gameBoard",
} as const;

export type ScreenName = ValuesType<typeof screenNames>;

export const screensQueue = [
  screenNames.addPlayers,
  screenNames.showRoles,
  screenNames.chooseWord,
  screenNames.showWord,
  screenNames.gameBoard,
];

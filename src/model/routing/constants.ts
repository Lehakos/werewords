export enum ScreensEnum {
  addPlayers,
  showRoles,
  chooseWord,
  showWord,
  gameBoard,
}

export type ScreenName = keyof typeof ScreensEnum;

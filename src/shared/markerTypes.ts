import { ValuesType } from "utility-types";

export const markerTypes = {
  no: "no",
  yes: "yes",
  maybe: "maybe",
  soFar: "so far",
  soClose: "so close",
  correct: "correct",
} as const;

export type MarkerType = ValuesType<typeof markerTypes>;

export const markerNames = {
  [markerTypes.no]: "Нет",
  [markerTypes.yes]: "Да",
  [markerTypes.maybe]: "Возможно",
  [markerTypes.soFar]: "Очень далеко",
  [markerTypes.soClose]: "Очень близко",
  [markerTypes.correct]: "Правильно",
} as const;

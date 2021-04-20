import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { useAppSelector } from "shared/app-state";

import { ScreensEnum, ScreenName } from "./constants";

interface RoutingState {
  currentScreenIndex: number;
}

const initialState: RoutingState = {
  currentScreenIndex: 0,
};

export const routingSlice = createSlice({
  name: "routing",
  initialState,
  reducers: {
    nextScreen: (state) => {
      const nextIndex = state.currentScreenIndex + 1;

      if (nextIndex >= Object.keys(ScreensEnum).length) {
        return;
      }

      state.currentScreenIndex = nextIndex;
    },
    setScreen: (state, { payload }: PayloadAction<ScreenName | number>) => {
      state.currentScreenIndex =
        typeof payload === "string" ? ScreensEnum[payload] : payload;
    },
  },
});

export const useSelectCurrentScreenIndex = () =>
  useAppSelector((state) => state.routing.currentScreenIndex);

export const useSelectCurrentScreen = () => {
  const currentScreenIndex = useSelectCurrentScreenIndex();
  return ScreensEnum[currentScreenIndex] as ScreenName;
};

export const { nextScreen, setScreen } = routingSlice.actions;

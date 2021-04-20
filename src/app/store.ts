import { configureStore } from "@reduxjs/toolkit";

import { gameSlice } from "model/game";
import { playersSlice } from "model/players";
import { routingSlice } from "model/routing";

export const store = configureStore({
  reducer: {
    game: gameSlice.reducer,
    players: playersSlice.reducer,
    routing: routingSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

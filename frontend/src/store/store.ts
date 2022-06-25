import { configureStore } from "@reduxjs/toolkit";
import { robotReducer } from "../redux/action.reducer";

export interface iStore {
  robot: Array;
}

export const preloadedState: iStore = {
  robot: [] as Array,
};

export const store = configureStore({
  reducer: {
    robot: robotReducer,
  },
  preloadedState,
});

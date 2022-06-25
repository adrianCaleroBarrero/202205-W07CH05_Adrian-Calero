import { createReducer } from "@reduxjs/toolkit";
import { iRobot } from "../interfaces/robot";
import * as ac from "./action.creators";

const initialState: iRobot[] = [];

export const robotReducer = createReducer(initialState, (builder) => {
  return builder
    .addCase(ac.loadRobotAction, (state, action) => [...action.payload])
    .addCase(ac.addRobotAction, (state, action) => [...state, action.payload])
    .addCase(ac.modifyRobotAction, (state, action) =>
      state.map((item) =>
        item.id === action.payload.id ? action.payload : item
      )
    )
    .addCase(ac.deleteRobotAction, (state, action) =>
      state.filter((item) => item.id !== action.payload.id)
    );
});

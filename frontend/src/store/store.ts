import { configureStore } from "@reduxjs/toolkit";
import { RobotModel } from "../models/robot.model";
import { robotReducer } from "../redux/action.reducer";

export interface iStore {
  robot: Array<RobotModel>;
}

export const preloadedState: iStore = {
  robot: [] as Array<RobotModel>,
};

export const store = configureStore({
  reducer: {
    robot: robotReducer,
  },
  preloadedState,
});

import { createAction } from "@reduxjs/toolkit";
import { iRobot } from "../interfaces/robot";
import { actionTypes } from "./action.types";

export const loadRobotAction = createAction<iRobot[]>(
  actionTypes["robot@load"]
);

export const addRobotAction = createAction<iRobot>(actionTypes["robot@create"]);

export const modifyRobotAction = createAction<iRobot>(
  actionTypes["robot@modify"]
);

export const deleteRobotAction = createAction<iRobot>(
  actionTypes["robot@delete"]
);

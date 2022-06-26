import * as ac from "./action.creators";
import { robotReducer } from "./action.reducer";
import { iRobot } from "../interfaces/robot";

describe("Given the RobotReducer", () => {
  const mockRobot = {
    _id: "1",
    name: "test",
    img: "test",
    velocity: 1,
    resistence: 2,
    date: "test",
  };
  describe("When use loadRobotAction", () => {
    test("Then it should render mockRobot", () => {
      const initialState: iRobot[] = [];
      const newState = robotReducer(
        initialState,
        ac.loadRobotAction([mockRobot])
      );

      expect(newState).toHaveLength(1);
      expect(newState).toStrictEqual([mockRobot]);
    });
  });

  describe("When use addRobotAction", () => {
    test("Then it should render 2 mocks", () => {
      const initialState: iRobot[] = [mockRobot];
      const mockRobotAdd = { ...mockRobot, _id: "2", name: "test2" };
      const newState = robotReducer(
        initialState,
        ac.addRobotAction(mockRobotAdd)
      );

      expect(newState).toHaveLength(2);
      expect(newState).toStrictEqual([mockRobot, mockRobotAdd]);
    });
  });

  describe("When use modifyRobotAction", () => {
    test("Then it should render modifymock", () => {
      const initialState: iRobot[] = [mockRobot];
      const mockRobotModify = { ...mockRobot, _id: "1", name: "test2" };
      const newState = robotReducer(
        initialState,
        ac.modifyRobotAction(mockRobotModify)
      );

      expect(newState).toHaveLength(1);
      expect(newState).toStrictEqual([mockRobotModify]);
    });

    test("Then it should render not modifymock", () => {
      const initialState: iRobot[] = [mockRobot];
      const mockRobotModify = { ...mockRobot, _id: "3", name: "test2" };
      const newState = robotReducer(
        initialState,
        ac.modifyRobotAction(mockRobotModify)
      );

      expect(newState).toHaveLength(1);
    });
  });

  describe("When use deleteRobotAction", () => {
    test("Then it should render 1 mock", () => {
      const mockRobot2 = { ...mockRobot, _id: "2", name: "test2" };
      const initialState: iRobot[] = [mockRobot, mockRobot2];

      const newState = robotReducer(
        initialState,
        ac.deleteRobotAction(mockRobot)
      );

      expect(newState).toHaveLength(1);
      expect(newState).toStrictEqual([mockRobot2]);
    });
  });
});

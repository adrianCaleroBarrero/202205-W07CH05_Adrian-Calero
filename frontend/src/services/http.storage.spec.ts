import { RobotModel } from "../models/robot.model";
import { HttpStoreRobot } from "./http.storage";

describe("Given the http.storage", () => {
  describe("When i use the method getAllRobots", () => {
    test("Then should be render", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        json: jest
          .fn()
          .mockResolvedValue([
            new RobotModel("test", "test", 1, 2),
            new RobotModel("test2", "test2", 3, 4),
          ]),
      });
      const result = await new HttpStoreRobot().getAllRobots();

      expect(fetch).toBeCalled();
      expect(result).toHaveLength(2);
    });
  });

  describe("When i use the method getRobots", () => {
    test("Then should be render", async () => {
      const robot = new RobotModel("test", "test", 1, 2);
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(robot),
      });
      const result = await new HttpStoreRobot().getRobot(robot);

      expect(result.name).toBe("test");
    });
  });

  describe("When i use the method addRobots", () => {
    test("Then should be render", async () => {
      const robot = new RobotModel("test2", "test", 1, 2);
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(robot),
      });
      const result = await new HttpStoreRobot().addRobot(robot);

      expect(result.name).toBe("test2");
    });
  });

  describe("When i use the method updateRobots", () => {
    test("Then should be render", async () => {
      const robot = new RobotModel("test2", "test", 1, 2);
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue({ ...robot, date: "test3" }),
      });
      const result = await new HttpStoreRobot().updateRobot(robot);

      expect(result.date).toBe("test3");
    });
  });

  describe("When i use the method deleteRobots", () => {
    test("Then should be render", async () => {
      const robot = new RobotModel("test2", "test", 1, 2);
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue([robot]),
      });
      const result = await new HttpStoreRobot().deleteRobot(robot);

      expect(result).toBe(undefined);
    });
  });
});

import produce from "immer";
import { iRobot } from "../interfaces/robot";

export class HttpStoreRobot {
  url: string;
  constructor() {
    this.url = "http://localhost:3400/robots";
  }

  getAllRobots(): Promise<iRobot[]> {
    return fetch(this.url).then((resp) => resp.json());
  }

  getRobot(robot: iRobot): Promise<iRobot> {
    return fetch(this.url + `/${robot.id}`).then((resp) => resp.json());
  }

  addRobot(robot: iRobot): Promise<iRobot> {
    return fetch(this.url, {
      method: "POST",
      body: JSON.stringify(robot),
      headers: {
        "content-type": "application/json",
      },
    }).then((resp) => resp.json());
  }

  updateRobot(robot: iRobot): Promise<iRobot> {
    return fetch(this.url + `/${robot.id}`, {
      method: "PATCH",
      body: JSON.stringify(robot),
      headers: {
        "content-type": "application/json",
      },
    }).then((resp) => resp.json());
  }

  deleteRobot(robot: iRobot): Promise<number> {
    return fetch(this.url + `/${robot.id}`, {
      method: "DELETE",
    }).then((resp) => resp.status);
  }
}

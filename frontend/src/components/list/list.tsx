import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { iRobot } from "../../interfaces/robot";
import { HttpStoreRobot } from "../../services/http.storage";
import { iStore } from "../../store/store";
import * as ac from "../../redux/action.creators";
import { Card } from "../card/card";

export function List() {
  const api = new HttpStoreRobot();
  const robots = useSelector((state: iStore) => state.robot as iRobot[]);
  const dispatch = useDispatch();

  useEffect(() => {
    api.getAllRobots().then((resp) => dispatch(ac.loadRobotAction(resp)));
  }, [dispatch]);

  return (
    <ul className="list__robots">
      {robots.map((robot) => (
        <Card key={robot.name} robot={robot} />
      ))}
    </ul>
  );
}

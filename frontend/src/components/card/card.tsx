import { Button, CardContent, CardMedia } from "@mui/material";
import Card from "@mui/material/Card";
import { blue } from "@mui/material/colors";
import { useDispatch } from "react-redux";
import * as ac from "../../redux/action.creators";

import { iRobot } from "../../interfaces/robot";
import { HttpStoreRobot } from "../../services/http.storage";

export function CardList({ robot }: { robot: iRobot }) {
  const api = new HttpStoreRobot();
  const dispatch = useDispatch();

  function HandleDelete() {
    console.log(robot);
    api
      .deleteRobot(robot)
      .then((resp) => dispatch(ac.deleteRobotAction(robot)));
  }
  return (
    <li>
      <Card sx={{ maxWidth: 345 }} style={{ borderRadius: 20 }}>
        <CardMedia
          component="img"
          height="340"
          image={robot.img}
          alt={robot.name}
        />
        <CardContent style={{ backgroundColor: blue[100] }}>
          <p>Name: {robot.name}</p>
          <p>Date: {robot.date}</p>
          <p>Velocity: {robot.velocity}</p>
          <p>Resistance: {robot.resistence}</p>{" "}
          <Button variant="contained" color="error" onClick={HandleDelete}>
            Delete
          </Button>
        </CardContent>
      </Card>
    </li>
  );
}

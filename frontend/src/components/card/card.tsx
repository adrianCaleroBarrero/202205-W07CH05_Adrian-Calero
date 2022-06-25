import { CardContent, CardMedia } from "@mui/material";
import Card from "@mui/material/Card";
import { blue } from "@mui/material/colors";

import { iRobot } from "../../interfaces/robot";

export function CardList({ robot }: { robot: iRobot }) {
  return (
    <li>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="340"
          image={robot.img}
          alt={robot.name}
        />
        <CardContent style={{ backgroundColor: blue[400] }}>
          <p>Name: {robot.name}</p>
          <p>Date: {robot.date}</p>
          <p>Velocity: {robot.velocity}</p>
          <p>Resistance: {robot.resistence}</p>
        </CardContent>
      </Card>
    </li>
  );
}
function useStyles(arg0: { color: string }) {
  throw new Error("Function not implemented.");
}

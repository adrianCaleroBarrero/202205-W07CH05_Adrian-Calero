import { iRobot } from "../../interfaces/robot";

export function Card({ robot }: { robot: iRobot }) {
  return (
    <li>
      <img src={robot.img} alt={robot.name} />
      <div>
        <p>Name: {robot.name}</p>
        <p>Date: {robot.date}</p>
        <p>Velocity: {robot.velocity}</p>
        <p>Resistance: {robot.resistence}</p>
      </div>
    </li>
  );
}

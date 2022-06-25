import { Button, Rating, TextField, Typography } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { RobotModel } from "../../models/robot.model";
import { HttpStoreRobot } from "../../services/http.storage";
import * as ac from "../../redux/action.creators";

export function Form() {
  const api = new HttpStoreRobot();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    date: "",
    velocity: 0,
    resistance: 0,
  });

  function handleChange(ev: SyntheticEvent) {
    const element = ev.target as HTMLFormElement;
    setFormData({ ...formData, [element.name]: element.value });
  }

  function handleSubmit(ev: SyntheticEvent) {
    ev.preventDefault();

    const newRobot: RobotModel = {
      ...new RobotModel(
        formData.name,
        formData.date,
        formData.velocity,
        formData.resistance
      ),
    };

    api
      .addRobot(newRobot)
      .then((resp) => dispatch(ac.addRobotAction(newRobot)));
    setFormData({ name: "", date: "", velocity: 0, resistance: 0 });
  }
  return (
    <div className="form">
      <h2>Creator</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name:"
          variant="outlined"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          label="Date:"
          variant="outlined"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
        <Typography component="legend">Velocity: 0-10</Typography>
        <Rating
          defaultValue={0}
          max={10}
          name="velocity"
          value={formData.velocity}
          onChange={handleChange}
        />
        <Typography component="legend">Resistance: 0-10</Typography>
        <Rating
          defaultValue={0}
          max={10}
          name="resistance"
          value={formData.resistance}
          onChange={handleChange}
        />
        <Button variant="outlined" color="success" type="submit">
          Create
        </Button>
      </form>
    </div>
  );
}

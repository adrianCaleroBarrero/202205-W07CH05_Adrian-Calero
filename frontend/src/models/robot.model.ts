export class RobotModel {
  img: string;
  constructor(
    public name: string,
    public date: string,
    public velocity: number,
    public resistence: number
  ) {
    this.img = "./img/robot.png";
  }
}

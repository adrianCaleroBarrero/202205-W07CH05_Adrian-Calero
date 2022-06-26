import { useSelect } from "@mui/base";
import { Provider, useDispatch, useSelector } from "react-redux";
import { iRobot } from "../../interfaces/robot";
import { RobotModel } from "../../models/robot.model";
import { HttpStoreRobot } from "../../services/http.storage";
import { render, screen } from "../../services/test.utils";
import { iStore, store } from "../../store/store";
import { List } from "./list";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("../../services/http.storage");
const preloadedState = {
  robot: [] as Array<RobotModel>,
};

const useDispatchMock = useDispatch as jest.Mock;
const mockDispatch = jest.fn().mockName("mockDispatch");
const useSelectorMock = useSelector as jest.Mock;

describe("Given the component List", () => {
  const mockRobot = {
    _id: "1",
    name: "test",
    img: "./img/robot.png",
    velocity: 1,
    resistence: 2,
    date: "test",
  };
  beforeEach(() => {
    HttpStoreRobot.prototype.getAllRobots = jest
      .fn()
      .mockResolvedValue([mockRobot]);
    useSelectorMock.mockReturnValue([mockRobot]);

    useDispatchMock.mockImplementation(() => mockDispatch);
  });
  describe("When i render the component", () => {
    test("Then it should be rendered", () => {
      render(
        <Provider store={store}>
          <List />
        </Provider>
      );

      expect(screen.getByText(/Velocity: 1/i)).toBeInTheDocument();
    });
  });
});

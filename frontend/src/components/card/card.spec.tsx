import { fireEvent, screen } from "@testing-library/react";
import { Provider, useDispatch } from "react-redux";
import { RobotModel } from "../../models/robot.model";
import { HttpStoreRobot } from "../../services/http.storage";
import { render } from "../../services/test.utils";
import { store } from "../../store/store";
import { CardList } from "./card";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

jest.mock("../../services/http.storage");
const preloadedState = {
  robot: [] as Array<RobotModel>,
};

const useDispatchMock = useDispatch as jest.Mock;
const mockDispatch = jest.fn().mockName("mockDispatch");

describe("Given the component Card", () => {
  const mockRobot = {
    _id: "1",
    name: "test",
    img: "./img/robot.png",
    velocity: 1,
    resistence: 2,
    date: "test",
  };
  beforeEach(() => {
    HttpStoreRobot.prototype.deleteRobot = jest.fn().mockResolvedValue({});

    useDispatchMock.mockImplementation(() => mockDispatch);
  });
  describe("When i render this robot", () => {
    test("Then it should be rendered", () => {
      render(
        <Provider store={store}>
          <CardList robot={mockRobot} />
        </Provider>
      );

      expect(screen.getByText(/name: test/i)).toBeInTheDocument();
    });
  });

  describe("When i click delete button", () => {
    test("Then it should be called", () => {
      render(
        <Provider store={store}>
          <CardList robot={mockRobot} />
        </Provider>,
        { preloadedState, store }
      );
      const deleteButton = screen.getByRole("button");

      fireEvent.click(deleteButton);
      expect(useDispatch).toHaveBeenCalled();
    });
  });
});

import { Provider, useDispatch } from "react-redux";
import { RobotModel } from "../../models/robot.model";
import { HttpStoreRobot } from "../../services/http.storage";
import { fireEvent, render, screen } from "../../services/test.utils";
import { store } from "../../store/store";
import { Form } from "./form";

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
describe("Given the component Form", () => {
  beforeEach(() => {
    HttpStoreRobot.prototype.addRobot = jest.fn().mockResolvedValue({});

    useDispatchMock.mockImplementation(() => mockDispatch);
  });
  describe("When i render the component", () => {
    test("Then it should be rendered", () => {
      render(
        <Provider store={store}>
          <Form />
        </Provider>
      );

      expect(screen.getByText(/creator/i)).toBeInTheDocument();
    });
  });

  describe("When i click the button Create", () => {
    test("Then it should be called the dispatch", () => {
      render(
        <Provider store={store}>
          <Form />
        </Provider>,
        { preloadedState, store }
      );

      fireEvent.click(screen.getByText(/create/i));

      expect(useDispatch).toHaveBeenCalled();
    });
  });

  describe("When i change the input text", () => {
    test("Then it should be changed", () => {
      render(
        <Provider store={store}>
          <Form />
        </Provider>,
        { preloadedState, store }
      );
      const input = screen.getByLabelText(/Name:/i) as HTMLFormElement;
      fireEvent.change(input, { target: { value: "name" } });

      expect(input).toHaveValue("name");
    });
  });
});

import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Prelude from "../Prelude";
import * as testUtils from "@utils/utils-for-tests";
import Routing from "@routes/Routing";
import { MemoryRouter } from "react-router-dom";

const script = global.document.createElement("script");
script.setAttribute("src", "/");
Object.defineProperty(global.document, "currentScript", { value: script });

describe('"Prelude" component tests', () => {
  test('enable "Start Meeting" button when name is not empty', async () => {
    const { store, user } = testUtils.renderWithProviders(<Prelude />);
    // * user name textfield
    const nameId = "Prelude-user-name-textfield";
    const nameTextField = screen.getByTestId(nameId);
    const nameInput = nameTextField.querySelector("input") as HTMLInputElement;
    expect(nameInput).toBeInTheDocument();
    const newName = "Jon Doe";
    await user.type(nameInput, newName);
    // * start meeting button
    const startBtnId = "Prelude-start-meeting-button";
    const startButton = screen.getByTestId(startBtnId);
    expect(startButton).toBeEnabled();
    const state = store.getState();
    expect(state.user.name).toBe(newName);
  });

  test('disable "Start Meeting" button when name is empty', async () => {
    const { store, user } = testUtils.renderWithProviders(<Prelude />);
    // * user name textfield
    const nameId = "Prelude-user-name-textfield";
    const nameTextField = screen.getByTestId(nameId);
    const nameInput = nameTextField.querySelector("input") as HTMLInputElement;
    expect(nameInput).toBeInTheDocument();
    const newName = "";
    await user.clear(nameInput);
    // * start meeting button
    const startBtnId = "Prelude-start-meeting-button";
    const startButton = screen.getByTestId(startBtnId);
    expect(startButton).toBeDisabled();
    const state = store.getState();
    expect(state.user.name).toBe(newName);
  });

  test('switch to "viewer" page when "Start Meeting" button clicked', async () => {
    const routing = (
      <MemoryRouter initialEntries={["/prelude"]}>
        <Routing />
      </MemoryRouter>
    );
    const { user } = testUtils.renderWithoutRouter(routing);
    // * user name textfield
    const nameId = "Prelude-user-name-textfield";
    const nameTextField = screen.getByTestId(nameId);
    const nameInput = nameTextField.querySelector("input") as HTMLInputElement;
    const newName = "Jon Doe";
    await user.type(nameInput, newName);
    // * click start meeting button
    const startBtnId = "Prelude-start-meeting-button";
    const startButton = screen.getByTestId(startBtnId) as HTMLButtonElement;
    await user.click(startButton);
    // * should see the viewer page component
    screen.getByTestId("page-Viewer");
  });
});

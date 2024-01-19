import { fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Prelude from "../Prelude";
import { renderWithProviders } from "@utils/utils-for-tests";

describe(`"Prelude" component tests`, () => {
  test('enable "Start Meeting" button when name is not empty', () => {
    const { store } = renderWithProviders(<Prelude />);
    // * user name textfield
    const nameId = "user-name-textfield";
    const nameTextField = screen.getByTestId(nameId);
    expect(nameTextField).toBeInTheDocument();
    const nameInput = nameTextField.querySelector("input") as HTMLInputElement;
    expect(nameInput).toBeInTheDocument();
    // * start meeting button
    const startBtnId = "start-meeting-button";
    const newName = "Jon Doe";
    fireEvent.change(nameInput, { target: { value: newName } });
    const startButton = screen.queryByTestId(startBtnId);
    expect(startButton).toBeInTheDocument();
    expect(startButton).toBeEnabled();
    const state = store.getState();
    expect(state.user.name).toBe(newName);
  });

  test('disable "Start Meeting" button when name is empty', () => {
    const { store } = renderWithProviders(<Prelude />);
    // * user name textfield
    const nameId = "user-name-textfield";
    const nameTextField = screen.getByTestId(nameId);
    expect(nameTextField).toBeInTheDocument();
    const nameInput = nameTextField.querySelector("input") as HTMLInputElement;
    expect(nameInput).toBeInTheDocument();
    // * start meeting button
    const startBtnId = "start-meeting-button";
    const newName = "";
    fireEvent.change(nameInput, { target: { value: newName } });
    const startButton = screen.queryByTestId(startBtnId);
    expect(startButton).toBeInTheDocument();
    expect(startButton).toBeDisabled();
    const state = store.getState();
    expect(state.user.name).toBe(newName);
  });
});

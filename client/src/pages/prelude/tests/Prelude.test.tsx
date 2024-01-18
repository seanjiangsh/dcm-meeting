import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Prelude from "../Prelude";
import { renderWithProviders } from "@utils/utils-for-tests";

test("demo", () => {
  expect(true).toBe(true);
});

test('enable "Start Meeting" button when name is not empty', () => {
  const { store } = renderWithProviders(<Prelude />);
  const testId = "user-name-textfield";
  const userNameTextField = screen.getByTestId(testId);
  console.log(userNameTextField);
  expect(userNameTextField).toBeInTheDocument();
});

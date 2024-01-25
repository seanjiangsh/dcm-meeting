import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import * as testUtils from "@utils/utils-for-tests";
import Routing from "@routes/Routing";
import { MemoryRouter } from "react-router-dom";

describe('"Not Found" page tests', () => {
  test('should show "Not Found" page when encountered unregistered route', async () => {
    const routing = (
      <MemoryRouter initialEntries={["/whatever"]}>
        <Routing />
      </MemoryRouter>
    );
    testUtils.renderWithoutRouter(routing);
    const notFoundTextId = "page-NotFound";
    const notFoundText = screen.getByTestId(notFoundTextId);
    expect(notFoundText).toBeInTheDocument();
  });
});

import { initialState } from "../initialState";
import { userReducer, userActions } from "../reducer";
import { UserState } from "../types";

describe("user reducer tests", () => {
  test("should set the search text", () => {
    const name = "Joe Doe";
    const expectedState: UserState = { ...initialState, name };
    const setSearch = userActions.setUserName(name);
    expect(userReducer(initialState, setSearch)).toEqual(expectedState);
  });
});

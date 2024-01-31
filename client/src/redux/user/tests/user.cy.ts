import { initialState } from "../initialState";
import { userReducer, userActions } from "../reducer";
import { UserState } from "../types";

describe("user reducer tests", () => {
  it("should set the name text", () => {
    const name = "Joe Doe";
    const expectedState: UserState = { ...initialState, name };
    const setName = userActions.setUserName(name);
    const newState = userReducer(initialState, setName);
    expect(newState).eql(expectedState);
  });
  it("should reset the user state", () => {
    const name = "Joe Doe";
    const expectedState: UserState = { ...initialState, name };
    const setName = userActions.setUserName(name);
    expect(userReducer(initialState, setName)).eql(expectedState);
    const reset = userActions.resetState();
    const newState = userReducer(initialState, reset);
    expect(newState).eql(initialState);
  });
});

import { initialState } from "../initialState";
import { toolReducer, toolActions } from "../reducer";
import { ToolState } from "../types";

describe("tool reducer tests", () => {
  it("should set tool to 'Zoom' then reset the tool state", () => {
    const activeTool = "Zoom";
    const expectedState: ToolState = { ...initialState, activeTool };
    const setTool = toolActions.setActiveTool(activeTool);
    expect(toolReducer(initialState, setTool)).eql(expectedState);
    const reset = toolActions.resetState();
    const newState = toolReducer(initialState, reset);
    expect(newState).eql(initialState);
  });
});

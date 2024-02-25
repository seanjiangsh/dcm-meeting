import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { initialState } from "./initialState";

const toolSlice = createSlice({
  name: "tool",
  initialState,
  reducers: {
    resetState: () => initialState,
    setActiveTool(state, action: PayloadAction<string>) {
      state.activeTool = action.payload;
    },
  },
});
export const toolActions = toolSlice.actions;
export const toolReducer = toolSlice.reducer;

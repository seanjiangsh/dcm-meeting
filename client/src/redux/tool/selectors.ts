import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "@redux/root-store";

export const toolSelector = (state: RootState) => state.tool;

export const activeToolSelector = createSelector(
  toolSelector,
  (tool) => tool.activeTool,
);

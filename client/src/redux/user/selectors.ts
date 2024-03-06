import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "@redux/root-store";

export const userSelector = (state: RootState) => state.user;

export const userNameSelector = createSelector(
  userSelector,
  (user) => user.name,
);

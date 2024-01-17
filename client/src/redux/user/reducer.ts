import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { UserState } from "./types";

const initialState: UserState = {
  name: "",
  streamingConfig: {
    videoEnabled: false,
    microphoneEnabled: false,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetState: () => initialState,
    setUserName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});
export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;

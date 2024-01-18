import { UserState } from "./types";

export const initialState: UserState = {
  name: "",
  streamingConfig: {
    videoEnabled: false,
    microphoneEnabled: false,
  },
};

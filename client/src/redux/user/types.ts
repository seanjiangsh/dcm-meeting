export type UserState = {
  name: string;
  streamingConfig: {
    videoEnabled: boolean;
    microphoneEnabled: boolean;
  };
};

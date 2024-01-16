import React, { useState } from "react";
import { Paper, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Login } from "@mui/icons-material";

import { appPaths } from "@utils/global.vars";

const PaperStyle = {
  margin: "auto",
  display: "flex",
  flexDirection: "column",
  borderRadius: "8px",
};

const ItemStyle = { m: 2, width: "20rem" };

export default function Prelude() {
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);

  const { basePath } = appPaths;

  const onKeyUp = (ev: React.KeyboardEvent) => {
    switch (ev.key) {
      case "Enter":
        onEnter();
        break;
      default:
        return;
    }
  };
  const onEnter = () => {
    // TODO
  };

  return (
    <Paper elevation={10} sx={PaperStyle} onKeyUp={onKeyUp}>
      <TextField
        sx={ItemStyle}
        label="Your name to show in meeting"
        value={userName}
        onChange={(ev) => setUserName(ev.target.value)}
      />

      <LoadingButton
        variant="contained"
        loadingPosition="start"
        startIcon={<Login fontSize="large" />}
        sx={{ ...ItemStyle, height: "50px", fontWeight: "bold" }}
        onClick={onEnter}
        loading={loading}
      >
        Start Meeting
      </LoadingButton>
    </Paper>
  );
}

import React, { useState } from "react";
import { Paper, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Login } from "@mui/icons-material";

import { useAppDispatch, useAppSelector } from "@redux/root-hook";
import { userActions } from "@redux/user/reducer";

import { appPaths } from "@utils/global.vars";

const PaperStyle = {
  margin: "auto",
  display: "flex",
  flexDirection: "column",
  borderRadius: "8px",
};

const ItemStyle = { m: 2, width: "20rem" };

export default function Prelude() {
  const dispatch = useAppDispatch();

  const user = useAppSelector((s) => s.user);
  const { name } = user;

  const [loading, setLoading] = useState(false);

  const { basePath } = appPaths;
  const disabled = !!!name;

  const nameChanged = (
    ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = ev.target.value;
    dispatch(userActions.setUserName(name));
  };

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
        value={name}
        onChange={nameChanged}
      />

      <LoadingButton
        variant="contained"
        loadingPosition="start"
        startIcon={<Login fontSize="large" />}
        sx={{ ...ItemStyle, height: "50px", fontWeight: "bold" }}
        onClick={onEnter}
        loading={loading}
        disabled={disabled}
      >
        Start Meeting
      </LoadingButton>
    </Paper>
  );
}

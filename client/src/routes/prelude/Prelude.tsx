import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paper, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Login } from "@mui/icons-material";

import { useDispatch, useSelector } from "@redux/root-hook";
import { userActions } from "@redux/user/reducer";
import { userNameSelector } from "@redux/user/selectors";

const PaperStyle = {
  margin: "auto",
  display: "flex",
  flexDirection: "column",
  borderRadius: "8px",
};

const ItemStyle = { m: 2, width: "20rem", textAlign: "center" };

export default function Prelude() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const name = useSelector(userNameSelector);

  const [loading, setLoading] = useState(false);

  const nameChanged = (
    ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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
  const onEnter = async () => {
    // TODO: API calls to start the meeting room
    navigate("/viewer");
  };

  return (
    <Paper id="page-Prelude" elevation={10} sx={PaperStyle} onKeyUp={onKeyUp}>
      <Typography sx={ItemStyle} variant="h5">
        Welcome to DICOM Meeting
      </Typography>
      <TextField
        sx={ItemStyle}
        label="Your name to show in meeting"
        value={name}
        onChange={nameChanged}
        InputProps={{ id: "Prelude-user-name-textfield" }}
      />

      <LoadingButton
        variant="contained"
        loadingPosition="start"
        id="Prelude-start-meeting-button"
        startIcon={<Login fontSize="large" />}
        sx={{ ...ItemStyle, height: "50px", fontWeight: "bold" }}
        onClick={onEnter}
        loading={loading}
        disabled={!name}
      >
        Start Meeting
      </LoadingButton>
    </Paper>
  );
}

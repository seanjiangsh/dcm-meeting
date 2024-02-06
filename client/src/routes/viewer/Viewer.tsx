import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

import { useAppSelector } from "@redux/root-hook";

import ImageGrid from "./Image-grid";
import Appbar from "./Appbar";
import { useEffect } from "react";

const ContainerStyle = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
};

export default function Viewer() {
  const navigate = useNavigate();

  const user = useAppSelector((s) => s.user);
  const { name } = user;

  useEffect(() => {
    if (!name) navigate("/prelude");
  }, [name, navigate]);

  return (
    <Box id="page-Viewer" sx={ContainerStyle}>
      <Appbar />
      <ImageGrid />
    </Box>
  );
}

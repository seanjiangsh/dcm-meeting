import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

import { useSelector } from "@redux/root-hook";
import { userNameSelector } from "@redux/user/selectors";

import Appbar from "./Appbar/Appbar";
import ImageGrid from "./Image-grid";

const ContainerStyle = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
};

export default function Viewer() {
  const navigate = useNavigate();

  const name = useSelector(userNameSelector);

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

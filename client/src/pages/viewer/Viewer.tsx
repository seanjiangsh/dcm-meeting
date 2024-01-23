import { Box } from "@mui/material";

import AppBar from "./AppBar";
import ImageGrid from "./Image-grid";

const ContainerStyle = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
};

export default function Viewer() {
  return (
    <Box data-testid="page-Viewer" sx={ContainerStyle}>
      <AppBar />
      <ImageGrid />
    </Box>
  );
}

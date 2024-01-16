import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

const ContainerStyle = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
};
export default function MainLayout() {
  return (
    <Box sx={ContainerStyle}>
      <Outlet />
    </Box>
  );
}

import { Box, useTheme } from "@mui/material";

import AppBar from "./AppBar";

const ContainerStyle = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
};
const ContentStyle = (appBarHeight: number) => ({
  mt: `${appBarHeight}px`,
  width: "100%",
  height: `calc(100% - ${appBarHeight}px)`,
  display: "flex",
});

export default function Viewer() {
  const theme = useTheme();
  const appBarHeight = Number(theme.mixins.toolbar.minHeight) || 56;

  return (
    <Box sx={ContainerStyle}>
      <AppBar />
      <Box sx={ContentStyle(appBarHeight)}></Box>
    </Box>
  );
}

import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Box } from "@mui/material";

import NotFound from "@pages/not-found/NotFound";
import Prelude from "@pages/prelude/Prelude";
import Viewer from "@pages/viewer/Viewer";

const ContainerStyle = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
};
const MainLayout = () => (
  <Box sx={ContainerStyle}>
    <Outlet />
  </Box>
);

export default function Routing() {
  return (
    <Routes>
      <Route index element={<Navigate to="/prelude" />} />
      <Route path="/" element={<MainLayout />}>
        <Route path="/prelude" element={<Prelude />} />
        <Route path="/viewer" element={<Viewer />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

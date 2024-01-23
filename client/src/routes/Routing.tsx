import { Routes, Route, Navigate } from "react-router-dom";
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

export default function Routing() {
  return (
    <Box sx={ContainerStyle}>
      <Routes>
        <Route path="/" element={<Navigate to="/prelude" />} />
        <Route path="/prelude" element={<Prelude />} />
        <Route path="/viewer" element={<Viewer />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Box>
  );
}

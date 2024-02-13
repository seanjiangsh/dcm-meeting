import { Routes, Route, Navigate } from "react-router-dom";
import { Box } from "@mui/material";

import NotFound from "@routes/not-found/NotFound";
import Prelude from "@routes/prelude/Prelude";
import Viewer from "@routes/viewer/Viewer";

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
        <Route index element={<Navigate to="/prelude" />} />
        <Route path="/prelude" element={<Prelude />} />
        <Route path="/viewer" element={<Viewer />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Box>
  );
}

import { Routes, Route, Navigate } from "react-router-dom";

import NotFound from "@pages/NotFound";
import Prelude from "@pages/prelude/Prelude";

import MainLayout from "@components/Main-layout";

export default function Routing() {
  return (
    <Routes>
      <Route index element={<Navigate to="/prelude" />} />
      <Route path="/" element={<MainLayout />}>
        <Route path="/prelude" element={<Prelude />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

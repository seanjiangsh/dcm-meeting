import { Routes, Route } from "react-router-dom";

import Tmp from "@pages/tmp/Tmp";

export default function Routing() {
  return (
    <Routes>
      <Route path="*" element={<Tmp />} />
    </Routes>
  );
}

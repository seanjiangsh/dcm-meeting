import { useEffect, useRef, useState } from "react";
import { Paper } from "@mui/material";

import { appBarHeight } from "@utils/global.vars";
import * as csUtils from "@utils/cornerstone";

const margin = 4;
const ImageGridStyle = {
  margin: `${margin}px`,
  marginTop: `${appBarHeight + margin}px`,
  height: `calc(100% - ${appBarHeight - margin * 2}px)`,
  display: "flex",
  overflow: "hidden",
};
const CsDivStyle = { width: "100%", height: "100%" };

export default function ImageGrid() {
  const [initialized, setInitialized] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const csDivRef = useRef(null);

  useEffect(() => {
    if (initialized) return;
    csUtils
      .initCornerstone()
      .then(() => setInitialized(true))
      .catch((err) => console.warn(err));
  }, [initialized]);

  useEffect(() => {
    const csDiv = csDivRef.current;
    if (!initialized || loaded || !csDiv) return;
    csUtils.initCSDiv(csDiv);
  }, [initialized, loaded]);

  return (
    <Paper elevation={10} sx={ImageGridStyle}>
      <div ref={csDivRef} style={CsDivStyle} />
    </Paper>
  );
}

import { CSSProperties } from "react";
import { appBarHeight } from "@utils/global.vars";
import ToolButton from "@components/tool-button/Tool-button";

const OuterDivStyle: CSSProperties = {
  position: "relative",
  width: "100%",
  height: "100%",
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
};
const InnerDivStyle: CSSProperties = {
  position: "absolute",
  display: "flex",
  flexDirection: "row",
  alignItems: "start",
  top: 0,
  overflowX: "scroll",
  overflowY: "hidden",
  maxWidth: "100%",
  height: appBarHeight + 50,
};

export default function Tools() {
  // * control x-axle manually
  const onWheel = (ev: React.WheelEvent) => {
    const elem = ev.currentTarget;
    if (!elem) return;
    const { scrollLeft } = elem;
    const { deltaY } = ev;
    elem.scrollLeft = scrollLeft + deltaY;
  };

  return (
    <div style={OuterDivStyle}>
      <div style={InnerDivStyle} onWheel={onWheel}>
        <ToolButton toolName="WindowLevel" />
        <ToolButton toolName="Pan" />
        <ToolButton toolName="Zoom" />
        <ToolButton toolName="PlanarRotate" />
        <ToolButton toolName="Magnify" />
        <ToolButton toolName="Length" />
        <ToolButton toolName="EllipticalROI" />
        <ToolButton toolName="Angle" />
        <ToolButton toolName="ArrowAnnotate" />
      </div>
    </div>
  );
}

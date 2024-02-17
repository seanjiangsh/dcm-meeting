import ToolButton from "@components/tool-button/Tool-button";

export default function Tools() {
  // todo: scrollable tools
  return (
    <div style={{ display: "flex" }}>
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
  );
}

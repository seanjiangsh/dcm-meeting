import ToolButton from "@components/tool-button/Tool-button";

export default function Tools() {
  return (
    <div style={{ display: "flex" }}>
      <ToolButton toolName="WindowLevel" />
      <ToolButton toolName="Pan" />
      <ToolButton toolName="Zoom" />
    </div>
  );
}

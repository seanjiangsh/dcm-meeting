import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/types";
import * as muiIcons from "@mui/icons-material";

export type ToolMap = {
  [tool: string]: ToolDetail;
};
export type ToolDetail = {
  text: string;
  Icon: OverridableComponent<SvgIconTypeMap<object, "svg">>;
};

export const toolMap: ToolMap = {
  WindowLevel: { text: "Window Level", Icon: muiIcons.Exposure },
  Pan: { text: "Pan", Icon: muiIcons.PanTool },
  Zoom: { text: "Zoom", Icon: muiIcons.ZoomOutMap },
  PlanarRotate: { text: "Rotate", Icon: muiIcons.CropRotate },
  Magnify: { text: "Magnify", Icon: muiIcons.ZoomIn },
  Length: { text: "Length", Icon: muiIcons.Straighten },
  EllipticalROI: { text: "Ellipse", Icon: muiIcons.CircleOutlined },
  Angle: { text: "Angle", Icon: muiIcons.Architecture },
  ArrowAnnotate: { text: "Arrow", Icon: muiIcons.NorthWest },
};

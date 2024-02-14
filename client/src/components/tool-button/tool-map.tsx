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
  WindowLevel: { text: "W/L", Icon: muiIcons.Exposure },
  Pan: { text: "Pan", Icon: muiIcons.PanTool },
  Zoom: { text: "Zoom", Icon: muiIcons.ZoomOutMap },
};

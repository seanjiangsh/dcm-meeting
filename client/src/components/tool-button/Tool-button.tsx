import { IconButton, Theme, Typography } from "@mui/material";

import { useDispatch, useSelector } from "@redux/root-hook";
import { toolActions } from "@redux/tool/reducer";
import { activeToolSelector } from "@src/redux/tool/selectors";

import * as csToolUtils from "@utils/cornerstone/tools";
import { toolMap, ToolDetail } from "./tool-map";

const IconButtonStyle = (active?: boolean) => ({
  pt: 1,
  borderRadius: "5px",
  display: "flex",
  flexDirection: "column",
  color: (theme: Theme) =>
    active ? theme.palette.info.light : theme.palette.common.white,
});

type ToolButtonProps = { toolName: string };

export default function ToolButton(props: ToolButtonProps) {
  const { toolName } = props;

  const dispatch = useDispatch();
  const activeTool = useSelector(activeToolSelector);
  const active = activeTool === toolName;
  const toolDetail = toolMap[toolName] as ToolDetail | undefined;

  const handleClick = () => {
    csToolUtils.activeTool(toolName);
    dispatch(toolActions.setActiveTool(toolName));
  };

  return (
    toolDetail && (
      <IconButton onClick={handleClick} sx={IconButtonStyle(active)}>
        <toolDetail.Icon fontSize="large" />
        <Typography variant="caption" sx={{ whiteSpace: "nowrap" }}>
          {toolDetail.text}
        </Typography>
      </IconButton>
    )
  );
}

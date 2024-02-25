import { AppBar, Toolbar, Theme } from "@mui/material";
import { appBarHeight } from "@utils/global.vars";

import Tools from "./Tools";
import MenuPopover from "./Menu-popover";

const AppbarStyle = {
  zIndex: (theme: Theme) => theme.zIndex.drawer + 1,
  height: `${appBarHeight}px`,
  backgroundColor: (theme: Theme) => theme.palette.grey["900"],
};

export default function Appbar() {
  return (
    <AppBar position="fixed">
      <Toolbar sx={AppbarStyle}>
        <Tools />
        <MenuPopover />
      </Toolbar>
    </AppBar>
  );
}

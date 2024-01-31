import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Theme,
  Popover,
} from "@mui/material";
import { Apps, Logout, Person } from "@mui/icons-material";

import { useAppDispatch, useAppSelector } from "@redux/root-hook";
import { appBarHeight } from "@utils/global.vars";

const AppBarStyle = {
  zIndex: (theme: Theme) => theme.zIndex.drawer + 1,
  height: `${appBarHeight}px`,
};

export default function Appbar() {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const user = useAppSelector((s) => s.user);
  const { name } = user;

  const [menuOpened, setMenuOpened] = useState(false);
  const menuAnchorRef = useRef(null);

  const openMenu = () => setMenuOpened(!menuOpened);
  const backClick = () => navigate("/prelude");

  return (
    <AppBar position="fixed">
      <Toolbar sx={AppBarStyle}>
        {/* <IconButton color="inherit" onClick={drawerBtnClick} edge="start">
          <MenuIcon />
        </IconButton> */}
        <Typography variant="h6" noWrap sx={{ ml: 2 }}>
          DICOM Meeting
        </Typography>
        <Box sx={{ ml: "auto", display: "flex" }}>
          <IconButton color="inherit" ref={menuAnchorRef} onClick={openMenu}>
            <Apps />
          </IconButton>
        </Box>

        <Popover
          anchorEl={menuAnchorRef.current}
          open={menuOpened}
          onClose={openMenu}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <List>
            <ListItem>
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText>{name}</ListItemText>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={backClick}>
                <ListItemIcon>
                  <Logout />
                </ListItemIcon>
                <ListItemText>Back</ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
        </Popover>
      </Toolbar>
    </AppBar>
  );
}
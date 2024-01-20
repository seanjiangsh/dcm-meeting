import { useState, MouseEvent } from "react";
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

const AppBarStyle = {
  zIndex: (theme: Theme) => theme.zIndex.drawer + 1,
};

export default function Appbar() {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const user = useAppSelector((s) => s.user);
  const { name } = user;

  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const open = Boolean(menuAnchor);

  const menuClick = (ev: MouseEvent<HTMLButtonElement>) =>
    setMenuAnchor(ev.currentTarget);
  const menuClose = () => setMenuAnchor(null);
  const backClick = () => navigate("/prelude");

  return (
    <AppBar position="fixed" sx={AppBarStyle}>
      <Toolbar>
        {/* <IconButton color="inherit" onClick={drawerBtnClick} edge="start">
          <MenuIcon />
        </IconButton> */}
        <Typography variant="h6" noWrap sx={{ ml: 2 }}>
          DICOM Meeting
        </Typography>
        <Box sx={{ ml: "auto", display: "flex" }}>
          <IconButton color="inherit" onClick={menuClick}>
            <Apps />
          </IconButton>
        </Box>

        <Popover
          anchorEl={menuAnchor}
          open={open}
          onClose={menuClose}
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

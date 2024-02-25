import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
} from "@mui/material";
import { Apps, Logout, Person } from "@mui/icons-material";

import { useAppSelector } from "@redux/root-hook";

export default function MenuPopover() {
  const navigate = useNavigate();
  const user = useAppSelector((s) => s.user);
  const { name } = user;

  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);

  const menuClick = (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
    setMenuAnchor(ev.currentTarget);
  const menuClose = () => setMenuAnchor(null);
  const backClick = () => navigate("/prelude");

  return (
    <React.Fragment>
      <Box sx={{ mr: 0, display: "flex" }}>
        <IconButton id="Appbar-menu-button" color="inherit" onClick={menuClick}>
          <Apps />
        </IconButton>
      </Box>

      <Popover
        id="Appbar-popover"
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
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
            <ListItemButton id="Appbar-back-button" onClick={backClick}>
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              <ListItemText>Back</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Popover>
    </React.Fragment>
  );
}

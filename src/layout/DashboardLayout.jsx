// src/layout/DashboardLayout.jsx
import React from "react";
import { Outlet, NavLink, useNavigate, Navigate } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Button,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

const drawerWidth = 240;

export default function DashboardLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  const menu = [
    { text: "Projects", path: "/projects" },
    { text: "Support", path: "/support" },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            IhrHub
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
        }}
      >
        <Toolbar />
        <List>
          {menu.map((item) => (
            <ListItemButton
              key={item.text}
              component={NavLink}
              to={item.path}
              sx={{
                "&.active": {
                  backgroundColor: (theme) => theme.palette.action.selected,
                },
              }}
            >
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: `calc(100% - ${drawerWidth}px)` }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

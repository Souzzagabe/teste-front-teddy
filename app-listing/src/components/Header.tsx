import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Stack,
  Tabs,
  Tab,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HeaderImage from "../assets/Logo - Teddy.png";
import { useState } from "react";
import type { HeaderProps } from '../types';


const Header: React.FC<HeaderProps> = ({ currentTab, onTabChange }) => {

  const [drawerOpen, setDrawerOpen] = useState(false);
  const userName = localStorage.getItem("userName") || "Usuário";
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleMenuClick = (tabIndex: number) => {
    setDrawerOpen(false);
    onTabChange(null, tabIndex);
  };

  return (
    <>
      <AppBar
        position="fixed"
        color="inherit"
        elevation={1}
        sx={{ height: "100px" }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            maxWidth: "1400px",
            height: "100px",
            margin: "0 auto",
            width: "100%",
            px: 2,
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            {isMobile && (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => setDrawerOpen(true)}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Box display="flex" alignItems="center">
              <img
                src={HeaderImage}
                alt="Logo Teddy"
                style={{ width: 100, height: "auto", display: "block" }}
              />
            </Box>
          </Stack>

          {!isMobile && (
            <Stack direction="row" alignItems="center" spacing={4}>
              <Tabs
                value={currentTab}
                onChange={onTabChange}
                textColor="inherit"
                indicatorColor="primary"
                sx={{
                  "& .MuiTabs-indicator": { backgroundColor: "#ED6C02" },
                  minHeight: 40,
                  height: 40,
                }}
              >
                <Tab label="Clientes" />
                <Tab label="Clientes selecionados" />
                <Tab label="Sair" />
              </Tabs>
              <Typography variant="body2">
                Olá, <strong>{userName}</strong>!
              </Typography>
            </Stack>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleMenuClick(0)}>
                <ListItemText primary="Clientes" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleMenuClick(1)}>
                <ListItemText primary="Clientes selecionados" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleMenuClick(2)}>
                <ListItemText primary="Sair" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;

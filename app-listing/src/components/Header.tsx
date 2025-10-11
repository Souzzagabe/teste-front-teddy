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
  ListItemIcon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HeaderImage from "../assets/Logo - Teddy.png";
import { useState } from "react";
import type { HeaderProps } from "../types";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

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
            margin: "0 auto",
            width: "100%",
            height: "100px",
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
            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 4,
              }}
            >
              <Tabs
                value={currentTab}
                onChange={onTabChange}
                textColor="inherit"
                indicatorColor="primary"
                sx={{
                  "& .MuiTabs-indicator": { backgroundColor: "#ED6C02" },
                  minHeight: 40,
                  height: 40,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Tab label="Clientes" />
                <Tab label="Clientes selecionados" />
                <Tab label="Sair" />
              </Tabs>

              <Box sx={{ position: "absolute", right: 99 }}>
                <Typography variant="body2">
                  Olá, <strong>{userName}</strong>!
                </Typography>
              </Box>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        variant="temporary"
        PaperProps={{
          sx: {
            width: isMobile ? "100vw" : 250,
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pt: 2,
          },
        }}
      >

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 4,
            width: "100%",
          }}
        >
          <img
            src={HeaderImage}
            alt="Logo Teddy"
            style={{ width: 120, height: "auto" }}
          />
        </Box>

        <List
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            flexGrow: 1,
          }}
        >
          <ListItem disablePadding sx={{ width: "100%" }}>
            <ListItemButton
              onClick={() => handleMenuClick(0)}
              sx={{ justifyContent: "center" }}
            >
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText
                primary="Home"
                primaryTypographyProps={{
                  color: currentTab === 0 ? "#ED6C02" : "inherit",
                  fontWeight: currentTab === 0 ? 700 : 400,
                }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ width: "100%" }}>
            <ListItemButton
              onClick={() => handleMenuClick(1)}
              sx={{ justifyContent: "center" }}
            >
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText
                primary="Clientes Selecionados"
                primaryTypographyProps={{
                  color: currentTab === 1 ? "#ED6C02" : "inherit",
                  fontWeight: currentTab === 1 ? 700 : 400,
                }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ width: "100%" }}>
            <ListItemButton
              onClick={() => handleMenuClick(2)}
              sx={{ justifyContent: "center" }}
            >
              <ListItemIcon>
                <PersonOutlineIcon />
              </ListItemIcon>
              <ListItemText
                primary="Sair"
                primaryTypographyProps={{
                  color: currentTab === 2 ? "#ED6C02" : "inherit",
                  fontWeight: currentTab === 2 ? 700 : 400,
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Header;

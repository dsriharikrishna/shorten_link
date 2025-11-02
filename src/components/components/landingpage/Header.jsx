import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Menu, Link as LinkIcon, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import SignInPage from "../auth/SignInPage";

const navLinks = [
  { to: "/pricing", label: "Pricing" },
  { to: "/docs", label: "Docs" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact Us" },
  { to: "/terms", label: "Terms & Conditions" },
];

const Header = () => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleDrawerToggle = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const handleOpenLogin = () => setLoginOpen(true);
  const handleCloseLogin = () => setLoginOpen(false);

  return (
    <>
      <AppBar position="sticky" color="default" elevation={1}>
        <Toolbar sx={{ justifyContent: "space-between", px: 2 }}>
          {/* Logo */}
          <Box
            display="flex"
            alignItems="center"
            component={Link}
            to="/"
            sx={{ textDecoration: "none" }}
          >
            <Box
              sx={{
                // bgcolor: "#fff",
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
                gap: 1,
              }}
            >
              <Box
                sx={{
                  bgcolor: "#fff",
                  px: 0.8,
                  py:0.3,
                  borderRadius: 1,
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Box
                  component="img"
                  src="/assets/urlLogo.png"
                  alt="ShortLink Logo"
                  sx={{ width: 24, height: 24, borderRadius: 1 }}
                />
              </Box>
              <Typography variant="h6" color="textPrimary" fontWeight="bold">
                ShortLink
              </Typography>
            </Box>
          </Box>

          {/* Desktop Nav */}
          {!isMobile && (
            <Box display="flex" alignItems="center" gap={3}>
              {navLinks.map((link) => (
                <Button
                  key={link.to}
                  component={Link}
                  to={link.to}
                  sx={{
                    color: isActive(link.to) ? "#14b8a6" : "#475569",
                    fontWeight: 500,
                    borderBottom: isActive(link.to)
                      ? "2px solid #14b8a6"
                      : "none",
                    borderRadius: 0,
                    textTransform: "none",
                  }}
                >
                  {link.label}
                </Button>
              ))}
              <Button
                onClick={handleOpenLogin}
                sx={{
                  color: "#14b8a6",
                  fontWeight: "bold",
                  textTransform: "none",
                  px: 2.5,
                  py: 0.5,
                  border: "1px solid #14b8a6",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#14b8a6",
                    color: "#fff",
                  },
                }}
              >
                Sign In
              </Button>
            </Box>
          )}

          {/* Mobile Menu */}
          {isMobile && (
            <IconButton onClick={handleDrawerToggle}>
              {isDrawerOpen ? <X /> : <Menu />}
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile */}
      <Drawer anchor="right" open={isDrawerOpen} onClose={handleDrawerToggle}>
        <Box
          sx={{
            width: 220,
            display: "flex",
            flexDirection: "column",
            height: "100%",
            p: 2,
            bgcolor: "#f9fafb",
          }}
        >
          {/* Optional Drawer Header */}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={2}
            sx={{
              py:1,
              px:1,
              borderBottom:'1.5px solid #e0e0e0'
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              component={Link}
              to="/"
              onClick={handleDrawerToggle}
              sx={{ textDecoration: "none" ,}}
            >
              <Box
                sx={{
                  bgcolor: "#fff",
                  p: 0.8,
                  borderRadius: 1,
                  mr: 1,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img src="/assets/urlLogo.png" alt="ShortLink Logo"  width={24} height={24}/>
                {/* <LinkIcon size={18} color="white" /> */}
              </Box>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                color="text.primary"
              >
                ShortLink
              </Typography>
            </Box>

            <IconButton size="small" onClick={handleDrawerToggle}>
              <X size={18} />
            </IconButton>
          </Box>

          <List sx={{ flex: 1 }}>
            {navLinks.map((link) => (
              <ListItem
                key={link.to}
                component={Link}
                to={link.to}
                onClick={handleDrawerToggle}
                sx={{
                  borderRadius: 1,
                  px: 2,
                  py: 1,
                  mb: 1,
                  bgcolor: isActive(link.to) ? "#e0f2f1" : "transparent",
                  "&:hover": {
                    bgcolor: "#e0f2f1",
                  },
                }}
              >
                <ListItemText
                  primary={link.label}
                  primaryTypographyProps={{
                    color: isActive(link.to) ? "#14b8a6" : "#334155",
                    fontWeight: 500,
                    fontSize: "0.95rem",
                  }}
                />
              </ListItem>
            ))}

            <ListItem
              button
              onClick={() => {
                handleDrawerToggle();
                handleOpenLogin();
              }}
              size="small"
              sx={{
                mt: 1,
                borderRadius: 1,
                px: 2,
                py: 0.5,
                cursor: "pointer",
                bgcolor: "#14b8a6",
                "&:hover": {
                  bgcolor: "#0d9488",
                },
              }}
            >
              <ListItemText
                primary="Sign In"
                primaryTypographyProps={{
                  color: "white",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  textAlign: "center",
                }}
              />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Login Modal */}
      <SignInPage open={isLoginOpen} onClose={handleCloseLogin} />
    </>
  );
};

export default Header;

import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  IconButton,
  Tooltip,
  Typography,
  Menu,
  MenuItem,
  Divider,
  Avatar,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";

// Icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { Settings, AccountCircle, PriceCheck } from "@mui/icons-material";
import { logout } from "../../redux/slicers/authSlice";
import { DollarSign, FileCode2Icon, TagIcon } from "lucide-react";
import LogoutDialog from "../dialogBoxes/LogoutDialog";

const drawerWidth = 200;
const slimWidth = 50;

const SidebarDrawer = styled(Drawer)(({ theme, open }) => ({
  width: open ? drawerWidth : slimWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  "& .MuiDrawer-paper": {
    width: open ? drawerWidth : slimWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
    backgroundColor: "#fff",
    borderRight: "1px solid #e0e0e0",
    display: "flex",
    flexDirection: "column",
  },
}));

const Sidebar = ({ open, toggleSidebar }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const userRole = useSelector((state) => state.auth.userRole);
  const userName = useSelector((state) => state.auth.userName);

  const handleNavigation = (route) => navigate(route);
  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);
  const handleNavigate = (path) => {
    navigate(path);
    handleCloseMenu();
  };
  const handleLogout = () => {
    setLogoutDialogOpen(true);
    handleCloseMenu();
  };
  const handleLogoutConfirm = () => {
    dispatch(logout());
    navigate("/");
  };

  const UTMIcon = () => {
    return (
      <img
        src={"/assets/UTM.png"}
        alt="UTM Icon"
        style={{ width: 24, height: 24 }}
        color="#0d9488"
      />
    );
  };

  // Remove duplicate/unused menu items
  const menuItems = [
    { icon: <DashboardIcon />, label: "Dashboard", path: "/dashboard" },
    { icon: <FileCode2Icon />, label: "Documentation", path: "/Documentaion" },
    { icon: <UTMIcon />, label: "Customize UTM", path: "/utm" },
    { icon: <TagIcon />, label: "Upgrade Plan", path: "/upgrade-plan" },
  ];

  // Example DataGrid columns and rows (replace with your actual data as needed)
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "shortUrl", headerName: "Short URL", width: 130 },
    { field: "domain", headerName: "Domain", width: 130 },
    { field: "slug", headerName: "Slug", width: 100 },
  ];
  const rows = [
    { id: 1, shortUrl: "sho.rt/abc", domain: "sho.rt", slug: "abc" },
    { id: 2, shortUrl: "sho.rt/xyz", domain: "sho.rt", slug: "xyz" },
    { id: 3, shortUrl: "sho.rt/123", domain: "sho.rt", slug: "123" },
  ];

  return (
    <SidebarDrawer variant="permanent" open={open}>
      <Stack height="100vh" justifyContent="space-between">
        <div>
          <Toolbar
            sx={{
              minHeight: "64px !important",
              display: "flex",
              alignItems: "center",
              justifyContent: open ? "flex-start" : "center",
              px: open ? 2 : 0,
              borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
            }}
          >
            <Box display="flex" alignItems="center">
              {open && (
                <>
                  <Avatar
                    sx={{ width: 36, height: 36, ml: -0.5, bgcolor: "#0d9488" }}
                  >
                    SL
                  </Avatar>
                  <Typography
                    noWrap
                    sx={{
                      fontWeight: 700,
                      fontSize: "16px",
                      color: "#0d9488",
                      ml: 1,
                    }}
                  >
                    ShortLink
                  </Typography>
                </>
              )}
            </Box>

            <IconButton
              onClick={toggleSidebar}
              sx={{
                color: "#0d9488",
                ml: open ? 1.5 : 0,
                "&:hover": {
                  backgroundColor: "rgba(25, 118, 210, 0.08)",
                },
              }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>

          <List sx={{ py: 0 }}>
            {menuItems.map(({ icon, label, path }) => {
              const isActive = location.pathname.startsWith(path);
              return (
                <Tooltip
                  key={path}
                  title={!open ? label : ""}
                  placement="right"
                >
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => handleNavigation(path)}
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                        backgroundColor: isActive
                          ? "rgba(25, 118, 210, 0.08)"
                          : "transparent",
                        "&:hover": {
                          backgroundColor: "rgba(122, 181, 240, 0.08)",
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 2 : "auto",
                          justifyContent: "center",
                          color: isActive ? "#0d9488" : "rgba(0, 0, 0, 0.54)",
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      {open && (
                        <ListItemText
                          primary={label}
                          primaryTypographyProps={{
                            fontWeight: isActive ? 600 : 500,
                            color: isActive ? "#0d9488" : "rgba(0, 0, 0, 0.87)",
                            fontSize: "14px",
                          }}
                        />
                      )}
                    </ListItemButton>
                  </ListItem>
                </Tooltip>
              );
            })}
          </List>
        </div>

        <Box sx={{ borderTop: "1px solid rgba(0, 0, 0, 0.12)" }}>
          <ListItem disablePadding>
            <ListItemButton
              onClick={handleMenuClick}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                "&:hover": {
                  backgroundColor: "rgba(25, 118, 210, 0.08)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : "auto",
                  justifyContent: "center",
                }}
              >
                <Avatar sx={{ width: 36, height: 36, bgcolor: "#0d9488" }}>
                  {userName?.charAt(0) || "U"}
                </Avatar>
              </ListItemIcon>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 1,
                }}
              />
              {open && (
                <Box flex={1}>
                  <Typography fontWeight={500} fontSize="14px">
                    {userName || "Guest"}
                  </Typography>
                  <Typography
                    variant="caption"
                    fontSize="12px"
                    color="text.secondary"
                  >
                    {userRole || "User"}
                  </Typography>
                </Box>
              )}

              {open && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    gap: 1,
                    cursor: "pointer",
                  }}
                >
                  <Settings
                    sx={{ color: "rgba(0, 0, 0, 0.54)", fontSize: 20 }}
                  />
                </Box>
              )}
            </ListItemButton>
          </ListItem>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "bottom", horizontal: "right" }}
          PaperProps={{
            elevation: 3,
            sx: {
              mt: 1,
              minWidth: 150,
              borderRadius: "8px",
              py: 0,
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              "& .MuiMenuItem-root": {
                fontSize: "14px",
                py: 1,
                "&:hover": {
                  backgroundColor: "rgba(25, 118, 210, 0.08)",
                },
              },
            },
          }}
        >
          {/* <MenuItem onClick={() => handleNavigate("/dashboard/Profile")}>
            <ListItemIcon>
              <AccountCircle fontSize="small" />
            </ListItemIcon>
            <ListItemText>Profile</ListItemText>
          </MenuItem>
          <Divider /> */}
          <MenuItem onClick={handleLogout} sx={{ color: "#E02424" }}>
            <ListItemIcon sx={{ color: "#E02424" }}>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        </Menu>
      </Stack>

      <LogoutDialog
        open={logoutDialogOpen}
        onClose={() => setLogoutDialogOpen(false)}
        onConfirm={handleLogoutConfirm}
      />
    </SidebarDrawer>
  );
};

export default Sidebar;

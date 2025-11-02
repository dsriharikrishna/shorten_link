import React, { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Avatar,
  Stack,
  Divider,
  useTheme,
  useMediaQuery,
  Button,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MenuIcon from "@mui/icons-material/Menu";
import MessageIcon from "@mui/icons-material/Message";
import { Add, Settings } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/slicers/authSlice";
import CreateLinkDialog from "../dialogBoxes/CreateLinkDialog";
import LogoutDialog from "../dialogBoxes/LogoutDialog";

const Navbar = ({ open, toggleSidebar, title }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [isCreatingLink, setIsCreatingLink] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.auth.userName) || "User";

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path) => {
    navigate(path);
    handleCloseMenu();
  };

  const handleLogout = () => {
    setLogoutDialogOpen(true);
    handleCloseMenu();
  };

  const handleCreateLink = () => {
    setIsCreatingLink(true);
  };

  const handleCloseCreateLink = () => {
    setIsCreatingLink(false);
  };

  const handleLogoutConfirm = () => {
    dispatch(logout());
    navigate("/");
  };

  const drawerWidth = open ? 200 : isMobile ? 0 : 50;
  const menuStyles = {
    fontSize: "14px",
    lineHeight: "21px",
    color: "#111928",
    display: "flex",
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        backgroundColor: "white",
        boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
        borderBottom: "1px solid #D1D5DB",
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        zIndex: theme.zIndex.drawer - 1,
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          sx={{
            flexGrow: 1,
            fontWeight: "600",
            color: "#0d9488",
            fontSize: {
              xs: "0.8rem",
              sm: "1.2rem",
              md: "1.2rem",
              lg: "1.5rem",
            },

            ml: {
              xs: open ? 0 : 8,
              sm: open ? 2 : 9,
              md: open ? 0 : 1.5,
              lg: open ? 0 : 2,
            },
          }}
        >
          {title}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box display="flex" alignItems="center" gap={2}>
            {/* <Button
              // variant="outlined"
              startIcon={<Add />}
              onClick={handleCreateLink}
              sx={{
                textTransform: "capitalize",
                borderColor: "#ccc",
                border: "0.5px solid #0d9488",
                color: "#0d9488",
              }}
            >
              Create Link
            </Button> */}
          </Box>

          <IconButton
            onClick={handleMenuClick}
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            color="inherit"
          >
            {profilePic ? (
              <Avatar src={profilePic} sx={{ width: 32, height: 32 }} />
            ) : (
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: "#0d9488",
                }}
              >
                {userName && userName.length > 0
                  ? userName.charAt(0).toUpperCase()
                  : "U"}
              </Avatar>
            )}
          </IconButton>
        </Box>

        {/* User Menu */}
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          PaperProps={{
            elevation: 2,
            sx: {
              mt: 1.5,
              minWidth: 180,
              borderRadius: 1,
              overflow: "visible",
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
        >
          <Stack direction="column" spacing={0}>
            {/* <MenuItem
              onClick={() => handleNavigate("/dashboard/Profile")}
              sx={menuStyles}
            >
              <ListItemIcon>
                <AccountCircleIcon
                  sx={{ mr: 1.5, fontSize: 18, color: "#6B7280" }}
                />
              </ListItemIcon>
              <ListItemText> Profile</ListItemText>
            </MenuItem> */}
            {/* <MenuItem onClick={() => handleNavigate("/dashboard/Settings")}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              <ListItemText>Settings</ListItemText>
            </MenuItem> */}

            {/* <Divider sx={{ my: 0.5 }} /> */}

            <MenuItem
              onClick={handleLogout}
              sx={{ ...menuStyles, color: "#E02424" }}
            >
              <ListItemIcon>
                <ExitToAppIcon
                  sx={{ mr: 1.5, fontSize: 18, color: "#E02424" }}
                />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </MenuItem>
          </Stack>
        </Menu>
      </Toolbar>

      {/* Create Link Dialog */}
      {isCreatingLink && (
        <CreateLinkDialog
          open={isCreatingLink}
          onClose={handleCloseCreateLink}
        />
      )}

      <LogoutDialog
        open={logoutDialogOpen}
        onClose={() => setLogoutDialogOpen(false)}
        onConfirm={handleLogoutConfirm}
      />
    </AppBar>
  );
};

export default Navbar;

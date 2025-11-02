import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Box,
  Button,
  IconButton,
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
  Slide,
} from "@mui/material";
import { Cancel, Logout } from "@mui/icons-material";
import { polishedStandardStyles, brandColor } from "../../styles/InputStyles";

// Optional Slide Animation
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const LogoutDialog = ({ open, onClose, onConfirm }) => {
  const handleLogout = async () => {
    try {
      await onConfirm();
      onClose();
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        TransitionComponent={Transition}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          elevation: 4,
          sx: {
            p: 0,
            borderRadius: 3,
            overflow: "hidden",
          },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            bgcolor: brandColor.background,
            px: 2,
            py: 1.5,
            borderBottom: "1px solid #e2e8f0",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold", color: brandColor.primary }}>
            Confirm Logout
          </Typography>
          <IconButton onClick={onClose} sx={{ color: "#64748b" }}>
            <Cancel />
          </IconButton>
        </Box>

        {/* Content */}
        <DialogContent sx={{ p: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                backgroundColor: brandColor.background,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                animation: "scale-in 0.3s ease",
              }}
            >
              <Logout sx={{ color: brandColor.primary, fontSize: 36 }} />
            </Box>
          </Box>

          <Typography
            variant="h6"
            sx={{ textAlign: "center", fontWeight: 600, mb: 1 }}
          >
            Are you sure you want to logout?
          </Typography>
          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
              color: "text.secondary",
              mb: 3,
              px: 1,
            }}
          >
            You'll be logged out and redirected to the login screen.
          </Typography>

          <DialogActions sx={{ justifyContent: "center", gap: 2 }}>
            <Button
              variant="outlined"
              onClick={onClose}
              sx={{
                px: 3,
                py: 1,
                borderRadius: "8px",
                textTransform: "none",
                fontWeight: 600,
                borderColor: brandColor.primary,
                color: brandColor.primary,
                '&:hover': {
                  borderColor: brandColor.secondary,
                  backgroundColor: brandColor.background,
                },
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{
                px: 3,
                py: 1,
                borderRadius: "8px",
                textTransform: "none",
                fontWeight: 600,
                backgroundColor: brandColor.primary,
                color: '#fff',
                '&:hover': {
                  backgroundColor: brandColor.secondary,
                },
              }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>

      {/* Toast */}
      <ToastContainer
        limit={1}
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* Optional Animations */}
      <style>{`
        @keyframes scale-in {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};

export default LogoutDialog;

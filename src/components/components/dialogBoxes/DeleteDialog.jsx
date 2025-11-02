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
import { Cancel, Warning } from "@mui/icons-material";

// Optional: Slide transition
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const DeleteDialog = ({ open, onClose, onConfirm }) => {
  const handleDelete = async () => {
    try {
      await onConfirm();
      onClose();
    } catch (error) {
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="xs"
        fullWidth
        TransitionComponent={Transition}
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
            bgcolor: "#f8fafc",
            px: 1.5,
            py: 1.5,
            borderBottom: "1px solid #e2e8f0",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Confirm Deletion
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
                backgroundColor: "#fef2f2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                animation: "scale-in 0.3s ease",
              }}
            >
              <Warning sx={{ color: "#dc2626", fontSize: 36 }} />
            </Box>
          </Box>

          <Typography
            variant="h6"
            sx={{ textAlign: "center", fontWeight: 600, mb: 1 }}
          >
            Are you sure?
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
            This action is permanent and cannot be undone. All related data will be removed.
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
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleDelete}
              sx={{
                px: 3,
                py: 1,
                borderRadius: "8px",
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              Delete
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

      {/* Animation Style */}
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

export default DeleteDialog;

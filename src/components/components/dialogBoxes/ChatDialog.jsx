import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ChatWidget from "../../chatbot/ChatWidget";

const ChatDialog = ({ open, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      hideBackdrop
      PaperProps={{
        sx: {
          position: "fixed",
          bottom: isMobile ? 0 : 80,
          right: isMobile ? 0 : 20,
          m: 0,
          width: isMobile ? "100%" : 360,
          height: isMobile ? "100%" : 450,
          borderRadius: 2,
          boxShadow: 5,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <DialogTitle
        sx={{
          px: 2,
          py: 1,
          fontWeight: 600,
          fontSize: "1rem",
          backgroundColor: "#f0fdfa",
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        Chat Support
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
          size="small"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent
        sx={{
          p: 0,
          flex: 1,
          overflow: "hidden",
          backgroundColor: "#f9fafb",
        }}
      >
        <ChatWidget />
      </DialogContent>
    </Dialog>
  );
};

export default ChatDialog;

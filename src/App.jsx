import React, { useState } from "react";
import AllRoutes from "./components/routes/AllRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box, IconButton } from "@mui/material";
import ChatDialog from "./components/components/dialogBoxes/ChatDialog";
import { BotMessageSquare } from "lucide-react";

const App = () => {
  const [isChatBot, setIsChatBot] = useState(false);
  const handleOpen = () => {
    setIsChatBot(true);
  };
  const handleClose = () => {
    setIsChatBot(false);
  };
  return (
    <div>
      <AllRoutes />
      <ToastContainer
        limit={1}
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* Floating Chat Icon */}
      <Box
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          zIndex: 1300,
          backgroundColor: "#0d9488",
          color: "#fff",
          borderRadius: "40%",
          boxShadow: 3,
          "&:hover": {
            backgroundColor: "#0f766e",
          },
        }}
      >
        <IconButton size="large" sx={{ color: "#fff" }} onClick={handleOpen}>
          <BotMessageSquare />
        </IconButton>
      </Box>

      <ChatDialog open={isChatBot} onClose={handleClose} />
    </div>
  );
};

export default App;

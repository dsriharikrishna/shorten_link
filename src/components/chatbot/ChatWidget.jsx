import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  TextField,
  IconButton,
  Divider,
} from "@mui/material";
import { Send } from "@mui/icons-material";

const WEBSOCKET_URL = "ws://localhost:5173";

const ChatWidget = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! How can I help you?" },
  ]);
  const [input, setInput] = useState("");
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socketRef.current = new WebSocket(WEBSOCKET_URL);

    socketRef.current.onopen = () => console.log("WebSocket connected");
    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prev) => [...prev, { sender: "bot", text: data.message }]);
    };
    socketRef.current.onerror = (err) => console.error("WebSocket error:", err);
    socketRef.current.onclose = () => console.log("WebSocket disconnected");

    return () => socketRef.current.close();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    if (socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ message: input }));
    }

    setInput("");
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f0fdf4",
      }}
    >
      {/* Messages */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          px: 2,
          py: 1.5,
        }}
      >
        {messages.map((msg, idx) => (
          <Box
            key={idx}
            display="flex"
            justifyContent={msg.sender === "user" ? "flex-end" : "flex-start"}
            mb={1}
          >
            <Box
              sx={{
                px: 2,
                py: 1,
                borderRadius: 2,
                maxWidth: "80%",
                backgroundColor: msg.sender === "user" ? "#d1fae5" : "#e0f2fe",
                color: "#1f2937",
                fontSize: "0.9rem",
                boxShadow: 1,
              }}
            >
              {msg.text}
            </Box>
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Box>

      <Divider />

      {/* Input */}
      <Box sx={{ p: 1.5, display: "flex", gap: 1 }}>
        <TextField
          variant="standard"
          fullWidth
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <IconButton
          onClick={handleSend}
          disabled={!input.trim()}
          sx={{
            backgroundColor: "#0d9488",
            color: "#fff",
            "&:hover": { backgroundColor: "#0f766e" },
            borderRadius: 2,
          }}
        >
          <Send fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatWidget;

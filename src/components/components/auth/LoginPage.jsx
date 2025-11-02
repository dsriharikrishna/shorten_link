import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Box,
  TextField,
  Button,
  IconButton,
  Typography,
  Dialog,
  DialogContent,
  CircularProgress,
} from "@mui/material";
import { Cancel, LockOutlined } from "@mui/icons-material";
import {
  loginUserVerify,
  loginUserVerifyCode,
} from "../../redux/slicers/authSlice";
import { polishedStandardStyles } from "../../styles/InputStyles";

const LoginPage = ({ open, onClose }) => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSendCode = async () => {
    if (!email) return toast.error("Please enter a valid email");
    setLoading(true);
    try {
      await dispatch(loginUserVerify({ email })).unwrap();
      setShowCodeInput(true);
      toast.success("OTP sent to your email!");
    } catch {
      toast.error("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (code.length < 4) return toast.warning("Enter the full code");
    setLoading(true);
    try {
      const response = await dispatch(
        loginUserVerifyCode({ email, code })
      ).unwrap();
      const token = response.details?.access_token;
      if (!token) return toast.error("No token received");
      localStorage.setItem("shortUrl-auth", token);
      toast.success("Verified and logged in!");
      navigate("/dashboard");
    } catch {
      toast.error("Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
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
        @keyframes iconPop {
          from {
            transform: scale(0.85);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .dialog-fade-slide {
          animation: fadeSlideIn 0.4s ease-in-out;
        }

        .lock-icon-pop {
          animation: iconPop 0.5s ease-out;
        }
      `}</style>

      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          className: "dialog-fade-slide",
          sx: {
            p: 0,
            borderRadius: 3,
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
            px: 2,
            py: 1.5,
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          <Typography variant="h6" fontWeight={600}>
            Login
          </Typography>
          <IconButton onClick={() => navigate("/")}>
            <Cancel />
          </IconButton>
        </Box>

        {/* Content */}
        <DialogContent sx={{ p: 3 }}>
          {/* Center Icon */}
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <Box
              className="lock-icon-pop"
              sx={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                backgroundColor: "#e0f2f1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LockOutlined sx={{ color: "#009688", fontSize: 30 }} />
            </Box>
          </Box>

          {/* Headings */}
          <Typography
            variant="h6"
            sx={{ textAlign: "center", fontWeight: 600, mb: 0.5 }}
          >
            Welcome Back
          </Typography>
          <Typography
            variant="body2"
            sx={{ textAlign: "center", color: "text.secondary", mb: 3 }}
          >
            Sign in with your email to receive a one-time code for secure login.
          </Typography>

          {/* Form */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-end",
              gap: 2,
              mb: 2,
            }}
          >
            {!showCodeInput ? (
              <>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendCode()}
                  variant="standard"
                  required
                  sx={polishedStandardStyles}
                  InputProps={{
                    disableUnderline: false,
                    sx: { fontWeight: 500 },
                  }}
                  InputLabelProps={{
                    sx: { fontSize: "0.875rem" },
                  }}
                />
                <Button
                  onClick={handleSendCode}
                  disabled={loading}
                  variant="contained"
                  sx={{
                    height: 36,
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    textTransform: "none",
                    bgcolor: "#009688",
                    "&:hover": { bgcolor: "#00796b" },
                    px: 2,
                    boxShadow: "none",
                  }}
                >
                  {loading ? (
                    <CircularProgress size={18} color="inherit" />
                  ) : (
                    "Send"
                  )}
                </Button>
              </>
            ) : (
              <>
                <TextField
                  fullWidth
                  label="Code"
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleVerifyCode()}
                  variant="standard"
                  inputProps={{
                    maxLength: 6,
                    style: { fontWeight: 500, letterSpacing: "0.2rem" },
                  }}
                  sx={polishedStandardStyles}
                  InputProps={{
                    disableUnderline: false,
                  }}
                  InputLabelProps={{
                    sx: { fontSize: "0.875rem" },
                  }}
                />
                <Button
                  onClick={handleVerifyCode}
                  disabled={loading}
                  variant="contained"
                  sx={{
                    height: 36,
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    textTransform: "none",
                    bgcolor: "#009688",
                    "&:hover": { bgcolor: "#00796b" },
                    px: 2,
                    boxShadow: "none",
                  }}
                >
                  {loading ? (
                    <CircularProgress size={18} color="inherit" />
                  ) : (
                    "Verify"
                  )}
                </Button>
              </>
            )}
          </Box>
        </DialogContent>
      </Dialog>

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
    </>
  );
};

export default LoginPage;

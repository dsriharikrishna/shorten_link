import React, { useCallback, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Paper,
  IconButton,
  Divider,
} from "@mui/material";
import { polishedStandardStyles, brandColor } from "../../styles/InputStyles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useDispatch, useSelector } from "react-redux";
import { getQRCodeLabelThunk } from "../../redux/slicers/dashboardSlice";

const QRCodeLabel = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const dispatch = useDispatch();
  const qrCodeLabel = useSelector((state) => state.dashboard.qrCodeLabel);

  const handleGenerate = useCallback(async () => {
    if (!title.trim()) return;
    const payload = {
      link: title,
      device_id: localStorage.getItem("device_id"),
      user_id: parseInt(localStorage.getItem("userId")),
    };
    const response = await dispatch(getQRCodeLabelThunk(payload));
    console.log("response", response);
    onSubmit?.(payload);
    setSubmitted(true);
  }, [title, dispatch, onSubmit]);

  const handleBack = () => {
    setSubmitted(false);
    setTitle("");
  };

  const handleDownload = () => {
    if (qrCodeLabel?.details?.image) {
      const anchor = document.createElement("a");
      anchor.href = qrCodeLabel.details.image;
      anchor.download = "qr_code.png";
      anchor.click();
    }
  };

  const handleCopy = async () => {
    if (qrCodeLabel?.details?.link) {
      try {
        await navigator.clipboard.writeText(qrCodeLabel.details.link);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      } catch (err) {
        setCopySuccess(false);
      }
    }
  };

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        color: "black",
        backgroundColor: "#fff",
        mx: "auto",
      }}
    >
      {!submitted ? (
        <>
          <Typography
            variant="h6"
            fontWeight={700}
            mb={2}
            sx={{ color: "#0d9488" }}
          >
            QR Code Metadata
          </Typography>

          <TextField
            label="Enter Link"
            variant="standard"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mb: 2, ...polishedStandardStyles }}
            InputProps={{ style: { color: "black" } }}
            InputLabelProps={{ style: { color: "gray" } }}
          />

          <Button
            onClick={handleGenerate}
            variant="contained"
            fullWidth
            size="small"
            sx={{
              textTransform: "none",
              backgroundColor: brandColor.primary,
              borderRadius: 1,
              "&:hover": {
                backgroundColor: "#0f766e",
              },
            }}
          >
            Submit
          </Button>
        </>
      ) : (
        <>
          <Box display="flex" alignItems="center" mb={2}>
            <IconButton onClick={handleBack} sx={{ color: "#0d9488", mr: 1 }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" fontWeight={700}>
              QR Code Details
            </Typography>
          </Box>

          {qrCodeLabel?.details ? (
            <Paper
              elevation={1}
              sx={{
                p: 3,
                backgroundColor: "#f8fafc",
                borderRadius: 2,
                display: "flex",
                flexDirection: "column",
                gap: 4,
                alignItems: "flex-start",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{ display: "flex", flexDirection: "row", gap: 2, flex: 1 }}
              >
                {/* LEFT: QR Image + Buttons */}
                <Box sx={{ flex: 1, textAlign: "center" }}>
                  <img
                    src={qrCodeLabel.details.image}
                    alt="QR Code"
                    style={{ maxWidth: 200, maxHeight: 200 }}
                    onError={(e) => {
                      e.target.src = "";
                      e.target.alt = "QR code not available.";
                    }}
                  />

                  {copySuccess && (
                    <Typography
                      variant="caption"
                      color="success.main"
                      sx={{ mt: 1, display: "block" }}
                    >
                      Link copied!
                    </Typography>
                  )}
                </Box>

                {/* RIGHT: Metadata */}
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" fontWeight={600} gutterBottom>
                    Link
                  </Typography>
                  <Typography variant="body2" sx={{ wordBreak: "break-word" }}>
                    {qrCodeLabel.details.link}
                  </Typography>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="body2" fontWeight={600} gutterBottom>
                    Created At
                  </Typography>
                  <Typography variant="body2">
                    {new Date(qrCodeLabel.details.created_at).toLocaleString()}
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                  flexDirection: "row",
                  gap: 2,
                  mt: 2,
                  flexWrap: "wrap",
                }}
              >
                <Button
                  variant="outlined"
                  onClick={handleDownload}
                  size="small"
                  sx={{
                    textTransform: "none",
                    borderColor: "#0d9488",
                    color: "#0d9488",
                    fontWeight: 500,
                    "&:hover": {
                      borderColor: "#0f766e",
                      backgroundColor: "#e0f2f1",
                    },
                  }}
                >
                  Download QR Code
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleCopy}
                  startIcon={<ContentCopyIcon />}
                  size="small"
                  sx={{
                    textTransform: "none",
                    borderColor: "#0d9488",
                    color: "#0d9488",
                    fontWeight: 500,
                    "&:hover": {
                      borderColor: "#0f766e",
                      backgroundColor: "#e0f2f1",
                    },
                  }}
                >
                  Copy Link
                </Button>
              </Box>
            </Paper>
          ) : (
            <Typography color="error">
              Failed to generate QR code. Please try again.
            </Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default QRCodeLabel;

import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tabs,
  Tab,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import ShortUrl from "../createLink/ShortUrl";
import UTMLinks from "../createLink/UTMLinks";
import QRCodeLabel from "../createLink/QRCodeLabel";

const CreateLinkDialog = ({ open, onClose }) => {
  const [tab, setTab] = useState(0);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const type = tab === 0 ? "short" : tab === 1 ? "utm" : "qr";
    console.log("Submitting", { type, ...form });

    setTimeout(() => {
      setLoading(false);
      onClose();
    }, 1000);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen
      sx={{
        "& .MuiDialog-paper": {
          maxWidth: "650px",
          marginLeft: "auto",
          marginRight: 0,
          height: "100vh",
          borderRadius: 0,
          display: "flex",
          flexDirection: "column",
          px: 2,
          py: 1,
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #ddd",
          pb: 1,
        }}
      >
        <Typography variant="h6" component="span" fontWeight={700}>
          Create Link
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <form
        onSubmit={handleSubmit}
        style={{ flex: 1, display: "flex", flexDirection: "column" }}
      >
        <DialogContent sx={{ flexGrow: 1, overflowY: "auto" }}>
          <Tabs
            value={tab}
            onChange={(e, newTab) => setTab(newTab)}
            textColor="primary"
            indicatorColor="primary"
            sx={{
              borderBottom: "1px solid #009688",
              mb: 2,
              "& .MuiTab-root.Mui-selected": {
                color: "#009688", // ✅ selected tab text
                fontWeight: 700,
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#009688", // ✅ tab underline
              },
            }}
          >
            <Tab
              label="Short URL"
              sx={{ textTransform: "none", fontWeight: 600 }}
            />
            <Tab
              label="UTM Link"
              sx={{ textTransform: "none", fontWeight: 600 }}
            />
            <Tab
              label="QR Code"
              sx={{ textTransform: "none", fontWeight: 600 }}
            />
          </Tabs>

          <Box>
            {tab === 0 && <ShortUrl form={form} handleChange={handleChange} />}
            {tab === 1 && <UTMLinks form={form} handleChange={handleChange} />}
            {tab === 2 && (
              <QRCodeLabel form={form} handleChange={handleChange} />
            )}
          </Box>
        </DialogContent>

        <DialogActions
          sx={{
            borderTop: "1px solid #eee",
            p: 2,
          }}
        >
          {/* <Button onClick={onClose} variant="outlined" sx={{ textTransform: "capitalize" }}>
            Cancel
          </Button> */}
          {/* <Button
            type="submit"
            variant="contained"
            sx={{ textTransform: "capitalize" }}
            disabled={loading}
          >
            {loading ? "Saving..." : "Create"}
          </Button> */}
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateLinkDialog;

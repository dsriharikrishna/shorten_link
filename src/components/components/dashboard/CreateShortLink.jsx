import React, { useState } from "react";
import { Tabs, Tab, Box, Typography, Button, Divider } from "@mui/material";

import ShortUrl from "../createLink/ShortUrl";
import UTMLinks from "../createLink/UTMLinks";
import QRCodeLabel from "../createLink/QRCodeLabel";
import { useLocation } from "react-router-dom";

const CreateShortLink = () => {
  const [tab, setTab] = useState(0);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);

  const location = useLocation();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
      type: tab === 0 ? "short" : tab === 1 ? "utm" : "qr",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const type = tab === 0 ? "short" : tab === 1 ? "utm" : "qr";
    console.log("Submitting", { type, ...form });

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        mx: "auto",
        p: 2,
      }}
    >
      {window.location.pathname === "/" ? null : (
        <Typography variant="h6" fontWeight={700} mb={2}>
          Create Link
        </Typography>
      )}

      <Tabs
        value={tab}
        onChange={(e, newTab) => setTab(newTab)}
        textColor="primary"
        indicatorColor="primary"
        allowScrollButtonsMobile
        sx={{
          "& .MuiTab-root.Mui-selected": {
            color: "#009688",
            fontWeight: 700,
          },
          "& .MuiTabs-indicator": {
            backgroundColor: "#009688",
          },
        }}
      >
        <Tab
          label="Short URL"
          sx={{ textTransform: "none", fontWeight: 600 }}
        />
        <Tab
          label="UTM Builder"
          sx={{ textTransform: "none", fontWeight: 600 }}
        />
        <Tab label="QR Code" sx={{ textTransform: "none", fontWeight: 600 }} />
      </Tabs>

      <Box sx={{ p: 0, m: 0, backgroundColor: "#fff" }}>
        {tab === 0 && <ShortUrl />}
        {tab === 1 && <UTMLinks />}
        {tab === 2 && <QRCodeLabel />}
      </Box>
    </Box>
  );
};

export default CreateShortLink;

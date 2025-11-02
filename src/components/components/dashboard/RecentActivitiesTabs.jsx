import React, { useState } from "react";
import { Box, Button, Typography, Tabs, Tab, Divider } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import QrCodeIcon from "@mui/icons-material/QrCode";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import { useNavigate } from "react-router-dom";

const RecentActivitiesTabs = () => {
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(0);

  const recentShortLinks = [
    {
      id: "abc123",
      title: "short.ly/abc123",
      path: "/dashboard/links/graphs",
      icon: <LinkIcon />,
    },
    {
      id: "xyz789",
      title: "short.ly/xyz789",
      path: "/dashboard/links/graphs",
      icon: <LinkIcon />,
    },
    {
      id: "test456",
      title: "short.ly/test456",
      path: "/dashboard/links/graphs",
      icon: <LinkIcon />,
    },
     {
      id: "abc123",
      title: "short.ly/abc123",
      path: "/dashboard/links/graphs",
      icon: <LinkIcon />,
    },
    {
      id: "xyz789",
      title: "short.ly/xyz789",
      path: "/dashboard/links/graphs",
      icon: <LinkIcon />,
    },
   
  ];

  const recentQRCodes = [
    {
      id: "campaignA",
      title: "QR: Campaign A",
      path: "/dashboard/qr-codes/graphs",
      icon: <QrCodeIcon />,
    },
    {
      id: "productB",
      title: "QR: Product B",
      path: "/dashboard/qr-codes/graphs",
      icon: <QrCodeIcon />,
    },
    {
      id: "pageC",
      title: "QR: Page C",
      path: "/dashboard/qr-codes/graphs",
      icon: <QrCodeIcon />,
    },
  ];

  const recentUTMLinks = [
    {
      id: "google",
      title: "utm_source=google",
      path: "/dashboard/utm-links/graphs",
      icon: <TrackChangesIcon />,
    },
    {
      id: "facebook",
      title: "utm_source=facebook",
      path: "/dashboard/utm-links/graphs",
      icon: <TrackChangesIcon />,
    },
    {
      id: "twitter",
      title: "utm_source=twitter",
      path: "/dashboard/utm-links/graphs",
      icon: <TrackChangesIcon />,
    },
  ];

  const handleTabChange = (_, newValue) => setTabIndex(newValue);

  const renderItems = (items) => (
    <>
      {items.map((item) => (
        <Box
          key={item.id}
          onClick={() =>
            navigate(`${item.path}/${item.id}`, {
              state: { id: item.id, title: item.title, path: item.path },
            })
          }
          sx={{
            mb: 2,
            border: "1px solid #e5e7eb",
            borderRadius: 2,
            backgroundColor: "#fff",
            px: 2,
            py: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            cursor: "pointer",
            transition: "transform 0.2s, box-shadow 0.2s",
            "&:hover": {
              transform: "scale(1.02)",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            },
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 600, color: "#555" }}>
            {item.title}
          </Typography>
          <Box>{item.icon}</Box>
        </Box>
      ))}
    </>
  );

  const getViewMorePath = () => {
    switch (tabIndex) {
      case 0:
        return "/dashboard/links";
      case 1:
        return "/dashboard/qr-codes";
      case 2:
        return "/dashboard/utm-links";
      default:
        return "/";
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          flexDirection: "column",
          mb: 2,
        }}
      >
        <Typography variant="h6" fontWeight={700}>
          Recent Activities
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          textColor="primary"
          sx={{
            mb: 2,
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
            label="Short Links"
            sx={{ textTransform: "none", fontWeight: 600 }}
          />
          <Tab
            label="QR Codes"
            sx={{ textTransform: "none", fontWeight: 600 }}
          />
          <Tab
            label="UTM Links"
            sx={{ textTransform: "none", fontWeight: 600 }}
          />
        </Tabs>
        <Button
          onClick={() => navigate(getViewMorePath())}
          variant="text"
          sx={{ textTransform: "none", fontWeight: 600, color: "#0d9488" }}
        >
          View More
        </Button>
      </Box>

      {tabIndex === 0 && <Box>{renderItems(recentShortLinks)}</Box>}

      {tabIndex === 1 && <Box>{renderItems(recentQRCodes)}</Box>}

      {tabIndex === 2 && <Box>{renderItems(recentUTMLinks)}</Box>}
    </Box>
  );
};

export default RecentActivitiesTabs;

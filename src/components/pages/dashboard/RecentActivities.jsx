import React from "react";
import { Box, Button, Typography } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import QrCodeIcon from "@mui/icons-material/QrCode";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import { useNavigate } from "react-router-dom";

const RecentActivities = () => {
  const navigate = useNavigate();

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

  // Reusable section header component
  const SectionHeader = ({ title, onMore }) => (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 2,
      }}
    >
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: "1.25rem",
          color: "#0d9488",
          display: "flex",
          alignItems: "center",
        }}
      >
        {title}
      </Typography>
      <Button
        onClick={onMore}
        sx={{
          textTransform: "none",
          color: "#0d9488",
          fontWeight: 600,
          fontSize: "0.875rem",
          padding: "6px 8px",
          borderColor: "#1976d2 ",
          borderRadius: 1,
          "&:focus": {
            outline: "none",
          },
          "&:hover": {
            backgroundColor: "transparent",
            borderColor: "#0d9488",
            color: "#0d9488",
          },
        }}
      >
        More
      </Button>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, p: 2 }}>
      {/* Column 1: Short Links */}
      <Box sx={{ flex: "1 1 30%", minWidth: "300px" }}>
        <SectionHeader
          title="Recent Short Links"
          onMore={() => navigate("/dashboard/links")}
        />
        {recentShortLinks.map((item) => (
          <Box
            key={item.id}
            onClick={() =>
              navigate(`${item.path}/${item.id}`, {
                state: {
                  id: item.id,
                  title: item.title,
                  path: item.path,
                },
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
      </Box>

      {/* Column 2: QR Codes */}
      <Box sx={{ flex: "1 1 30%", minWidth: "300px" }}>
        <SectionHeader
          title="Recent QR Codes"
          onMore={() => navigate("/dashboard/qr-codes")}
        />
        {recentQRCodes.map((item) => (
          <Box
            key={item.id}
            onClick={() =>
              navigate(`${item.path}/${item.id}`, {
                state: {
                  id: item.id,
                  title: item.title,
                  path: item.path,
                },
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
      </Box>

      {/* Column 3: UTM Links */}
      <Box sx={{ flex: "1 1 30%", minWidth: "300px" }}>
        <SectionHeader
          title="Recent UTM Links"
          onMore={() => navigate("/dashboard/utm-links")}
        />
        {recentUTMLinks.map((item) => (
          <Box
            key={item.id}
            onClick={() =>
              navigate(`${item.path}/${item.id}`, {
                state: {
                  id: item.id,
                  title: item.title,
                  path: item.path,
                },
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
      </Box>
    </Box>
  );
};

export default RecentActivities;

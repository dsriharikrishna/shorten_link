import React, { useCallback, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LinkIcon from "@mui/icons-material/Link";
import QrCodeIcon from "@mui/icons-material/QrCode";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import { useNavigate } from "react-router-dom";
import RecentActivities from "./RecentActivities";
import RecentActivitiesTabs from "../../components/dashboard/RecentActivitiesTabs";
import CreateShortLink from "../../components/dashboard/CreateShortLink";
import { useDispatch } from "react-redux";
import { fetchDashboardData } from "../../redux/slicers/dashboardSlice";

const DashboardPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user_id = localStorage.getItem("userId");
  const fetchDashboard = useCallback(async () => {
    const response = await dispatch(fetchDashboardData({ user_id }));
    console.log(response);
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [dispatch]);

  const statsToRender = [
    {
      title: "Total Links",
      count: 1200,
      change: "+5.4%",
      icon: <LinkIcon color="primary" />,
      path: "/totallinks",
      bgColor: "#f1fafa",
    },
    {
      title: "Remaining Links",
      count: 300,
      change: "-1.2%",
      icon: <LinkIcon color="secondary" />,
      path: "/remaininglinks",
      bgColor: "#f1fafa",
    },
    {
      title: "Generated Links",
      count: 950,
      change: "+3.1%",
      icon: <DashboardIcon color="info" />,
      path: "/generatedlinks",
      bgColor: "#f1fafa",
    },
    {
      title: "QR Codes",
      count: 420,
      change: "+2.6%",
      icon: <QrCodeIcon color="success" />,
      path: "/qrcodes",
      bgColor: "#f1fafa",
    },
    {
      title: "Generated UTM Count",
      count: 785,
      change: "+6.0%",
      icon: <TrackChangesIcon color="warning" />,
      path: "/utm-count",
      bgColor: "#f1fafa",
    },
    {
      title: "Clicks Count",
      count: 10834,
      change: "+4.8%",
      icon: <TrendingUpIcon color="error" />,
      path: "/clicks",
      bgColor: "#f1fafa",
    },
  ];

  return (
    <Box
      sx={{
        p: 2,
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        {statsToRender.map((stat, index) => (
          <Box
            key={index}
            onClick={() => stat.path && navigate(stat.path)}
            sx={{
              flex: "1 1 calc(15% - 16px)",
              minWidth: "140px",
              border: "1px solid #e5e7eb",
              borderRadius: 2,
              backgroundColor: stat.bgColor || "#f1fafa",
              px: 2,
              py: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              cursor: "pointer",
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                transform: "scale(1.02)",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={0.5}
            >
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, color: "#555" }}
              >
                {stat.title}
              </Typography>
              <Box>{stat.icon}</Box>
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              {stat.count}
            </Typography>
            <Box display="flex" alignItems="center" mt={0.5}>
              {stat.change.startsWith("+") ? (
                <TrendingUpIcon
                  sx={{ color: "green", fontSize: 18, mr: 0.5 }}
                />
              ) : (
                <TrendingDownIcon
                  sx={{ color: "red", fontSize: 18, mr: 0.5 }}
                />
              )}
              <Typography
                variant="caption"
                sx={{
                  color: stat.change.startsWith("+") ? "green" : "red",
                }}
              >
                {stat.change}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
      <Box sx={{ mt: 1, backgroundColor: "inherit" }}>
        {/* <RecentActivities /> */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              flex: 1,
              border: "1px solid #e5e7eb",
              borderRadius: 2,
              backgroundColor: "#fff",
            }}
          >
            <RecentActivitiesTabs />
          </Box>
          <Box
            sx={{
              flex: 1,
              border: "1px solid #e5e7eb",
              borderRadius: 2,
              backgroundColor: "#fff",
              // maxHeight: "calc(100vh - 200px)",
              overFlowY: "auto",
            }}
          >
            <CreateShortLink />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardPage;

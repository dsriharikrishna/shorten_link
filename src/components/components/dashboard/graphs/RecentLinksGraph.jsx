import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Divider, Chip, Button } from "@mui/material";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const RecentLinksGraph = () => {
  const { id } = useParams();
  const location = useLocation();
  const item = location.state;

  const navigate = useNavigate();

  // Static click data (replace with API in future)
  const clickData = [
    { date: "Jul 01", clicks: 10 },
    { date: "Jul 02", clicks: 25 },
    { date: "Jul 03", clicks: 40 },
    { date: "Jul 04", clicks: 30 },
    { date: "Jul 05", clicks: 50 },
    { date: "Jul 06", clicks: 65 },
    { date: "Jul 07", clicks: 80 },
  ];

  return (
    <Box px={2} py={1}>
      {/* Back Button */}
      <Button
        variant="outlined"
        onClick={() => navigate(-1)}
        sx={{ mb: 1, textTransform: "none" }}
      >
        ← Back
      </Button>
      <Typography variant="h5" fontWeight={600} mb={1} color="primary">
        Analytics for Link ID: {id}
      </Typography>

      {item ? (
        <Box
          sx={{
            backgroundColor: "#fff",
            borderRadius: 2,
            p: 2,
            border: "1px solid #ddd",
            mb: 3,
          }}
        >
          <Typography variant="subtitle1" fontWeight={600} mb={1}>
            Link Details
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Box mb={1}>
            <Typography variant="body2">
              <strong>Short URL:</strong> {item.shortUrl}
            </Typography>
            <Typography variant="body2">
              <strong>Original URL:</strong> {item.originalUrl}
            </Typography>
            <Typography variant="body2">
              <strong>Created At:</strong> {item.createdAt}
            </Typography>
          </Box>

          <Box>
            <Typography variant="body2" fontWeight={500} mb={1}>
              UTM Parameters:
            </Typography>
            {item.utm_params ? (
              <Box display="flex" flexWrap="wrap" gap={1}>
                {Object.entries(item.utm_params).map(([key, val]) => (
                  <Chip key={key} label={`${key}: ${val}`} variant="outlined" />
                ))}
              </Box>
            ) : (
              <Typography variant="body2" color="text.secondary">
                No UTM parameters
              </Typography>
            )}
          </Box>
        </Box>
      ) : (
        <Typography variant="body2" color="error">
          No link data available.
        </Typography>
      )}

      <Box
        sx={{
          backgroundColor: "#fff",
          borderRadius: 2,
          p: 2,
          border: "1px solid #ddd",
        }}
      >
        <Typography variant="subtitle1" fontWeight={600} mb={2}>
          Clicks Over Time
        </Typography>

        <Box height={300}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={clickData}>
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="clicks"
                stroke="#0d9488"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default RecentLinksGraph;

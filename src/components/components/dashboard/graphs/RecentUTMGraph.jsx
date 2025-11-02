// import React from "react";
// import { useLocation, useParams } from "react-router-dom";

// const RecentUTMGraph = () => {
//  const { id } = useParams();
//   const location = useLocation();
//   const item = location.state; 

//   console.log("Current ID:", id);
//   console.log("Passed object:", item);
//   return <div>RecentUTMGraph</div>;
// };

// export default RecentUTMGraph;


import React from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Divider,
  Chip,
  Button,
} from "@mui/material";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const RecentUTMGraph = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const item = location.state;

  // Example static data (replace with API data)
  const utmClickData = [
    { date: "Jul 01", clicks: 5 },
    { date: "Jul 02", clicks: 15 },
    { date: "Jul 03", clicks: 22 },
    { date: "Jul 04", clicks: 18 },
    { date: "Jul 05", clicks: 30 },
    { date: "Jul 06", clicks: 44 },
    { date: "Jul 07", clicks: 55 },
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
        UTM Analytics - ID: {id}
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
            UTM Link Details
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
                No UTM parameters found.
              </Typography>
            )}
          </Box>
        </Box>
      ) : (
        <Typography variant="body2" color="error">
          No UTM data available.
        </Typography>
      )}

      {/* Chart */}
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
            <LineChart data={utmClickData}>
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="clicks"
                stroke="#ef4444"
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

export default RecentUTMGraph;

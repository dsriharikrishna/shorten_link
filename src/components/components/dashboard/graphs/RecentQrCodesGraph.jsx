// import React from "react";
// import { useLocation, useParams } from "react-router-dom";

// const RecentQrCodesGraph = () => {
//   const { id } = useParams();
//   const location = useLocation();
//   const item = location.state; 

//   console.log("Current ID:", id);
//   console.log("Passed object:", item);
//   return <div>RecentQrCodesGraph</div>;
// };

// export default RecentQrCodesGraph;





import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
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

const RecentQrCodesGraph = () => {
  const { id } = useParams();
  const location = useLocation();
  const item = location.state;

  const navigate = useNavigate();
  // Example QR scan analytics data (replace with real API response)
  const scanData = [
    { date: "Jul 01", scans: 12 },
    { date: "Jul 02", scans: 18 },
    { date: "Jul 03", scans: 25 },
    { date: "Jul 04", scans: 40 },
    { date: "Jul 05", scans: 30 },
    { date: "Jul 06", scans: 60 },
    { date: "Jul 07", scans: 75 },
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
        QR Code Analytics - ID: {id}
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
            QR Code Details
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Box mb={1}>
            <Typography variant="body2">
              <strong>QR Code URL:</strong> {item.qrUrl}
            </Typography>
            <Typography variant="body2">
              <strong>Destination URL:</strong> {item.destinationUrl}
            </Typography>
            <Typography variant="body2">
              <strong>Created At:</strong> {item.createdAt}
            </Typography>
          </Box>

          <Box>
            <Typography variant="body2" fontWeight={500} mb={1}>
              Metadata:
            </Typography>
            {item.metadata ? (
              <Box display="flex" flexWrap="wrap" gap={1}>
                {Object.entries(item.metadata).map(([key, val]) => (
                  <Chip key={key} label={`${key}: ${val}`} variant="outlined" />
                ))}
              </Box>
            ) : (
              <Typography variant="body2" color="text.secondary">
                No metadata provided.
              </Typography>
            )}
          </Box>
        </Box>
      ) : (
        <Typography variant="body2" color="error">
          No QR code data available.
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
          Scans Over Time
        </Typography>

        <Box height={300}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={scanData}>
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="scans"
                stroke="#6366f1"
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

export default RecentQrCodesGraph;

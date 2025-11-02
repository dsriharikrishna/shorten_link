import React from "react";
import CustomGrid from "../../UI/CustomGrid";
import { Box } from "@mui/material";
import { Button, Typography } from "@mui/material";

const dummyRows = [
  {
    id: 1,
    shortUrl: "short.ly/abc123",
    originalUrl: "https://example.com/long-url-1",
    createdAt: "2025-06-30",
    clicks: 120,
  },
  {
    id: 2,
    shortUrl: "short.ly/xyz789",
    originalUrl: "https://example.com/long-url-2",
    createdAt: "2025-06-29",
    clicks: 85,
  },
  {
    id: 3,
    shortUrl: "short.ly/test456",
    originalUrl: "https://example.com/long-url-3",
    createdAt: "2025-06-28",
    clicks: 42,
  },
];

const columns = [
  { field: "shortUrl", headerName: "Short URL", flex: 1, minWidth: 150 },
  { field: "originalUrl", headerName: "Original URL", flex: 1, minWidth: 200 },
  { field: "createdAt", headerName: "Created At", flex: 1, minWidth: 120 },
  {
    field: "clicks",
    headerName: "Clicks",
    flex: 1,
    minWidth: 80,
  },
];

const RecentLinksTable = () => {
  return (
    <Box
      sx={{
        width: "100%",
        mx: "auto",
        px: 2,
        py: 1.5,
        borderRadius: 2,
      }}
    >
      {/* headers */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h6">Recent Short Links</Typography>
        <Button
          onClick={() => console.log("View All UTM Links")}
          variant="outlined"
          sx={{
            textTransform: "none",
            color: "#0d9488",
            borderColor: "#0d9488",
            fontWeight: 600,
            fontSize: "0.875rem",
            px: 1,
            py: 0.5,
            borderRadius: "6px",
            backgroundColor: "transparent",
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              backgroundColor: "rgba(13, 148, 136, 0.05)",
              borderColor: "#0d9488",
              color: "#0d9488",
            },
            "&:focus": {
              outline: "none",
              boxShadow: "0 0 0 2px rgba(13, 148, 136, 0.3)",
            },
          }}
        >
          More
        </Button>
      </Box>

      {/* table */}
      <Box
        sx={{
          backgroundColor: "#fff",
          px: 2,
          py: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <CustomGrid
          rows={dummyRows}
          columns={columns}
          pageSize={5}
          checkboxSelection={false}
          disableSelectionOnClick={true}
          sortingOrder={["asc", "desc"]}
          autoHeight
        />
      </Box>
    </Box>
  );
};

export default RecentLinksTable;

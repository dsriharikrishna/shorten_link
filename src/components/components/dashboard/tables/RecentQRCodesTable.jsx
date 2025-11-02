import React from "react";
import CustomGrid from "../../UI/CustomGrid";
import { Box, Typography, Button } from "@mui/material";

const dummyRows = [
  {
    id: 1,
    qrName: "QR: Campaign A",
    linkedUrl: "https://example.com/campaign-a",
    createdAt: "2025-06-30",
    scans: 55,
  },
  {
    id: 2,
    qrName: "QR: Product B",
    linkedUrl: "https://example.com/product-b",
    createdAt: "2025-06-29",
    scans: 32,
  },
  {
    id: 3,
    qrName: "QR: Page C",
    linkedUrl: "https://example.com/page-c",
    createdAt: "2025-06-28",
    scans: 18,
  },
];

const columns = [
  { field: "qrName", headerName: "QR Name", flex: 1, minWidth: 150 },
  { field: "linkedUrl", headerName: "Linked URL", flex: 2, minWidth: 200 },
  { field: "createdAt", headerName: "Created At", flex: 1, minWidth: 120 },
  {
    field: "scans",
    headerName: "Scans",
    flex: 0.5,
    minWidth: 80,
    type: "number",
  },
];

const RecentQRCodesTable = () => {
  return (
    <Box
      sx={{
        width: "100%",
        mx: "auto",

        p: 2,
        borderRadius: 2,
      }}
    >
      {/* headers */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h6">Recent QR Codes</Typography>
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

export default RecentQRCodesTable;

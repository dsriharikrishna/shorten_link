import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import CustomGrid from "../UI/CustomGrid";
import CreateCustomUTMDialog from "../dialogBoxes/CreateCustomUTMDialog";
import EditCustomUTMDialog from "../dialogBoxes/EditCustomUTMDialog";
import DeleteDialog from "../dialogBoxes/DeleteDialog";
import { deleteCampaignThunk } from "../../redux/slicers/cutomizeutmSlice";
import { setRefreshData } from "../../redux/slicers/helperSlice";

const CampaignName = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  // Get raw data from Redux
  const rawData = useSelector((state) => state.customizeutm.data);
  const loading = useSelector((state) => state.customizeutm.urlLoading);
  const userId =
    useSelector((state) => state.auth.user?.id) ||
    localStorage.getItem("userId");

  // Memoized safe array, filtered for names only
  const data = useMemo(
    () =>
      Array.isArray(rawData)
        ? rawData.filter((item) => item.campaign_name)
        : [],
    [rawData]
  );

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState({});
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(isMobile ? 3 : isTablet ? 5 : 10);
  const [rowCount, setRowCount] = useState(0);

  useEffect(() => {
    if (!Array.isArray(data)) return;
    const start = page * pageSize;
    const paginated = data.slice(start, start + pageSize);
    setRows(
      paginated.map((item) => ({
        id: item.id,
        tag: item.campaign_name_tag,
        name: item.campaign_name,
        createdAt: item.created_at,
        updatedAt: item.updated_at,
        uniqueId: item.unique_id,
        userId: item.user_id,
      }))
    );
    setRowCount(data.length);
  }, [data, page, pageSize]);

  useEffect(() => {
    setPageSize(isMobile ? 3 : isTablet ? 5 : 10);
    setPage(0);
  }, [isMobile, isTablet]);

  const handleOpenDialog = useCallback(() => setDialogOpen(true), []);
  const handleCloseDialog = useCallback(() => setDialogOpen(false), []);
  const handleEditOpen = useCallback(() => setEditOpen(true), []);
  const handleEditClose = useCallback(() => {
    setEditOpen(false);
    setSelectedRowData({});
  }, []);
  const handleDeleteOpen = useCallback(() => setDeleteOpen(true), []);
  const handleDeleteClose = useCallback(() => {
    setDeleteOpen(false);
    setSelectedRowData({});
  }, []);

  const handleEdit = useCallback(
    (row) => {
      setSelectedRowData(row);
      handleEditOpen();
    },
    [handleEditOpen]
  );

  const handleDelete = useCallback(
    (row) => {
      setSelectedRowData(row);
      handleDeleteOpen();
    },
    [handleDeleteOpen]
  );

  const handleDialogSubmit = useCallback((formData) => {
    console.log("Submitted data:", formData);
    setDialogOpen(false);
    setEditOpen(false);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    const payload = {
      entity_type: "name",
      user_id: userId,
      unique_id: selectedRowData.uniqueId,
    };
    try {
      const response = await dispatch(deleteCampaignThunk(payload)).unwrap();
      if (response?.details?.status === "success") {
        toast.success(
          response?.details?.message || "Campaign name deleted successfully"
        );
        handleDeleteClose();
        setTimeout(() => {
          dispatch(setRefreshData(true));
        }, 1000);
      } else {
        toast.error("Failed to delete campaign name");
      }
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete campaign name");
    }
  }, [dispatch, selectedRowData, userId, handleDeleteClose]);

  const columns = [
    {
      field: "uniqueId",
      headerName: "Unique ID",
      width: isMobile ? 80 : isTablet ? 100 : 120,
      hide: isMobile,
      renderCell: (params) => (
        <Typography
          variant={isMobile ? "caption" : "body2"}
          noWrap
          sx={{
            fontSize: isMobile ? "0.75rem" : isTablet ? "0.8rem" : "0.875rem",
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "tag",
      headerName: "Campaign Tag",
      flex: 1,
      minWidth: isMobile ? 100 : isTablet ? 120 : 150,
      renderCell: (params) => (
        <Typography
          variant={isMobile ? "caption" : "body2"}
          noWrap
          sx={{
            color: "#0d9488",
            fontWeight: 500,
            fontSize: isMobile ? "0.75rem" : isTablet ? "0.8rem" : "0.875rem",
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "name",
      headerName: "Campaign Name",
      flex: 1,
      minWidth: isMobile ? 100 : isTablet ? 120 : 150,
      renderCell: (params) => (
        <Typography
          variant={isMobile ? "caption" : "body2"}
          noWrap
          sx={{
            fontSize: isMobile ? "0.75rem" : isTablet ? "0.8rem" : "0.875rem",
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
      minWidth: isMobile ? 80 : isTablet ? 100 : 120,
      hide: isMobile,
      renderCell: (params) => (
        <Typography
          variant={isMobile ? "caption" : "body2"}
          noWrap
          sx={{
            fontSize: isMobile ? "0.75rem" : isTablet ? "0.8rem" : "0.875rem",
          }}
        >
          {new Date(params.value).toLocaleString()}
        </Typography>
      ),
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      flex: 1,
      minWidth: isMobile ? 80 : isTablet ? 100 : 120,
      hide: isMobile,
      renderCell: (params) => (
        <Typography
          variant={isMobile ? "caption" : "body2"}
          noWrap
          sx={{
            fontSize: isMobile ? "0.75rem" : isTablet ? "0.8rem" : "0.875rem",
          }}
        >
          {new Date(params.value).toLocaleString()}
        </Typography>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: isMobile ? 80 : isTablet ? 100 : 120,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            gap: isMobile ? 0.5 : 1,
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Tooltip title="Edit">
            <IconButton
              onClick={() => handleEdit(params.row)}
              size={isMobile ? "small" : "medium"}
              color="primary"
              sx={{
                padding: isMobile ? "4px" : "8px",
                "& .MuiSvgIcon-root": {
                  fontSize: isMobile ? "1rem" : "1.25rem",
                },
              }}
            >
              <EditIcon fontSize={isMobile ? "small" : "medium"} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              onClick={() => handleDelete(params.row)}
              size={isMobile ? "small" : "medium"}
              color="error"
              sx={{
                padding: isMobile ? "4px" : "8px",
                "& .MuiSvgIcon-root": {
                  fontSize: isMobile ? "1rem" : "1.25rem",
                },
              }}
            >
              <DeleteIcon fontSize={isMobile ? "small" : "medium"} />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        py: 0,
        borderRadius: { xs: 0.5, sm: 1, md: 1.5 },
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "stretch", sm: "center" },
          gap: { xs: 1, sm: 0 },
          mb: { xs: 1, sm: 1.5, md: 2 },
          px: { xs: 1, sm: 2, md: 2 },
        }}
      >
        <Typography
          variant={isMobile ? "h6" : isTablet ? "h5" : "h4"}
          fontWeight={600}
          sx={{
            fontSize: {
              xs: "1.125rem",
              sm: "1.25rem",
            },
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          Campaign Name
        </Typography>
        <Button
          onClick={handleOpenDialog}
          variant="outlined"
          fullWidth={isMobile}
          size="small"
          sx={{
            textTransform: "none",
            color: "#0d9488",
            borderColor: "#0d9488",
            fontWeight: 600,
            fontSize: {
              xs: "0.75rem",
              sm: "0.8rem",
              md: "0.875rem",
            },
            px: { xs: 1.5, sm: 2, md: 2.5 },
            py: { xs: 0.75 },
            borderRadius: "6px",
            backgroundColor: "transparent",
            transition: "all 0.2s ease-in-out",
            minWidth: { xs: "auto", sm: "fit-content" },
            "&:hover": {
              backgroundColor: "#0d948810",
            },
          }}
        >
          {isMobile ? "Add Name" : "Add Campaign Name"}
        </Button>
      </Box>

      {/* Grid */}
      <Box
        sx={{
          px: { xs: 0.5, sm: 1, md: 2 },
          minHeight: { xs: "250px", sm: "300px", md: "300px" },
          height: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: { xs: 3, sm: 4, md: 5 },
              minHeight: { xs: "250px", sm: "300px", md: "400px" },
            }}
          >
            <CircularProgress size={isMobile ? 32 : isTablet ? 40 : 48} />
          </Box>
        ) : rows.length === 0 ? (
          <Typography
            sx={{
              textAlign: "center",
              mt: { xs: 3, sm: 4, md: 5 },
              fontSize: {
                xs: "0.875rem",
                sm: "1rem",
                md: "1.125rem",
              },
              color: "text.secondary",
            }}
          >
            No data found
          </Typography>
        ) : (
          <Box
            sx={{
              minHeight: { xs: "250px" },
              height: "100%",
              width: "100%",
              overflow: "hidden",
            }}
          >
            <CustomGrid
              rows={rows}
              columns={columns}
              rowCount={rowCount}
              paginationMode="server"
              pageSizeOptions={
                isMobile ? [3, 5] : isTablet ? [5, 10] : [5, 10, 20]
              }
              paginationModel={{ page, pageSize }}
              onPaginationModelChange={({ page, pageSize }) => {
                setPage(page);
                setPageSize(pageSize);
              }}
              sx={{
                "& .MuiDataGrid-root": {
                  fontSize: {
                    xs: "0.75rem",
                    sm: "0.8rem",
                    md: "0.875rem",
                  },
                },
                "& .MuiDataGrid-columnHeaders": {
                  fontSize: {
                    xs: "0.75rem",
                    sm: "0.8rem",
                    md: "0.875rem",
                  },
                },
                "& .MuiDataGrid-cell": {
                  fontSize: {
                    xs: "0.75rem",
                    sm: "0.8rem",
                    md: "0.875rem",
                  },
                },
              }}
            />
          </Box>
        )}
      </Box>

      {/* Dialogs */}
      <CreateCustomUTMDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        mode="name"
        onSubmit={handleDialogSubmit}
      />

      <EditCustomUTMDialog
        open={editOpen}
        onClose={handleEditClose}
        onSubmit={handleDialogSubmit}
        initialData={selectedRowData}
        mode="name"
      />

      <DeleteDialog
        open={deleteOpen}
        onClose={handleDeleteClose}
        onConfirm={handleConfirmDelete}
      />
    </Box>
  );
};

export default CampaignName;

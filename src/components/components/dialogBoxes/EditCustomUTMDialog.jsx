import React, { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  IconButton,
  Typography,
  TextField,
  InputLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { polishedStandardStyles } from "../../styles/InputStyles";
import { editCampaignThunk } from "../../redux/slicers/cutomizeutmSlice";
import { setRefreshData } from "../../redux/slicers/helperSlice";
import { toast } from "react-toastify";

const getFieldProps = (mode) => {
  switch (mode) {
    case "source":
      return {
        label: "Campaign Source",
        placeholder: "Enter campaign source",
        name: "source",
        tagLabel: "Source Tag",
      };
    case "medium":
      return {
        label: "Campaign Medium",
        placeholder: "Enter campaign medium",
        name: "medium",
        tagLabel: "Medium Tag",
      };
    case "name":
      return {
        label: "Campaign Name",
        placeholder: "Enter campaign name",
        name: "name",
        tagLabel: "Name Tag",
      };
    default:
      return {
        label: "Value",
        placeholder: "Enter value",
        name: "value",
        tagLabel: "Tag",
      };
  }
};

const EditCustomUTMDialog = ({
  open,
  onClose,
  mode,
  onSubmit,
  initialData,
}) => {
  const fieldProps = getFieldProps(mode);
  const [form, setForm] = useState({ [fieldProps.name]: "", tag: "" });
  const [loading, setLoading] = useState(false);

  const data = useSelector((state) => state.auth.data);
  const userId = localStorage.getItem("userId") || data?.userId || "1";
  const dispatch = useDispatch();

  useEffect(() => {
    if (initialData) {
      setForm({
        [fieldProps.name]: initialData[fieldProps.name] || "",
        tag: initialData.tag || "",
      });
    }
  }, [initialData, mode]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);

      const entity_type = mode;
      const unique_id = initialData.uniqueId || initialData.unique_id;
      const user_id = userId;

      const payload = {
        user_id: userId,
        campaign_tag: form.tag,
        campaign_name: form[fieldProps.name],
      };

      try {
        const response = await dispatch(
          editCampaignThunk({ entity_type, user_id, unique_id, payload })
        ).unwrap();

        console.log("response", response);
        if (response.details.status === "success") {
          toast.success(
            response.details.message || "Campaign updated successfully"
          );

          setTimeout(() => {
            dispatch(setRefreshData(true));
            setForm({});
          }, 1000);
          onClose();
        } else {
          toast.error(response.details.message);
        }

        console.log("Update success:", response);
      } catch (error) {
        console.error("Update error:", error);
      } finally {
        setLoading(false);
      }
    },
    [form, dispatch, fieldProps.name, onSubmit]
  );

  return (
    <>
      <style>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(-15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scalePop {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .fade-dialog {
          animation: fadeSlideIn 0.35s ease-out;
        }

        .pop-close {
          animation: scalePop 0.35s ease-in-out;
        }
      `}</style>

      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="xs"
        className="fade-dialog"
        sx={{
          "& .MuiDialog-paper": {
            width: "100%",
            borderRadius: 1,
            px: 1,
            py: 1,
            backgroundColor: "#fefefe",
          },
        }}
      >
        <DialogTitle>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid #e0e0e0",
              pb: 1,
              width: "100%",
            }}
          >
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "1.25rem",
                color: "#0d9488",
                textTransform: "capitalize",
              }}
            >
              Edit {fieldProps.label}
            </Typography>
            <IconButton onClick={onClose} size="small" className="pop-close">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <DialogContent sx={{ py: 1 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Box>
                <InputLabel shrink htmlFor={fieldProps.name}>
                  {fieldProps.label}
                </InputLabel>
                <TextField
                  id={fieldProps.name}
                  name={fieldProps.name}
                  variant="standard"
                  value={form[fieldProps.name]}
                  onChange={handleChange}
                  placeholder={fieldProps.placeholder}
                  required
                  size="small"
                  fullWidth
                  sx={{ mb: 1, ...polishedStandardStyles }}
                  InputProps={{ style: { fontWeight: 500 } }}
                />
              </Box>

              <Box>
                <InputLabel shrink htmlFor="tag">
                  {fieldProps.tagLabel}
                </InputLabel>
                <TextField
                  id="tag"
                  name="tag"
                  variant="standard"
                  value={form.tag}
                  onChange={handleChange}
                  placeholder={`Enter ${fieldProps.tagLabel.toLowerCase()}`}
                  required
                  size="small"
                  fullWidth
                  sx={{ mb: 1, ...polishedStandardStyles }}
                  InputProps={{ style: { fontWeight: 500 } }}
                />
              </Box>
            </Box>
          </DialogContent>

          <DialogActions
            sx={{
              px: 2.5,
              py: 1,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              onClick={onClose}
              variant="outlined"
              sx={{
                textTransform: "none",
                mr: 1,
                borderRadius: 1.5,
                color: "#0d9488",
                borderColor: "#0d9488",
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                textTransform: "none",
                borderRadius: 1.5,
                backgroundColor: "#0d9488",
                "&:hover": { backgroundColor: "#0f766e" },
              }}
            >
              {loading ? "Updating..." : "Update"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default EditCustomUTMDialog;

import * as React from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Box,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { polishedStandardStyles } from "../../styles/InputStyles";
import { updateSlugThunk } from "../../redux/slicers/dashboardSlice";

export default function AddSlug({ open, onClose, longUrl, onSlugUpdated }) {
  const [slug, setSlug] = React.useState("");
  const [newDomain, setNewDomain] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!slug.trim()) {
      setError("Please enter a slug");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const slugOnly = longUrl.split("/").pop();
      const oldDomain = longUrl.split("/")[2];
      const finalDomain = newDomain.trim() ? newDomain.trim() : oldDomain;
      const short_code = slugOnly;

      const payload = {
        old_domain: oldDomain,
        new_slug: slug,
        new_domain: newDomain.trim(),
      };

      console.log("payload", payload);

      const response = await dispatch(
        updateSlugThunk({ payload, short_code })
      ).unwrap();

      console.log(response);

      const newShortUrl = `https://${finalDomain}/${slug}`;
      toast.success("Slug/domain updated successfully!");
      onSlugUpdated(newShortUrl);
      onClose();
    } catch (err) {
      setError(err.message || "Failed to update slug/domain");
      toast.error(err.message || "Failed to update slug/domain");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        component: "form",
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        Enter Your Slug & Domain
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Box mt={1}>
          <Typography variant="body2">
            You can update your short URL slug and optionally set a new domain.
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        <InputLabel>Custom Slug</InputLabel>
        <TextField
          autoFocus
          required
          margin="dense"
          id="slug"
          name="slug"
          type="text"
          fullWidth
          variant="standard"
          sx={polishedStandardStyles}
          placeholder="e.g., my-custom-slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          disabled={loading}
        />

        <Box mt={2} />

        <InputLabel>New Domain (optional)</InputLabel>
        <TextField
          margin="dense"
          id="newDomain"
          name="newDomain"
          type="text"
          fullWidth
          variant="standard"
          sx={polishedStandardStyles}
          placeholder="e.g., customdomain.com"
          value={newDomain}
          onChange={(e) => setNewDomain(e.target.value)}
          disabled={loading}
        />

        {error && (
          <Typography color="error" variant="body2" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}
      </DialogContent>

      <DialogActions sx={{ pr: 3, pb: 2 }}>
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          onClick={handleSubmit}
          sx={{
            textTransform: "none",
            fontWeight: 500,
            backgroundColor: "white",
            color: "#1976d2",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "#f0f0f0",
              boxShadow: "none",
            },
          }}
        >
          {loading ? <CircularProgress size={20} /> : "Update URL"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

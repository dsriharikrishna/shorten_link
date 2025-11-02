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
import updateShortUrl from "../../redux/slicers/dashboardSlice"; // Unified thunk
import { toast } from "react-toastify";
import { polishedStandardStyles } from "../../styles/InputStyles"; // <-- import styles

export default function AddDomain({ open, onClose, shortUrl, onDomainUpdated }) {
  const [domain, setDomain] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!domain.trim()) {
      setError("Please enter a domain");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const short_code = shortUrl.split("/").pop();     // extract slug
      const old_domain = shortUrl.split("/")[2];         // extract domain (host)

      // Defensive: ensure all required fields are present
      if (!short_code || !old_domain || !domain.trim()) {
        setError("Invalid input. Please check the domain and try again.");
        setLoading(false);
        return;
      }

      const queryPayload = {
        short_code,
        old_domain,
        new_domain: domain.trim()
      };

      console.log("Domain update payload:", queryPayload);
      const res = await dispatch(updateShortUrl(queryPayload)).unwrap();
      console.log("Domain update response:", res);

      if (res && (res.details?.short_url || res.short_url)) {
        const newShortUrl = res.details?.short_url || res.short_url;
        toast.success("Domain updated successfully!");
        onDomainUpdated(newShortUrl);
        onClose();
      } else {
        throw new Error("Domain update failed. No short_url returned.");
      }
    } catch (err) {
      const message =
        err?.detail || err?.message || "Domain update failed. Try again.";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ component: "form", onSubmit: handleSubmit }}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        Enter Domain
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
            Enter a custom domain for your short URL (e.g., example.com).
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        <InputLabel>Custom Domain</InputLabel>
        <TextField
          autoFocus
          required
          margin="dense"
          id="domain"
          name="domain"
          type="text"
          fullWidth
          variant="standard"
          sx={polishedStandardStyles}
          placeholder="e.g., mydomain.com"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
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
          {loading ? <CircularProgress size={20} /> : "Update Domain"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

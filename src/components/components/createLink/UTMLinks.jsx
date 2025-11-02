import React, { use, useCallback, useEffect, useState } from "react";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
  Snackbar,
  Alert,
  FormHelperText,
  Checkbox,
} from "@mui/material";
import { brandColor, polishedStandardStyles } from "../../styles/InputStyles";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  getUtmBuilderData,
  postUTMBuilderData,
} from "../../redux/slicers/dashboardSlice.jsx";

const UTMLinks = () => {
  const [form, setForm] = useState({
    url: "",
    compaign_id: "",
    utm_source: "",
    utm_medium: "",
    utm_campaign: [],
    utm_add_units: "1",
    utm_term: "",
    utm_content: "",
  });
  const [errors, setErrors] = useState({});
  const [generatedLink, setGeneratedLink] = useState("");
  const [utmDropdowns, setUtmDropdowns] = useState({
    utm_source: [],
    utm_medium: [],
    utm_campaign: [],
  });
  const [copied, setCopied] = useState(false);

  const userId = localStorage.getItem("userId");
  const device_id = localStorage.getItem("device_id") || "";

  const dispatch = useDispatch();

  const fetchBuilderUtmsData = useCallback(async () => {
    const payload = {
      user_id: userId,
    };

    try {
      const response = await dispatch(getUtmBuilderData(payload)).unwrap();
      setUtmDropdowns({
        utm_source: response?.details.sources,
        utm_medium: response?.details.mediums,
        utm_campaign: response?.details.names,
      });
    } catch (e) {
      console.error(e);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchBuilderUtmsData();
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "utm_campaign") {
      setForm((prev) => ({
        ...prev,
        [name]: typeof value === "string" ? value.split(",") : value,
      }));
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const validateFields = () => {
    const newErrors = {};
    if (!form.url) {
      newErrors.url = "Please enter the website URL";
    } else if (!validateUrl(form.url)) {
      newErrors.url = "Please enter a valid URL";
    }
    if (!form.compaign_id) {
      newErrors.compaign_id = "Please enter the campaign id";
    }
    if (!form.utm_source) {
      newErrors.utm_source = "Please select the UTM source";
    }
    if (!form.utm_medium) {
      newErrors.utm_medium = "Please select the UTM medium";
    }
    if (!form.utm_campaign || form.utm_campaign.length === 0) {
      newErrors.utm_campaign = "Please select at least one UTM campaign";
    }
    if (!form.utm_add_units) {
      if (!Boolean(userId))
        newErrors.utm_add_units = "you can  only select only one unit";
      newErrors.utm_add_units = "Please enter the UTM add units";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGenerate = useCallback(async () => {
    if (!validateFields()) {
      return;
    }

    const payload = {
      user_id: userId,
      campaign_id: form.compaign_id,
      main_url: form.url,
      campaign_term: form.utm_term,
      campaign_content: form.utm_content,
      compaign_units: parseInt(form.utm_add_units),
      campaign_source: [form.utm_source],
      campaign_medium: [form.utm_medium],
      campaign_name: form.utm_campaign,
    };

    try {
      const response = await dispatch(
        postUTMBuilderData({ device_id, payload })
      ).unwrap();
      setGeneratedLink(response.short_url);
    } catch (error) {
      toast.error("Failed to generate link");
      console.error(error);
    }
  }, [form, dispatch]);

  const handleCopy = async () => {
    if (generatedLink) {
      try {
        await navigator.clipboard.writeText(generatedLink);
        setCopied(true);
      } catch (err) {
        toast.error("Failed to copy link to clipboard");
      }
    }
  };

  const handleReset = () => {
    setForm({
      url: "",
      compaign_id: "",
      utm_source: "",
      utm_medium: "",
      utm_campaign: [],
      utm_add_units: "",
      utm_term: "",
      utm_content: "",
    });
    setErrors({});
    setGeneratedLink("");
  };

  return (
    <Box sx={{ px: 2, py: 1, mx: "auto" }}>
      <Typography
        variant="h6"
        fontWeight={700}
        mb={1}
        sx={{ color: brandColor.primary }}
      >
        UTM Link Builder
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          flex: 1,
          gap: 1,
        }}
      >
        <TextField
          variant="standard"
          label="Website URL*"
          name="url"
          size="small"
          value={form.url}
          onChange={handleChange}
          fullWidth
          margin="normal"
          sx={{ ...polishedStandardStyles, flex: 1 }}
          placeholder="https://example.com"
          error={!!errors.url}
          helperText={errors.url}
        />

        <TextField
          variant="standard"
          label="Campaign Id*"
          name="compaign_id"
          size="small"
          value={form.compaign_id}
          onChange={handleChange}
          fullWidth
          margin="normal"
          sx={{ ...polishedStandardStyles, flex: 1 }}
          placeholder="Enter your campaign id"
          error={!!errors.compaign_id}
          helperText={errors.compaign_id}
        />
      </Box>

      {/* Row: Source + Medium */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 1,
        }}
      >
        <FormControl
          fullWidth
          margin="normal"
          variant="standard"
          size="small"
          sx={polishedStandardStyles}
          error={!!errors.utm_source}
        >
          <InputLabel>UTM Source*</InputLabel>
          <Select
            name="utm_source"
            value={form.utm_source}
            onChange={handleChange}
            error={!!errors.utm_source}
          >
            {utmDropdowns.utm_source.map((item) => (
              <MenuItem key={item.campaign_source_tag} value={item?.unique_id}>
                {item.campaign_source_tag} ({item.campaign_source_name})
              </MenuItem>
            ))}
          </Select>
          {!!errors.utm_source && (
            <FormHelperText>{errors.utm_source}</FormHelperText>
          )}
        </FormControl>

        <FormControl
          fullWidth
          margin="normal"
          variant="standard"
          size="small"
          sx={polishedStandardStyles}
          error={!!errors.utm_medium}
        >
          <InputLabel>UTM Medium*</InputLabel>
          <Select
            name="utm_medium"
            value={form.utm_medium}
            onChange={handleChange}
            error={!!errors.utm_medium}
          >
            {utmDropdowns.utm_medium.map((item) => (
              <MenuItem key={item.campaign_medium_tag} value={item?.unique_id}>
                {item.campaign_medium_tag} ({item.campaign_medium_name})
              </MenuItem>
            ))}
          </Select>
          {!!errors.utm_medium && (
            <FormHelperText>{errors.utm_medium}</FormHelperText>
          )}
        </FormControl>
      </Box>

      {/* Row: Campaign + Term */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          flex: 1,
          gap: 1,
        }}
      >
        <FormControl
          fullWidth
          margin="normal"
          variant="standard"
          size="small"
          sx={{ ...polishedStandardStyles, flex: 1 }}
          error={!!errors.utm_campaign}
        >
          <InputLabel>UTM Campaign*</InputLabel>
          <Select
            name="utm_campaign"
            multiple
            value={form.utm_campaign}
            onChange={handleChange}
            error={!!errors.utm_campaign}
            renderValue={(selected) =>
              Array.isArray(selected)
                ? selected
                    .map(
                      (id) =>
                        utmDropdowns.utm_campaign.find(
                          (item) => item.unique_id === id
                        )?.campaign_name_tag || id
                    )
                    .join(", ")
                : ""
            }
          >
            {utmDropdowns.utm_campaign.map((item) => (
              <MenuItem key={item.campaign_name_tag} value={item?.unique_id}>
                <Checkbox
                  checked={form.utm_campaign.indexOf(item.unique_id) > -1}
                />
                {item.campaign_name_tag} ({item.campaign_name_name})
              </MenuItem>
            ))}
          </Select>
          {!!errors.utm_campaign && (
            <FormHelperText>{errors.utm_campaign}</FormHelperText>
          )}
        </FormControl>

        <Box sx={{ flex: 1 }}>
          <TextField
            variant="standard"
            type="number"
            label="UTM Add Units"
            name="utm_add_units"
            value={userId ? form.utm_add_units : "1"}
            onChange={handleChange}
            inputProps={{ min: 1, max: Boolean(userId) ? 5 : 1 }}
            fullWidth
            size="small"
            margin="normal"
            sx={polishedStandardStyles}
            disabled={!Boolean(userId)}
            helperText={
              !!errors.utm_add_units
                ? errors.utm_add_units
                : !Boolean(userId)
                ? "Only 1 unit allowed for guests. Login to add more."
                : ""
            }
            error={!!errors.utm_add_units}
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 1,
        }}
      >
        <TextField
          variant="standard"
          label="UTM Term (optional)"
          name="utm_term"
          value={form.utm_term}
          onChange={handleChange}
          fullWidth
          size="small"
          margin="normal"
          sx={polishedStandardStyles}
        />

        <TextField
          variant="standard"
          label="UTM Content (optional)"
          name="utm_content"
          value={form.utm_content}
          onChange={handleChange}
          fullWidth
          margin="normal"
          size="small"
          multiline
          minRows={1}
          sx={polishedStandardStyles}
        />
      </Box>

      {/* Generated Link Preview */}
      {generatedLink && (
        <Box
          mt={2}
          p={2}
          bgcolor={brandColor.background}
          borderRadius={2}
          border="1px solid #ccc"
        >
          <Typography variant="body2" fontWeight={500}>
            Generated Link:
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ wordBreak: "break-all" }}
          >
            {generatedLink}
          </Typography>
        </Box>
      )}

      {/* Buttons */}
      <Box mt={2} display="flex" gap={2} flexWrap="wrap">
        <Button
          variant="contained"
          onClick={handleGenerate}
          size="small"
          sx={{
            textTransform: "none",
            backgroundColor: brandColor.primary,
            "&:hover": { backgroundColor: brandColor.primary },
          }}
        >
          Generate Link
        </Button>
        <Button
          variant="outlined"
          onClick={handleCopy}
          size="small"
          disabled={!generatedLink}
          sx={{
            textTransform: "none",
            borderColor: brandColor.primary,
            color: brandColor.primary,
            backgroundColor: "#f0fdfa",
            "&:hover": {
              backgroundColor: "#ccfbf1",
              borderColor: brandColor.primary,
            },
          }}
        >
          Copy
        </Button>
        <Button
          variant="outlined"
          size="small"
          onClick={handleReset}
          sx={{
            textTransform: "none",
            border: "1px solid #fca5a5",
            color: "#b91c1c",
            backgroundColor: "#fef2f2",
            "&:hover": {
              backgroundColor: "#fee2e2",
              borderColor: "#f87171",
            },
          }}
        >
          Reset
        </Button>
      </Box>

      {/* Copy Snackbar */}
      <Snackbar
        open={copied}
        autoHideDuration={2000}
        onClose={() => setCopied(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setCopied(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Copied to clipboard!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UTMLinks;

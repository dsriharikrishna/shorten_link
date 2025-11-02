import { useState } from "react";
import { useDispatch } from "react-redux";
import { shortenUrl, getClickCount } from "../../redux/slicers/dashboardSlice";
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  Link,
} from "@mui/material";
import { Copy, Check } from "lucide-react";
import { toast } from "react-toastify";
import AddSlug from "../dialogBoxes/AddSlug";
import AddDomain from "../dialogBoxes/AddDomain";
import { polishedStandardStyles } from "../../styles/InputStyles";
import { useNavigate } from "react-router-dom";

const ShortUrl = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [showSlugModal, setShowSlugModal] = useState(false);
  const [showDomainModal, setShowDomainModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const device_id = localStorage.getItem("device_id");
  const user_id = localStorage.getItem("userId");

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleShorten = async () => {
    if (!isValidUrl(longUrl)) {
      toast.error("Please enter a valid URL");
      return;
    }

    const payload = {
      main_url: longUrl,
      device_id,
      user_id,
      custom_domain: "",
    };

    try {
      setIsLoading(true);
      setErrorMessage("");
      const res = await dispatch(shortenUrl(payload)).unwrap();
      if (
        res?.status_code === 403 ||
        res?.details?.detail === "API usage limit exceeded"
      ) {
        toast.error("API usage limit exceeded");
        navigate("/pricing");
        return;
      }
      const short = res?.details?.short_url;

      if (short) {
        setShortUrl(short);
        setClickCount(null);
        toast.success("URL shortened successfully!");
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (err) {
      if (
        err?.status_code === 403 ||
        err?.details?.detail === "API usage limit exceeded"
      ) {
        toast.error("API usage limit exceeded");
        navigate("/pricing");
        return;
      }
      const errorMsg = err.message || "Failed to shorten URL.";
      setErrorMessage(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Copy failed");
    }
  };

  const handleClickCount = async () => {
    if (!shortUrl) return;

    const urlObj = new URL(shortUrl);
    const code = urlObj.pathname.split("/").pop(); 
    const domain = urlObj.hostname; 

    const payload = {
      short_code: code,
      user_id,
      domain,
    };

    console.log("payload", payload);

    try {
      const res = await dispatch(getClickCount(payload)).unwrap();
      console.log("res", res);
      if (res?.status_code === 403) {
        toast.error("API usage limit exceeded");
        navigate("/pricing");
        return;
      }
      setClickCount(res?.clicks || 0);
    } catch {
      toast.error("Click count error");
    }
  };

  return (
    <Box sx={{ p: 2, backgroundColor: "#fff", borderRadius: 2, mx: "auto" }}>
      <Typography
        variant="h6"
        fontWeight={700}
        mb={1}
        sx={{ color: "#0d9488" }}
      >
        Shorten URL
      </Typography>

      <TextField
        variant="standard"
        label="Enter long URL"
        fullWidth
        value={longUrl}
        size="small"
        onChange={(e) => setLongUrl(e.target.value)}
        sx={{ mb: 2, ...polishedStandardStyles }}
      />

      <Button
        variant="contained"
        onClick={handleShorten}
        disabled={isLoading}
        fullWidth
        size="small"
        sx={{
          backgroundColor: "#009688",
          textTransform: "none",
          "&:hover": {
            backgroundColor: "#00796B",
          },
          mb: 2,
        }}
      >
        {isLoading ? "Shortening..." : "Shorten URL"}
      </Button>

      {errorMessage && (
        <Typography color="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Typography>
      )}

      {shortUrl && (
        <>
          <Box
            sx={{
              mt: 2,
              background: "#f8fafc",
              p: 2,
              borderRadius: "0.5rem",
              border: "1px solid #d1d5db",
            }}
          >
            <Typography
              variant="h6"
              fontWeight={700}
              mb={1}
              sx={{ color: "#0d9488" }}
            >
              Your Shortened URL
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "0.5rem",
                mb: 1.5,
              }}
            >
              <Link
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: "#1d4ed8",
                  textDecoration: "underline",
                  wordBreak: "break-all",
                  fontWeight: 500,
                  fontSize: "0.95rem",
                  flex: 1,
                  mr: 1,
                }}
              >
                {shortUrl}
              </Link>
              <IconButton
                onClick={handleCopy}
                size="small"
                sx={{
                  p: "0.4rem",
                  borderRadius: "0.375rem",
                  "&:hover": { backgroundColor: "#e5e7eb" },
                }}
              >
                {copied ? (
                  <Check size={18} color="green" />
                ) : (
                  <Copy size={18} />
                )}
              </IconButton>
            </Box>

            {Boolean(user_id) && (
              <Button
                variant="outlined"
                onClick={handleClickCount}
                fullWidth
                size="small"
                sx={{
                  mb: 1,
                  height: "37px",
                  textTransform: "none",
                  fontWeight: 500,
                  fontSize: "0.95rem",
                  borderRadius: "8px",
                }}
              >
                Show Click Count
              </Button>
            )}

            {clickCount !== null && (
              <Typography
                variant="body2"
                sx={{
                  mt: 1,
                  fontWeight: 600,
                  color: "#1e3a8a",
                }}
              >
                Click Count: {clickCount}
              </Typography>
            )}

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: "1rem",
                mt: 2,
              }}
            >
              <Button
                onClick={() => setShowSlugModal(true)}
                size="small"
                sx={{
                  flex: 1,
                  height: "37px",
                  textTransform: "none",
                  fontWeight: "bold",
                  fontSize: "0.95rem",
                  borderRadius: "8px",
                  padding: "0.5rem 1rem",
                  color: "#1976d2",
                }}
              >
                Add Your Slug
              </Button>
              {/* <Button
                onClick={() => setShowDomainModal(true)}
                size="small"
                sx={{
                  flex: 1,
                  height: "37px",
                  textTransform: "none",
                  fontWeight: "bold",
                  fontSize: "0.95rem",
                  borderRadius: "8px",
                  padding: "0.5rem 1rem",
                  color: "#1976d2",
                }}
              >
                Add Domain
              </Button> */}
            </Box>
          </Box>

          {/* Social Share Buttons
          <Box
            sx={{
              flex: 1,
              width: "100%",
              background: "#ffffff",
              borderRadius: "8px",
              mt: 2,
            }}
          >
            <SocialShareButtons />
          </Box> */}
        </>
      )}

      {/* Slug & Domain Modals */}
      <AddSlug
        open={showSlugModal}
        onClose={() => setShowSlugModal(false)}
        longUrl={shortUrl}
        onSlugUpdated={(newShortUrl) => setShortUrl(newShortUrl)}
      />
      {/* <AddDomain
        open={showDomainModal}
        onClose={() => setShowDomainModal(false)}
        shortUrl={shortUrl}
        onDomainUpdated={(newShortUrl) => setShortUrl(newShortUrl)}
      /> */}
    </Box>
  );
};

export default ShortUrl;

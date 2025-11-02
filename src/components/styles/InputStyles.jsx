const brandColor = {
  primary: "#009688",
  secondary: "#4CAF50",
  background: "#f5f5f5",
};

const polishedStandardStyles = {
  "& .MuiInput-root": {
    borderBottom: `1px solid ${brandColor.secondary}`,
    fontSize: "0.875rem",
    transition: "border-color 0.3s ease",
    "&:hover": {
      borderBottom: `1px solid ${brandColor.primary}`,
    },
    "&.Mui-focused": {
      borderBottom: `1px solid ${brandColor.primary}`,
    },
  },
  "& .MuiInput-underline:before": {
    borderBottom: `1px solid ${brandColor.secondary}`,
  },
  "& .MuiInput-underline:hover:before": {
    borderBottom: `1px solid ${brandColor.primary} !important`,
  },
  "& .MuiInput-underline:after": {
    borderBottom: `1px solid ${brandColor.primary}`,
  },
  "& .MuiInputLabel-root": {
    fontSize: "0.875rem",
    color: "#4b5563",
  },
  "& label.Mui-focused": {
    color: brandColor.primary,
  },
};

export { polishedStandardStyles, brandColor };

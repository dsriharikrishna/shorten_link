import React from "react";
import { Box, Button, Typography } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const platforms = [
  {
    name: "Twitter",
    color: "#1DA1F2",
    icon: <TwitterIcon fontSize="small" />,
  },
  {
    name: "Facebook",
    color: "#1877F3",
    icon: <FacebookIcon fontSize="small" />,
  },
  {
    name: "LinkedIn",
    color: "#0077B5",
    icon: <LinkedInIcon fontSize="small" />,
  },
  {
    name: "WhatsApp",
    color: "#25D366",
    icon: <WhatsAppIcon fontSize="small" />,
  },
];

const SocialShareButtons = () => {
  return (
    <Box mb={4}>
      <Typography variant="subtitle1" mb={1} color="white">
        Share on Social Media
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={1}>
        {platforms.map(({ name, color, icon }) => (
          <Button
            key={name}
            size="small"
            variant="contained"
            startIcon={icon}
            sx={{
              backgroundColor: color,
              color: "#fff",
              textTransform: "none",
              fontWeight: 500,
              borderRadius: 1.5,
              px: 1.5,
              py: 1,
              minWidth: 100,
              "&:hover": {
                backgroundColor: color,
                opacity: 0.9,
              },
            }}
          >
            {name}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default SocialShareButtons;

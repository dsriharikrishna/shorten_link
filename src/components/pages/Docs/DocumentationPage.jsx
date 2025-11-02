import React, { useState } from "react";
import { Typography, Tabs, Tab, Container, Box } from "@mui/material";

import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import CodeIcon from "@mui/icons-material/Code";
import LanguageIcon from "@mui/icons-material/Language";
import SpeedIcon from "@mui/icons-material/Speed";

import GetStarted from "../../components/docs/GetStarted";
import APISReference from "../../components/docs/APISReference";
import CustomDomains from "../../components/docs/CustomDomains";
import RateLimits from "../../components/docs/RateLimits";
import { brandColor } from "../../styles/InputStyles";

const TabPanel = ({ children, value, index }) => {
  if (value !== index) return null;
  return <div style={{ marginTop: "1rem" }}>{children}</div>;
};

const DocumentationPage = () => {
  const [tab, setTab] = useState(0);

  return (
    <Box
      sx={{
        px: 2,
        py: 1,
        bgcolor: "#fff",
      }}
    >
      {/* Sticky header */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          background: "#fff",
          py: 1,
          px: 1,
        }}
      >
        <Tabs
          value={tab}
          onChange={(e, newValue) => setTab(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          autoScroll
          allowScrollButtonsMobile
          aria-label="Documentation Tabs"
          sx={{
            minHeight: 36,
            "& .MuiTab-root": {
              minHeight: 36,
              py: 0.5,
              px: 1,
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "#374151",
              textTransform: "capitalize",
              borderRadius: 1,
              "&.Mui-selected": {
                color: brandColor.primary,
                backgroundColor: "#e0f2f1",
              },
            },
            "& .MuiTabs-indicator": {
              height: 2,
              backgroundColor: brandColor.primary,
            },
          }}
        >
          <Tab
            icon={<RocketLaunchIcon fontSize="small" />}
            iconPosition="start"
            label="Get Started"
          />
          <Tab
            icon={<CodeIcon fontSize="small" />}
            iconPosition="start"
            label="API Reference"
          />
          <Tab
            icon={<LanguageIcon fontSize="small" />}
            iconPosition="start"
            label="Custom Domains"
          />
          <Tab
            icon={<SpeedIcon fontSize="small" />}
            iconPosition="start"
            label="Rate Limits"
          />
        </Tabs>
      </Box>

      {/* Tab Content */}
      <TabPanel value={tab} index={0}>
        <GetStarted />
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <APISReference />
      </TabPanel>
      <TabPanel value={tab} index={2}>
        <CustomDomains />
      </TabPanel>
      <TabPanel value={tab} index={3}>
        <RateLimits />
      </TabPanel>
    </Box>
  );
};

export default DocumentationPage;

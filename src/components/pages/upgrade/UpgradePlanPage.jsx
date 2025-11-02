import React, { useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Button,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material";

const plans = {
  monthly: [
    {
      name: "Free",
      price: "$0",
      billing: "/month",
      description: "Perfect for personal use",
      features: [
        { text: "50 links per month", available: true },
        { text: "Basic analytics", available: true },
        { text: "QR code generation", available: true },
        { text: "UTM builder", available: true },
        { text: "Standard support", available: true },
        { text: "Custom domains", available: false },
        { text: "Link expiration", available: false },
        { text: "Password protection", available: false },
      ],
    },
    {
      name: "Pro",
      price: "$12",
      billing: "/month",
      description: "Ideal for professionals",
      highlight: true,
      features: [
        { text: "5,000 links per month", available: true },
        { text: "Advanced analytics", available: true },
        { text: "Custom domains", available: true },
        { text: "Link expiration", available: true },
        { text: "Password protection", available: true },
        { text: "Priority support", available: true },
        { text: "Export data", available: true },
        { text: "Limited team (5)", available: false },
      ],
    },
    {
      name: "Enterprise",
      price: "$49",
      billing: "/month",
      description: "For large organizations",
      features: [
        { text: "Unlimited links", available: true },
        { text: "Advanced analytics + API", available: true },
        { text: "Multiple custom domains", available: true },
        { text: "Team collaboration", available: true },
        { text: "White-label solution", available: true },
        { text: "SSO integration", available: true },
        { text: "Dedicated support", available: true },
        { text: "SLA guarantee", available: true },
      ],
    },
  ],
  yearly: [
    {
      name: "Free",
      price: "$0",
      billing: "/year",
      description: "Perfect for personal use",
      features: [
        { text: "50 links per month", available: true },
        { text: "Basic analytics", available: true },
        { text: "QR code generation", available: true },
        { text: "UTM builder", available: true },
        { text: "Standard support", available: true },
        { text: "Custom domains", available: false },
        { text: "Link expiration", available: false },
        { text: "Password protection", available: false },
      ],
    },
    {
      name: "Pro",
      price: "$99",
      billing: "/year",
      description: "Best value annually",
      highlight: true,
      features: [
        { text: "5,000 links per month", available: true },
        { text: "Advanced analytics", available: true },
        { text: "Custom domains", available: true },
        { text: "Link expiration", available: true },
        { text: "Password protection", available: true },
        { text: "Priority support", available: true },
        { text: "Export data", available: true },
        { text: "Limited team (5)", available: false },
      ],
    },
    {
      name: "Enterprise",
      price: "$499",
      billing: "/year",
      description: "Tailored for enterprises",
      features: [
        { text: "Unlimited links", available: true },
        { text: "Advanced analytics + API", available: true },
        { text: "Multiple custom domains", available: true },
        { text: "Team collaboration", available: true },
        { text: "White-label solution", available: true },
        { text: "SSO integration", available: true },
        { text: "Dedicated support", available: true },
        { text: "SLA guarantee", available: true },
      ],
    },
  ],
};

const UpgradePlan = () => {
  const [tab, setTab] = useState("monthly");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box px={1} py={2} bgcolor="#fff">
      <Typography variant="h4" fontWeight={700} align="center" mb={1}>
        Simple, Transparent Pricing
      </Typography>
      <Typography variant="subtitle1" align="center" color="text.secondary" mb={2}>
        Choose the plan that fits your needs
      </Typography>

      <Tabs
        value={tab}
        onChange={(e, v) => setTab(v)}
        centered
        sx={{
          mb: 3,
          "& .MuiTabs-indicator": { backgroundColor: "#0d9488" },
        }}
      >
        <Tab label="Monthly" value="monthly" sx={{ textTransform: "none" }} />
        <Tab label="Yearly" value="yearly" sx={{ textTransform: "none" }} />
      </Tabs>

      <Box
        display="flex"
        flexDirection={isMobile ? "column" : "row"}
        gap={3}
        justifyContent="center"
        alignItems="stretch"
      >
        {plans[tab].map((plan, index) => (
          <Box
            key={index}
            sx={{
              border: plan.highlight ? "2px solid #14b8a6" : "1px solid #e2e8f0",
              borderRadius: 3,
              p: 2,
              width: 400,
              backgroundColor: "#fff",
              boxShadow: 2,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography variant="h6" fontWeight={700} mb={0.5}>
                {plan.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                {plan.description}
              </Typography>
              <Typography variant="h4" color="#14b8a6" fontWeight={700} mb={1}>
                {plan.price}
                <Typography component="span" variant="body2" color="text.secondary">
                  {plan.billing}
                </Typography>
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Box textAlign="left" mb={2}>
                {plan.features.map((feature, idx) => (
                  <Box
                    key={idx}
                    display="flex"
                    alignItems="center"
                    mb={1}
                    color={feature.available ? "green" : "#94a3b8"}
                  >
                    {feature.available ? (
                      <CheckCircle fontSize="small" sx={{ mr: 1 }} />
                    ) : (
                      <Cancel fontSize="small" sx={{ mr: 1 }} />
                    )}
                    <Typography variant="body2">{feature.text}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            <Button
              variant="contained"
              fullWidth
              sx={{
                textTransform: "none",
                backgroundColor: plan.highlight ? "#14b8a6" : "#0d9488",
                "&:hover": {
                  backgroundColor: plan.highlight ? "#0f766e" : "#0f766e",
                },
              }}
            >
              {plan.name === "Enterprise"
                ? "Contact Sales"
                : plan.name === "Pro"
                ? "Start Trial"
                : "Get Started"}
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default UpgradePlan;

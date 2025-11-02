import React, { useCallback, useEffect, useState } from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import CampaignMedium from "../../components/utm/CampaignMedium";
import CampaignSource from "../../components/utm/CampaignSource";
import CampaignName from "../../components/utm/CampaignName";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getCampaignSourceThunk } from "../../redux/slicers/cutomizeutmSlice";

const CustomizeUTMPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const data = useSelector((state) => state.auth.data);
  const userId = localStorage.getItem("userId") || data?.userId || 1;
  const refreshData = useSelector((state) => state.helper.refreshData);

  const tabs = ["source", "medium", "name"];
  const [utm, setUtm] = useState({ source: "", medium: "", name: "" });

  const currentTab = location.pathname.split("/").pop();
  const tabIndex =
    tabs.indexOf(currentTab) !== -1 ? tabs.indexOf(currentTab) : 0;

  const fetchTabsData = useCallback(async () => {
    let SourceType = "";
    if (tabIndex === 0) {
      SourceType = "source";
    } else if (tabIndex === 1) {
      SourceType = "medium";
    } else if (tabIndex === 2) {
      SourceType = "name";
    }
    const payload = {
      user_id: userId,
      entity_type: SourceType,
    };
    try {
      const response = await dispatch(getCampaignSourceThunk(payload)).unwrap();
    } catch (error) {
      console.error("Error fetching tab data:", error);
    }
  }, [tabIndex, dispatch]);

  useEffect(() => {
    fetchTabsData();
  }, [fetchTabsData, refreshData]);

  const handleTabChange = (event, newIndex) => {
    navigate(`/utm/${tabs[newIndex]}`);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        px: 2,
        m: 0,
        borderRadius: 1,
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        textColor="primary"
        allowScrollButtonsMobile
        autoScroll
        indicatorColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        TabIndicatorProps={{
          style: { backgroundColor: "#009688", height: 3, borderRadius: 2 },
        }}
        sx={{ mb: 1, justifyContent: "flex-start", display: "flex" }}
      >
        {tabs.map((tab, index) => (
          <Tab
            key={tab}
            label={
              <span
                style={{
                  color: "#009688",
                  fontWeight: 600,
                  fontSize: "1rem",
                  textTransform: "capitalize",
                  letterSpacing: 0,
                }}
              >
                Campaign {tab}
              </span>
            }
          />
        ))}
      </Tabs>

      <Box sx={{ p: 0, m: 0 }}>
        {tabIndex === 0 && <CampaignSource />}
        {tabIndex === 1 && <CampaignMedium />}
        {tabIndex === 2 && <CampaignName />}
      </Box>
    </Box>
  );
};

export default CustomizeUTMPage;

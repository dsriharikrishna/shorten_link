import React, { useEffect } from "react";
import Hero from "../../components/landingpage/Hero";
import Footer from "../../components/landingpage/Footer";
import { Box } from "@mui/material";
import CreateShortLink from "../../components/dashboard/CreateShortLink";

const Home = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Hero />
      {/* <CreateShortLink /> */}
      <Footer />
    </Box>
  );
};

export default Home;

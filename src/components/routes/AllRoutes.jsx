import React, { useState, Suspense, useEffect, lazy } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import {
  CircularProgress,
  Backdrop,
  Box,
  CssBaseline,
  Toolbar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { getRoleOverviewTitle } from "../utils/RolesAccess";

import Sidebar from "../components/UI/Sidebar";
import Navbar from "../components/UI/Navbar";
import ProtectedRoute from "./ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/landingpage/Header"; // Import the Header component
import RecentLinksTable from "../components/dashboard/tables/RecentLinksTable";
import RecentQRCodesTable from "../components/dashboard/tables/RecentQRCodesTable";
import RecentUTMTable from "../components/dashboard/tables/RecentUTMTable";
import RecentLinksGraph from "../components/dashboard/graphs/RecentLinksGraph";
import RecentQrCodesGraph from "../components/dashboard/graphs/RecentQrCodesGraph";
import RecentUTMGraph from "../components/dashboard/graphs/RecentUTMGraph";
import CustomizeUTMPage from "../pages/utm/CustomizeUTMPage";
import DocumentationPage from "../pages/Docs/DocumentationPage";
import { fetchHomeGetId } from "../redux/slicers/authSlice";

// Lazy load components
const About = lazy(() => import("../components/landingpage/About"));
const Contact = lazy(() => import("../components/landingpage/Contact"));
const Terms = lazy(() => import("../components/landingpage/Terms"));
const NotFound = lazy(() => import("../components/NotFound"));
const Pricing = lazy(() => import("../components/landingpage/Pricing"));
const SignInPage = lazy(() => import("../components/auth/SignInPage"));
const Docs = lazy(() => import("../components/docs/Docs"));
const UpgradePlanPage = lazy(() => import("../pages/upgrade/UpgradePlanPage"));

const Home = lazy(() => import("../pages/home/Home"));
const DashboardPage = React.lazy(() =>
  import("../pages/dashboard/DashboardPage")
);

const AllRoutes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(!isMobile);
  const dispatch = useDispatch();

  const authData = useSelector((state) => state.auth.data);

  useEffect(() => {
    setOpen(!isMobile);
  }, [isMobile]);

  const fetchDeviceDetails = async () => {
    try {
      await dispatch(fetchHomeGetId()).unwrap();
    } catch (error) {
      console.error("Error fetching Home Get ID:", error);
    }
  };

  // Call fetchHomeGetId
  useEffect(() => {
    fetchDeviceDetails();
  }, [dispatch]);

  const toggleSidebar = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const publicRoutes = [
    "/",
    "/Login",
    "/about",
    "/contact",
    "/terms",
    "/pricing",
    "/register",
    "/login",
    "/docs",
  ];
  const shouldShowSidebar = !publicRoutes.includes(location.pathname);

  const userRole = authData?.userRole || localStorage.getItem("userRole");

  // Function to get page title based on current path and role
  const getTitle = (path) => {
    // If you want role-based title only for certain paths:
    if (path === "/dashboard") {
      // return getRoleOverviewTitle(userRole);
      return "Dashboard";
    }
    const titles = {
      "/dashboard": "Dashboard",
      "/dashboard/links": "Recent Links",
      "/dashboard/qr-codes": "Recent QR Codes",
      "/dashboard/utm-links": "Recent UTM Links",
      "/dashboard/links/graphs": "Recent Links Graph",
      "/dashboard/qr-codes/graphs": "Recent QR Codes Graph",
      "/dashboard/utm-links/graphs": "Recent UTM Links Graph",
      "/dashboard/links/graphs/:id": "Recent Links Graph",
      "/dashboard/qr-codes/graphs/:id": "Recent QR Codes Graph",
      "/dashboard/utm-links/graphs/:id": "Recent UTM Links Graph",
      "/utm/:tab?": "Customize UTM",
      "/upgrade-plan": "Upgrade Plan",
      "/Documentaion": "Documentation",
    };

    return titles[path] || "Dashboard";
  };

  const title = getTitle(location.pathname);

  // Loading component for suspense fallback
  const LoadingFallback = () => (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        overflow: {
          xs: "auto",
          md: "hidden",
        },
      }}
    >
      <CssBaseline />

      {/* Render sidebar and navbar */}
      {shouldShowSidebar && (
        <>
          <Navbar open={open} toggleSidebar={toggleSidebar} title={title} />
          <Sidebar open={open} toggleSidebar={toggleSidebar} />
        </>
      )}

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: "100%",
          height: "100%",
          overflow: {
            xs: "auto",
            md: "auto",
          },
          pt: shouldShowSidebar ? 2 : 0,
          transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        {/* Show Header on public routes */}
        {!shouldShowSidebar && <Header />}

        {shouldShowSidebar && (
          <Toolbar
            sx={{
              padding: "20px",
              margin: "0px !important",
              backgroundColor: "transparent !important",
            }}
          />
        )}

        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />{" "}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/login" element={<SignInPage />} />
            <Route path="/docs" element={<Docs />} />
            {/* private routes */}
            {/* <Route element={<ProtectedRoute />}> */}
            <Route>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/dashboard/links" element={<RecentLinksTable />} />
              <Route
                path="/dashboard/qr-codes"
                element={<RecentQRCodesTable />}
              />
              <Route path="/dashboard/utm-links" element={<RecentUTMTable />} />

              <Route
                path="/dashboard/links/graphs"
                element={<RecentLinksGraph />}
              />
              <Route
                path="/dashboard/qr-codes/graphs"
                element={<RecentQrCodesGraph />}
              />
              <Route
                path="/dashboard/utm-links/graphs"
                element={<RecentUTMGraph />}
              />
              <Route
                path="/dashboard/links/graphs/:id"
                element={<RecentLinksGraph />}
              />
              <Route
                path="/dashboard/qr-codes/graphs/:id"
                element={<RecentQrCodesGraph />}
              />
              <Route
                path="/dashboard/utm-links/graphs/:id"
                element={<RecentUTMGraph />}
              />
              <Route path="/utm/:tab?" element={<CustomizeUTMPage />} />

              <Route path="/upgrade-plan" element={<UpgradePlanPage />} />
              <Route path="/Documentaion" element={<DocumentationPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Box>
    </Box>
  );
};

export default AllRoutes;

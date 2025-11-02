// import { useState, useEffect } from "react";
// import { Copy, Check } from "lucide-react";
// import { toast } from "react-toastify";
// import { useDispatch } from "react-redux";
// import {
//   beforeLoginShortenUrl,
//   getClickCount,
//   shortenUrl,
// } from "../../redux/slicers/dashboardSlice";
// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   IconButton,
//   Link,
// } from "@mui/material";

// import AddSlug from "../dialogBoxes/AddSlug";
// import AddDomain from "../dialogBoxes/AddDomain";
// import { useNavigate } from "react-router-dom";
// import { brandColor, polishedStandardStyles } from "../../styles/InputStyles"; // <-- import styles
// import SocialShareButtons from "../UI/SocialShareButtons";

// const Hero = () => {
//   const [longUrl, setLongUrl] = useState("");
//   const [shortUrl, setShortUrl] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [copied, setCopied] = useState(false);
//   const [clickCount, setClickCount] = useState(null);
//   const [showSlugModal, setShowSlugModal] = useState(false);
//   const [showDomainModal, setShowDomainModal] = useState(false);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const isValidUrl = (url) => {
//     try {
//       new URL(url);
//       return true;
//     } catch {
//       return false;
//     }
//   };

//   const handleShorten = async () => {
//     if (!longUrl || !isValidUrl(longUrl)) {
//       toast.error("Please enter a valid URL");
//       return;
//     }

//     const token = localStorage.getItem("shortUrl-auth");

//     // const payload = {
//     //   main_url: longUrl,
//     //   duration_value: 1,
//     //   duration_unit: "hours",
//     //   max_clicks: 5,
//     //   custom_code: "",
//     // };

//     const payload = {
//       main_url: longUrl,
//       short_code: "",
//     };

//     try {
//       setIsLoading(true);
//       setErrorMessage("");

//       const res = await dispatch(beforeLoginShortenUrl(payload)).unwrap();
//       const short = res?.details?.short_url;

//       if (short) {
//         setShortUrl(short);
//         toast.success("URL shortened successfully!");
//       } else {
//         throw new Error("Unexpected response format");
//       }
//     } catch (err) {
//       const errorMsg = err.message || "Failed to shorten URL.";
//       setErrorMessage(errorMsg);
//       toast.error(errorMsg);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleClickCount = async () => {
//     const code = shortUrl.split("/").pop();
//     const payload = { short_code: code };

//     try {
//       const res = await dispatch(getClickCount(payload)).unwrap();
//       setClickCount(res?.clicks || 0);
//     } catch {
//       toast.error("Click count error");
//     }
//   };

//   const copyToClipboard = async () => {
//     try {
//       await navigator.clipboard.writeText(shortUrl);
//       setCopied(true);
//       toast.success("Copied to clipboard");
//       setTimeout(() => setCopied(false), 2000);
//     } catch {
//       toast.error("Copy failed");
//     }
//   };

//   return (
//     <Box
//       sx={{
//         padding: "2rem",
//         background: "linear-gradient(to bottom right, #f8fafc, #f1f5f9)",
//         minHeight: "100vh",
//       }}
//     >
//       <Box>
//         {/* Header Section */}
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             mb: 4,
//             textAlign: "center",
//             px: 2,
//           }}
//         >
//           <Box>
//             <Typography
//               sx={{
//                 fontSize: "1.5rem",
//                 fontWeight: 700,
//                 color: "#1e3a8a",
//                 lineHeight: 1.2,
//               }}
//               gutterBottom
//             >
//               Shorten Your URLs{" "}
//               <Box component="span" sx={{ color: "#3b82f6" }}>
//                 Instantly
//               </Box>
//             </Typography>
//             <Typography
//               variant="subtitle1"
//               sx={{
//                 mt: 2,
//                 color: "#475569",
//                 maxWidth: "700px",
//                 mx: "auto",
//               }}
//             >
//               Transform long, complex URLs into short, shareable links.
//             </Typography>
//           </Box>
//         </Box>

//         {/* Main Section */}
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: { xs: "column", md: "row" },
//             alignItems: "center",
//             gap: "2rem",
//             px: 2,
//           }}
//         >
//           {/* Image */}
//           <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
//             <Box
//               component="img"
//               src="/assets/illustrator.png"
//               alt="URL Shortener Illustration"
//               sx={{ maxWidth: "100%", height: "auto" }}
//             />
//           </Box>

//           {/* URL Form */}
//           <Box
//             sx={{
//               flex: 1,
//               maxWidth: "550px",
//               width: "100%",
//               background: "#ffffff",
//               p: "2rem",
//               borderRadius: "8px",
//             }}
//           >
//             <Typography variant="h5" gutterBottom>
//               Shorten URL
//             </Typography>

//             <Box
//               sx={{
//                 display: "flex",
//                 flexDirection: { xs: "column", md: "row" },
//                 gap: "1rem",
//                 mb: 2,
//               }}
//             >
//               <TextField
//                 fullWidth
//                 placeholder="Enter your long URL"
//                 value={longUrl}
//                 onChange={(e) => setLongUrl(e.target.value)}
//                 variant="standard"
//                 sx={{ mb: 2, ...polishedStandardStyles }}
//               />

//               <Button
//                 fullWidth
//                 variant="contained"
//                 size="small"
//                 onClick={handleShorten}
//                 disabled={isLoading}
//                 sx={{
//                   mb: 2,
//                   width: { xs: "100%", md: "150px" },
//                   height: "30px",
//                   backgroundColor: brandColor.primary,
//                   padding: "6px 8px",
//                   textTransform: "none",
//                   boxShadow: "none",
//                   fontSize: "14px",
//                 }}
//               >
//                 {isLoading ? "Shortening..." : "Shorten URL"}
//               </Button>
//             </Box>

//             {shortUrl && (
//               <Box
//                 sx={{
//                   mt: 2,
//                   background: "#f8fafc",
//                   p: 2,
//                   borderRadius: "0.5rem",
//                   border: "1px solid #d1d5db",
//                 }}
//               >
//                 <Typography variant="subtitle2" gutterBottom>
//                   Your Shortened URL
//                 </Typography>
//                 <Box
//                   sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "space-between",
//                     gap: "0.5rem",
//                     mb: 1.5,
//                   }}
//                 >
//                   <Link
//                     href={shortUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     sx={{
//                       color: "#1d4ed8",
//                       textDecoration: "underline",
//                       wordBreak: "break-all",
//                       fontWeight: 500,
//                       fontSize: "0.95rem",
//                     }}
//                   >
//                     {shortUrl}
//                   </Link>
//                   <IconButton
//                     onClick={copyToClipboard}
//                     size="small"
//                     sx={{
//                       p: "0.4rem",
//                       borderRadius: "0.375rem",
//                       "&:hover": { backgroundColor: "#e5e7eb" },
//                     }}
//                   >
//                     {copied ? <Check size={18} /> : <Copy size={18} />}
//                   </IconButton>
//                 </Box>

//                 <Button
//                   variant="outlined"
//                   onClick={handleClickCount}
//                   fullWidth
//                   size="small"
//                   sx={{
//                     mb: 1,
//                     height: "37px",
//                     textTransform: "none",
//                     fontWeight: 500,
//                     fontSize: "0.95rem",
//                     borderRadius: "8px",
//                   }}
//                 >
//                   Show Click Count
//                 </Button>

//                 {clickCount !== null && (
//                   <Typography
//                     variant="body2"
//                     sx={{
//                       mt: 1,
//                       fontWeight: 600,
//                       color: "#1e3a8a",
//                     }}
//                   >
//                     Click Count: {clickCount}
//                   </Typography>
//                 )}

//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     gap: "1rem",
//                     mt: 2,
//                   }}
//                 >
//                   <Button
//                     onClick={() => setShowSlugModal(true)}
//                     size="small"
//                     sx={{
//                       flex: 1,
//                       height: "37px",
//                       textTransform: "none",
//                       fontWeight: "bold",
//                       fontSize: "0.95rem",
//                       borderRadius: "8px",
//                       padding: "0.5rem 1rem",
//                       color: "#1976d2",
//                     }}
//                   >
//                     Add Your Slug
//                   </Button>
//                   <Button
//                     onClick={() => setShowDomainModal(true)}
//                     size="small"
//                     sx={{
//                       flex: 1,
//                       height: "37px",
//                       textTransform: "none",
//                       fontWeight: "bold",
//                       fontSize: "0.95rem",
//                       borderRadius: "8px",
//                       padding: "0.5rem 1rem",
//                       color: "#1976d2",
//                     }}
//                   >
//                     Add Domain
//                   </Button>
//                 </Box>
//               </Box>
//             )}
//             {/* Social Media Share Buttons
//             {shortUrl ? (
//               <Box
//                 sx={{
//                   flex: 1,
//                   width: "100%",
//                   background: "#ffffff",
//                   borderRadius: "8px",
//                 }}
//               >
//                 <SocialShareButtons />
//               </Box>
//             ) : null} */}
//           </Box>
//         </Box>

//         {/* Slug & Domain Modals */}
//         <AddSlug
//           open={showSlugModal}
//           onClose={() => setShowSlugModal(false)}
//           longUrl={shortUrl}
//           onSlugUpdated={(newShortUrl) => setShortUrl(newShortUrl)}
//         />
//         <AddDomain
//           open={showDomainModal}
//           onClose={() => setShowDomainModal(false)}
//           shortUrl={shortUrl}
//           onDomainUpdated={(newShortUrl) => setShortUrl(newShortUrl)}
//         />
//       </Box>
//     </Box>
//   );
// };

// export default Hero;

import { Box, Typography } from "@mui/material";
import CreateShortLink from "../dashboard/CreateShortLink";

const Hero = () => {
  return (
    <Box
      sx={{
        padding: "2rem",
        background: "linear-gradient(to bottom right, #f8fafc, #f1f5f9)",
        minHeight: "100vh",
      }}
    >
      <Box>
        {/* Header Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 4,
            textAlign: "center",
            px: 2,
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "#1e3a8a",
                lineHeight: 1.2,
              }}
              gutterBottom
            >
              Shorten Your URLs{" "}
              <Box component="span" sx={{ color: "#3b82f6" }}>
                Instantly
              </Box>
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                mt: 2,
                color: "#475569",
                maxWidth: "700px",
                mx: "auto",
              }}
            >
              Transform long, complex URLs into short, shareable links.
            </Typography>
          </Box>
        </Box>

        {/* Main Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: "2rem",
            px: 2,
          }}
        >
          {/* Image */}
          <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <Box
              component="img"
              src="/assets/illustrator.png"
              alt="URL Shortener Illustration"
              sx={{ maxWidth: "100%", height: "auto" }}
            />
          </Box>

          {/* URL Form */}
          <Box
            sx={{
              flex: 1,
              // maxWidth: "550px",
              width: "100%",
              background: "#ffffff",
              // p: "2rem",
              borderRadius: "8px",
            }}
          >
            <CreateShortLink />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Hero;

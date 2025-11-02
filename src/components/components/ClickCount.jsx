// ClickCount.jsx

import React, { useEffect, useState } from "react";
// import { getClickCount } from "../api/shortenUrl";
import { useDispatch } from "react-redux";
import { getClickCount } from "../redux/slicers/dashboardSlice";

const ClickCount = ({ shortCode }) => {
  const [count, setCount] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (shortCode) {
              // const payload = { short_code: shortCode }; // ✅ API expects object
      dispatch(getClickCount(shortCode).then(setCount));
    }
  }, [shortCode]);

  return (
    <div>
      {count !== null ? (
        <p>
          <strong>Click Count:</strong> {count}
        </p>
      ) : (
        <p>Loading clicks...</p>
      )}
    </div>
  );
};

export default ClickCount;




// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const CLICK_LIMIT = 5;

// const ClickTrackerWithBackend = ({ shortCode }) => {
//   const [clickCount, setClickCount] = useState(null); // null = loading
//   const [error, setError] = useState("");

//   // Fetch click count from backend
//   useEffect(() => {
//     if (!shortCode) return;

//     axios
//       .get(`http://127.0.0.1:8000/stats/${shortCode}`) // ✅ update your backend URL if different
//       .then((res) => {
//         setClickCount(res.data.clicks || 0);
//       })
//       .catch((err) => {
//         console.error("Error fetching click count:", err);
//         setError("Failed to fetch click count");
//         setClickCount(0); // fallback
//       });
//   }, [shortCode]);

//   const handleClick = async () => {
//     try {
//       // Simulate a click by visiting the short link → this triggers backend to increment count
//       await axios.get(`http://127.0.0.1:8000/${shortCode}`);

//       // Re-fetch updated count
//       const res = await axios.get(`http://127.0.0.1:8000/stats/${shortCode}`);
//       setClickCount(res.data.clicks || 0);
//     } catch (err) {
//       console.error("Click failed:", err);
//       setError("Click failed");
//     }
//   };

//   if (!shortCode) return <p>Short code not provided.</p>;
//   if (clickCount === null) return <p>Loading click count...</p>;
//   if (error) return <p style={{ color: "red" }}>{error}</p>;

//   const isLimitReached = clickCount >= CLICK_LIMIT;

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Click Tracker</h2>
//       <p>
//         <strong>Short Code:</strong> {shortCode}
//       </p>
//       <p>
//         <strong>Current Clicks:</strong> {clickCount}
//       </p>
//       <button
//         onClick={handleClick}
//         disabled={isLimitReached}
//         style={{
//           padding: "1rem",
//           backgroundColor: isLimitReached ? "#999" : "#007bff",
//           color: "#fff",
//           border: "none",
//           cursor: isLimitReached ? "not-allowed" : "pointer",
//         }}
//       >
//         {isLimitReached
//           ? "Limit Reached"
//           : `Click Me (${CLICK_LIMIT - clickCount} left)`}
//       </button>
//     </div>
//   );
// };

// export default ClickTrackerWithBackend;





// import React, { useEffect, useState } from "react";
// import axios from "axios";

// // Constants
// const CLICK_LIMIT = 5;
// const DEVICE_ID_KEY = "web_device_id";

// // Helper to generate or retrieve device ID
// const getDeviceId = () => {
//   let id = localStorage.getItem(DEVICE_ID_KEY);
//   if (!id) {
//     id = crypto.randomUUID(); // Generate a unique ID
//     localStorage.setItem(DEVICE_ID_KEY, id);
//   }
//   return id;
// };

// const ClickTrackerWithBackend = ({ shortCode }) => {
//   const [clickCount, setClickCount] = useState(null);
//   const [deviceId, setDeviceId] = useState("");
//   const [error, setError] = useState("");

//   // On mount: get device ID and fetch click count
//   useEffect(() => {
//     const id = getDeviceId();
//     setDeviceId(id);

//     if (!shortCode) return;

//     axios
//       .get(`http://127.0.0.1:8000/stats/${shortCode}`)
//       .then((res) => {
//         setClickCount(res.data.clicks || 0);
//       })
//       .catch((err) => {
//         console.error("Error fetching click count:", err);
//         setError("Failed to fetch click count");
//         setClickCount(0);
//       });
//   }, [shortCode]);

//   const handleClick = async () => {
//     try {
//       // Simulate click + pass device ID as header or query param if needed
//       await axios.get(`http://127.0.0.1:8000/${shortCode}`, {
//         headers: {
//           "X-Device-ID": deviceId, // optional if you want to process in backend
//         },
//       });

//       // Re-fetch updated count
//       const res = await axios.get(`http://127.0.0.1:8000/stats/${shortCode}`);
//       setClickCount(res.data.clicks || 0);
//     } catch (err) {
//       console.error("Click failed:", err);
//       setError("Click failed");
//     }
//   };

//   if (!shortCode) return <p>Short code not provided.</p>;
//   if (clickCount === null) return <p>Loading click count...</p>;
//   if (error) return <p style={{ color: "red" }}>{error}</p>;

//   const isLimitReached = clickCount >= CLICK_LIMIT;

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Click Tracker with Device ID</h2>
//       <p><strong>Short Code:</strong> {shortCode}</p>
//       <p><strong>Device ID:</strong> {deviceId}</p>
//       <p><strong>Current Clicks:</strong> {clickCount}</p>

//       <button
//         onClick={handleClick}
//         disabled={isLimitReached}
//         style={{
//           padding: "1rem",
//           backgroundColor: isLimitReached ? "#999" : "#007bff",
//           color: "#fff",
//           border: "none",
//           cursor: isLimitReached ? "not-allowed" : "pointer",
//         }}
//       >
//         {isLimitReached
//           ? "Limit Reached"
//           : `Click Me (${CLICK_LIMIT - clickCount} left)`}
//       </button>
//     </div>
//   );
// };

// export default ClickTrackerWithBackend;

// Base API URL OF THE PROJECT

// const BASE_URL = "https://surl.signitivessoft.com"
// let BASE_URL;

// if (window.location.hostname === "stg.docqment.ai") {
//   BASE_URL = "https://bstg.docqment.ai";
// } else if (window.location.hostname === "dev.docqment.ai") {
//   BASE_URL = "https://bdev.docqment.ai";
// } else {
//   BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5173";
// }
const BASE_URL = import.meta.env.VITE_BASE_URL || "http://52.90.233.245:8000";
const DOMAIN = import.meta.env.VITE_DOMAIN || "surl.signitivessoft.com";

export { BASE_URL, DOMAIN };

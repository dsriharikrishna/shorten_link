// src/services/apiConfig.js
import { BASE_URL } from "../utils/common";

export const API_CONFIG = {
  BASE_URL,
  ENDPOINTS: {
    LOGIN_WITH_EMAIL:"/auth/login",
    LOGIN: "/auth/token",
    LOGIN_VERIFY: "/auth/request-verification",
    LOGIN_VERIFY_CODE: "/auth/verify-code",
    REGISTER: "/auth/register",
    DASHBOARD: "/dashboard",
    GETURL: "/",
    ANALYTICS: "shorten/analytics",
    HOMEGETID: "system-info",
    POSTCAMPAIGN: "campaign",
    GETCAMPAIGN: "campaign",
    GETQRCODELABEL: "qr/generate-and-return",
    GETUTMBUILDER: "campaign/all/",
    POSTUTMBUILDER:"campaign/generate",
  },
};

export default API_CONFIG;

// src/store/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_CONFIG } from "../../services/apiConfig";
import { apiMethods } from "../../services/apiServices";

// Async login action
export const loginUserVerify = createAsyncThunk(
  "auth/loginUserVerify",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LOGIN_VERIFY}`,
        payload
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Login failed" }
      );
    }
  }
);

export const loginUserVerifyCode = createAsyncThunk(
  "auth/loginUserVerifyCode",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LOGIN_VERIFY_CODE}`,
        payload
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Login failed" }
      );
    }
  }
);

// after verify login user with email

export const loginUserWithEmail = createAsyncThunk(
  "auth/loginUserWithEmail",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LOGIN_WITH_EMAIL}`,
        payload
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Login failed" }
      );
    }
  }
);

// Fetch Home Get ID
export const fetchHomeGetId = createAsyncThunk(
  "dashboard/fetchHomeGetId",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiMethods.get(
        `${API_CONFIG.BASE_URL}/${API_CONFIG.ENDPOINTS?.HOMEGETID}`
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  user: null,
  token: localStorage.getItem("shortUrl-auth") || null,
  device: null,
  device_id: null,
  data: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserVerify.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUserVerify.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user || null;
      })
      .addCase(loginUserVerify.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "verification failed";
      })

      .addCase(loginUserVerifyCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUserVerifyCode.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user || null;
        // console.log("Login successful:", action.payload?.details.access_token);
        state.token = action.payload.details?.access_token;
        localStorage.setItem(
          "shortUrl-auth",
          action.payload.details?.access_token || ""
        );
        localStorage.setItem("userId", action.payload.details?.user_id || "");
      })
      .addCase(loginUserVerifyCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Login failed";
      })

      .addCase(loginUserWithEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUserWithEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user || null;
        // console.log("Login successful:", action.payload?.details.access_token);
        state.token = action.payload.details?.access_token;
        localStorage.setItem(
          "shortUrl-auth",
          action.payload.details?.access_token || ""
        );
        localStorage.setItem("userId", action.payload.details?.user_id || "");
      })
      .addCase(loginUserWithEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Login failed";
      })

      // Fetch Home Get ID
      .addCase(fetchHomeGetId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHomeGetId.fulfilled, (state, action) => {
        state.loading = false;
        state.device_id = action.payload?.details["Unique Device ID"];
        state.device = action.payload?.details.Device;
        localStorage.setItem(
          "device_id",
          action.payload?.details["Unique Device ID"]
        );
      })
      .addCase(fetchHomeGetId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiMethods } from "../../services/apiServices";
import API_CONFIG from "../../services/apiConfig";

// =======================
// ASYNC THUNKS
// =======================

export const beforeLoginShortenUrl = createAsyncThunk(
  "dashboard/beforeLoginShortenUrl",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await apiMethods.get(
        `${API_CONFIG.BASE_URL}/${payload?.main_url}`
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Shorten URL
export const shortenUrl = createAsyncThunk(
  "dashboard/shortenUrl",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await apiMethods.post("/shorten", payload);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Get Click Count
export const getClickCount = createAsyncThunk(
  "dashboard/getClickCount",
  async ({ short_code, domain, user_id, }, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams({
        short_code,
        domain,
        user_id,
        device_id: localStorage.getItem("device_id"),
      }).toString();

      const response = await apiMethods.get(
        `${API_CONFIG.BASE_URL}/${API_CONFIG.ENDPOINTS.ANALYTICS}?${queryParams}`
      );

      return response.details;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


// Update Slug
export const updateSlugThunk = createAsyncThunk(
  "dashboard/updateSlugThunk",
  async ({ payload, short_code }, { rejectWithValue }) => {
    try {
      console.log("payload", payload);
      console.log("short_code", short_code);
      if (!short_code) {
        throw new Error("short_code is required");
      }
      if (!payload) {
        throw new Error("payload is required");
      }
      const response = await apiMethods.patch(
        `${API_CONFIG.BASE_URL}/shorten/${short_code}`,
        payload
      );
      console.log("response", response);
      return response;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error.response?.details || error.message);
    }
  }
);

// qr code label
export const getQRCodeLabelThunk = createAsyncThunk(
  "dashboard/getQRCodeLabelThunk",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await apiMethods.post(
        `${API_CONFIG.BASE_URL}/${API_CONFIG.ENDPOINTS.GETQRCODELABEL}`,
        payload
      );
      console.log("response", response);
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

//utm builder get
export const getUtmBuilderData = createAsyncThunk(
  "dashboard/getUtmBuilderData",
  async (payload, { rejectWithValue }) => {
    try {
      // http://52.90.233.245:8000/campaign/all/?user_id=72
      const response = await apiMethods.get(
        `${API_CONFIG.BASE_URL}/${API_CONFIG.ENDPOINTS.GETUTMBUILDER}?user_id=${payload?.user_id}`
      );
      // console.log("response", response);
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
// generate?device_id=%22mnbvcvb%22
// post utm builder data
export const postUTMBuilderData = createAsyncThunk(
  "dashboard/postUTMBuilderData",
  async ({ device_id, payload }, { rejectWithValue }) => {
    try {
      const response = await apiMethods.post(
        `${API_CONFIG.BASE_URL}/${API_CONFIG.ENDPOINTS.POSTUTMBUILDER}/?device_id=${device_id}`,
        payload
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// fetch dashboard data 
export const fetchDashboardData = createAsyncThunk(
  "dashboard/fetchDashboardData",
  async ({ user_id }, { rejectWithValue }) => {
    try {
      const response = await apiMethods.get(
        `${API_CONFIG.BASE_URL}/${API_CONFIG.ENDPOINTS.DASHBOARD}?user_id=${user_id}`
      );
      return response;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

// =======================
// SLICE
// =======================

const initialState = {
  shortUrl: null,
  clickCount: null,
  data: null,
  utmBuilderData: null,
  qrCodeLabel: null,
  urlLoading: false,
  urlError: null,
  dashboard: null,  
  refreshData: false,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    clearDashboard: (state) => {
      state.shortUrl = null;
      state.clickCount = null;
      state.urlLoading = false;
      state.urlError = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(beforeLoginShortenUrl.pending, (state) => {
        state.urlLoading = true;
        state.urlError = null;
      })
      .addCase(beforeLoginShortenUrl.fulfilled, (state, action) => {
        state.urlLoading = false;
        state.shortUrl = action.payload;
      })
      .addCase(beforeLoginShortenUrl.rejected, (state, action) => {
        state.urlLoading = false;
        state.urlError = action.payload;
      })

      // Shorten URL
      .addCase(shortenUrl.pending, (state) => {
        state.urlLoading = true;
        state.urlError = null;
      })
      .addCase(shortenUrl.fulfilled, (state, action) => {
        state.urlLoading = false;
        state.shortUrl = action.payload;
      })
      .addCase(shortenUrl.rejected, (state, action) => {
        state.urlLoading = false;
        state.urlError = action.payload;
      })

      // Get Click Count
      .addCase(getClickCount.pending, (state) => {
        state.urlLoading = true;
        state.urlError = null;
      })
      .addCase(getClickCount.fulfilled, (state, action) => {
        state.urlLoading = false;
        state.clickCount = action.payload;
      })
      .addCase(getClickCount.rejected, (state, action) => {
        state.urlLoading = false;
        state.urlError = action.payload;
      })

      // Update Slug
      .addCase(updateSlugThunk.pending, (state) => {
        state.urlLoading = true;
        state.urlError = null;
      })
      .addCase(updateSlugThunk.fulfilled, (state, action) => {
        state.urlLoading = false;
        state.shortUrl = action.payload;
      })
      .addCase(updateSlugThunk.rejected, (state, action) => {
        state.urlLoading = false;
        state.urlError = action.payload;
      })

      // get QR Code Label
      .addCase(getQRCodeLabelThunk.pending, (state) => {
        state.urlLoading = true;
        state.urlError = null;
      })
      .addCase(getQRCodeLabelThunk.fulfilled, (state, action) => {
        state.urlLoading = false;
        state.qrCodeLabel = action.payload;
      })
      .addCase(getQRCodeLabelThunk.rejected, (state, action) => {
        state.urlLoading = false;
        state.urlError = action.payload;
      })

      // get utm builder data
      .addCase(getUtmBuilderData.pending, (state) => {
        state.urlLoading = true;
        state.urlError = null;
      })
      .addCase(getUtmBuilderData.fulfilled, (state, action) => {
        state.urlLoading = false;
        state.utmBuilderData = action.payload;
      })
      .addCase(getUtmBuilderData.rejected, (state, action) => {
        state.urlLoading = false;
        state.urlError = action.payload;
      })

      // post utm builder data
      .addCase(postUTMBuilderData.pending, (state) => {
        state.urlLoading = true;
        state.urlError = null;
      })
      .addCase(postUTMBuilderData.fulfilled, (state, action) => {
        state.urlLoading = false;
        state.utmBuilderData = action.payload;
      })
      .addCase(postUTMBuilderData.rejected, (state, action) => {
        state.urlLoading = false;
        state.urlError = action.payload;
      })

        // get dashboard data
      .addCase(fetchDashboardData.pending, (state) => {
        state.urlLoading = true;
        state.urlError = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.urlLoading = false;
        state.dashboard = action.payload;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.urlLoading = false;
        state.urlError = action.payload;
      })
  },
});

export const { clearDashboard } = dashboardSlice.actions;
export default dashboardSlice.reducer;

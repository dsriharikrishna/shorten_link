import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API_CONFIG from "../../services/apiConfig";
import { apiMethods } from "../../services/apiServices";

// Get campaign source details
export const getCampaignSourceThunk = createAsyncThunk(
  "dashboard/getCampaignSourceThunk",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await apiMethods.get(
        `${API_CONFIG.BASE_URL}/${API_CONFIG?.ENDPOINTS?.GETCAMPAIGN}/${payload?.entity_type}/${payload?.user_id}`
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Post campaign source
export const postCampaignSourceThunk = createAsyncThunk(
  "dashboard/postCampaignSourceThunk",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiMethods.post(
        `${API_CONFIG.BASE_URL}/${API_CONFIG?.ENDPOINTS?.POSTCAMPAIGN}/${data?.entity_type}`,
        data?.payload
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Edit campaign source
export const editCampaignThunk = createAsyncThunk(
  "dashboard/editCampaign",
  async ({ unique_id, user_id, entity_type, payload }, { rejectWithValue }) => {
    try {
      const response = await apiMethods.put(
        `${API_CONFIG.BASE_URL}/${API_CONFIG.ENDPOINTS.POSTCAMPAIGN}/${entity_type}/${user_id}/${unique_id}`,
        payload
      );
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Delete campaign source
export const deleteCampaignThunk = createAsyncThunk(
  "dashboard/deleteCampaign",
  async (payload, { rejectWithValue }) => {
    try {
      const { unique_id, entity_type, user_id } = payload;
      const response = await apiMethods.delete(
        `${API_CONFIG.BASE_URL}/${API_CONFIG.ENDPOINTS.POSTCAMPAIGN}/${entity_type}/${user_id}/${unique_id}`
      );
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);



// Initial state
const initialState = {
  data: null,
  urlLoading: false,
  urlError: null,
};

// Slice
const customizeutmSlice = createSlice({
  name: "customizeutm",
  initialState,
  reducers: {
    resetCampaignStatus: (state) => {
      state.operationStatus = null;
      state.refreshData = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // get compeign source details
      .addCase(getCampaignSourceThunk.pending, (state) => {
        state.urlLoading = true;
        state.urlError = null;
      })
      .addCase(getCampaignSourceThunk.fulfilled, (state, action) => {
        state.urlLoading = false;
        console.log(action.payload);
        if (action.payload && Array.isArray(action.payload.details)) {
          state.data = action.payload.details;
        } else {
          state.data = [];
        }
      })
      .addCase(getCampaignSourceThunk.rejected, (state, action) => {
        state.urlLoading = false;
        state.urlError = action.payload;
      })

      // post compeign source details
      .addCase(postCampaignSourceThunk.pending, (state) => {
        state.urlLoading = true;
        state.urlError = null;
      })
      .addCase(postCampaignSourceThunk.fulfilled, (state, action) => {
        state.urlLoading = false;
      })
      .addCase(postCampaignSourceThunk.rejected, (state, action) => {
        state.urlLoading = false;
        state.urlError = action.payload;
      })

      // edit compaign source details
      .addCase(editCampaignThunk.pending, (state) => {
        state.urlLoading = true;
        state.urlError = null;
      })
      .addCase(editCampaignThunk.fulfilled, (state, action) => {
        state.urlLoading = false;
      })
      .addCase(editCampaignThunk.rejected, (state, action) => {
        state.urlLoading = false;
        state.urlError = action.payload;
      })

      // 🆕 Delete campaign
      .addCase(deleteCampaignThunk.pending, (state) => {
        state.urlLoading = true;
        state.urlError = null;
      })
      .addCase(deleteCampaignThunk.fulfilled, (state, action) => {
        state.urlLoading = false;
      })
      .addCase(deleteCampaignThunk.rejected, (state, action) => {
        state.urlLoading = false;
        state.urlError = action.payload;
      });
  },
});

// Export actions and reducer
export const { resetCampaignStatus } = customizeutmSlice.actions;
export default customizeutmSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API_CONFIG from "../../services/apiConfig";
import { apiMethods } from "../../services/apiServices";

// Get documentation data (campaign source details)
export const getDocumentationThunk = createAsyncThunk(
  "documentation/getDocumentationThunk",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await apiMethods.get(
        `${API_CONFIG.BASE_URL}/${API_CONFIG?.ENDPOINTS?.GETCAMPAIGN}/${payload?.entity_type}/${payload?.user_id}`
      );
      return response.data; // ✅ assuming Axios, we want only `.data`
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Initial state
const initialState = {
  data: [],
  urlLoading: false,
  urlError: null,
};

// Slice
const documentationSlice = createSlice({
  name: "documentation",
  initialState,
  reducers: {
    resetDocumentationError: (state) => {
      state.urlError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get documentation
      .addCase(getDocumentationThunk.pending, (state) => {
        state.urlLoading = true;
        state.urlError = null;
      })
      .addCase(getDocumentationThunk.fulfilled, (state, action) => {
        state.urlLoading = false;
        state.data = Array.isArray(action.payload?.details)
          ? action.payload.details
          : [];
      })
      .addCase(getDocumentationThunk.rejected, (state, action) => {
        state.urlLoading = false;
        state.urlError = action.payload;
      });
  },
});

// Export actions and reducer
export const { resetDocumentationError } = documentationSlice.actions;
export default documentationSlice.reducer;

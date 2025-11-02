import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API_CONFIG from "../../services/apiConfig";
import { apiMethods } from "../../services/apiServices";

// ✅ Get upgrade plans
export const getUpgradePlansThunk = createAsyncThunk(
  "upgrade/getUpgradePlans",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiMethods.get(
        `${API_CONFIG.BASE_URL}/${API_CONFIG.ENDPOINTS.GET_UPGRADE_PLANS}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ✅ Update user plan
export const updateUserPlanThunk = createAsyncThunk(
  "upgrade/updateUserPlan",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await apiMethods.post(
        `${API_CONFIG.BASE_URL}/${API_CONFIG.ENDPOINTS.UPDATE_USER_PLAN}`,
        payload
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ✅ Initial State
const initialState = {
  plans: [],
  currentPlan: null,
  loading: false,
  error: null,
  successMessage: null,
};

// ✅ Slice
const upgradePlanSlice = createSlice({
  name: "upgrade",
  initialState,
  reducers: {
    resetUpgradeState: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch upgrade plans
      .addCase(getUpgradePlansThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUpgradePlansThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.plans = action.payload?.plans || [];
      })
      .addCase(getUpgradePlansThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update user plan
      .addCase(updateUserPlanThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(updateUserPlanThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPlan = action.payload?.updatedPlan || null;
        state.successMessage = "Plan updated successfully!";
      })
      .addCase(updateUserPlanThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// ✅ Exports
export const { resetUpgradeState } = upgradePlanSlice.actions;
export default upgradePlanSlice.reducer;

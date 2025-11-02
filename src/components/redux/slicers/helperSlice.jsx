import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  refreshData: false,
};

const helperSlice = createSlice({
  name: "helper",
  initialState,
  reducers: {
    clearDashboard: (state) => {
      state.data = null;
      state.refreshData = false;
    },
    setRefreshData: (state, action) => {
      state.refreshData = action.payload;
    },
  },
});

export const { clearDashboard, setRefreshData, refreshData } =
  helperSlice.actions;
export default helperSlice.reducer;

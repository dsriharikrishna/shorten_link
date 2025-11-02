import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slicers/authSlice";
import dashboardReducer from "./slicers/dashboardSlice";
import helperReducer from "./slicers/helperSlice";
import customReducer from "./slicers/cutomizeutmSlice";
import documentReducer from "./slicers/documentationSlice";
import upgradeReducer from "./slicers/upgradePlanSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    helper: helperReducer,
    customizeutm: customReducer,
    document: documentReducer,
    upgrade: upgradeReducer,
  },
});

export default store;

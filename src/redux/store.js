import { configureStore } from "@reduxjs/toolkit";
import frameworkSlice from "./frameWorkSlice";

export const store = configureStore({
  reducer: {
    frameworks: frameworkSlice,
  },
});

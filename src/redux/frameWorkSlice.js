import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

export const frameworkAdaptor = createEntityAdapter();

const initialState = frameworkAdaptor.getInitialState();

export const frameworkSelectors = frameworkAdaptor.getSelectors(
  (state) => state.frameworks
);

const frameworkSlice = createSlice({
  name: "framework",
  initialState,
  reducers: {
    addFramework: frameworkAdaptor.addOne,
    updateFramework: frameworkAdaptor.updateOne,
  },
});

export const { addFramework, updateFramework } = frameworkSlice.actions;
export default frameworkSlice.reducer;

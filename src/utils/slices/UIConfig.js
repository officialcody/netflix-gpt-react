import { createSlice } from "@reduxjs/toolkit";

const UIConfig = createSlice({
  name: "uiconfig",
  initialState: {
    language: "en",
  },
  reducers: {
    changeLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { changeLanguage } = UIConfig.actions;

export default UIConfig.reducer;

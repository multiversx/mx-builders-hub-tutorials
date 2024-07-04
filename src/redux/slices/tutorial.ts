import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  tutorialData: {},
};

export const tutorialSlice = createSlice({
  name: "tutorial",
  initialState,
  reducers: {
    setKey: (state, action: PayloadAction<Record<string, any>>) => {
      state.tutorialData[action.payload.key] = action.payload.value;
    },

    resetTutorial: (state) => {
      state.tutorialData = {};
    },
  },
});

export const { setKey, resetTutorial } = tutorialSlice.actions;

export default tutorialSlice.reducer;

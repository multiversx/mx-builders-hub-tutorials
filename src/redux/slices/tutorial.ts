import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {};

export const tutorialSlice = createSlice({
  name: "tutorial",
  initialState,
  reducers: {
    setKey: (state, action: PayloadAction<Record<string, any>>) => {
      state[action.payload.key] = action.payload.value;
    },

    resetTutorial: (state) => {
      return (state = {});
    },
  },
});

export const { setKey, resetTutorial } = tutorialSlice.actions;

export default tutorialSlice.reducer;

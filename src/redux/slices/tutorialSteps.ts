import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ITutorialMap } from "../../types";

export interface ITutorialSteps {
  tutorialSteps: ITutorialMap[] | null;
  activeStep: number;
  isLastStep: boolean;
  isFirstStep: boolean;
}

const initialState: ITutorialSteps = {
  tutorialSteps: null,
  activeStep: 0,
  isLastStep: false,
  isFirstStep: false,
};

export const tutorialStepsSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setSteps: (state, action: PayloadAction<ITutorialMap[] | null>) => {
      state.tutorialSteps = action.payload;
      state.activeStep = 0;
      state.isLastStep = false;
      state.isFirstStep = false;
    },

    setActiveStep: (state, action: PayloadAction<number>) => {
      state.activeStep = action.payload;
    },

    setIsLastStep: (state, action: PayloadAction<boolean>) => {
      state.isLastStep = action.payload;
    },

    setIsFirstStep: (state, action: PayloadAction<boolean>) => {
      state.isFirstStep = action.payload;
    },

    unlockStep: (state) => {
      if (!state.tutorialSteps) return;

      state.tutorialSteps[state.activeStep].unlocked = true;
    },
  },
});

export const {
  setSteps,
  setActiveStep,
  setIsLastStep,
  setIsFirstStep,
  unlockStep,
} = tutorialStepsSlice.actions;

export default tutorialStepsSlice.reducer;

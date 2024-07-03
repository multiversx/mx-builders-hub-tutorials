import { createSelector } from "reselect";
import { RootState } from "../store";

const stateSelector = (state: RootState) => state.tutorialSteps;

export const tutorialStepsSelector = createSelector(
  stateSelector,
  (state) => state
);

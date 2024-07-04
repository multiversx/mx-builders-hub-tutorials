import { createSelector } from "reselect";
import { RootState } from "../store";

const stateSelector = (state: RootState) => state.tutorial;

export const tutorialSelector = createSelector(stateSelector, (state) => state);

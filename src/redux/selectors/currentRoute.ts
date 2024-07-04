import { createSelector } from "reselect";
import { RootState } from "../store";

const stateSelector = (state: RootState) => state.currentRoute;

export const currentRouteSelector = createSelector(
  stateSelector,
  (state) => state
);

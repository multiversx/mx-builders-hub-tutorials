import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  currentRoute: "",
};

export const currentRouteSlice = createSlice({
  name: "currentRoute",
  initialState,
  reducers: {
    setCurrentRoute: (state, action: PayloadAction<string>) => {
      state.currentRoute = action.payload;
    },
  },
});

export const { setCurrentRoute } = currentRouteSlice.actions;

export default currentRouteSlice.reducer;

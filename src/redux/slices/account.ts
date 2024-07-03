import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AccountState {
  jwt: string | null;
}

const initialState: AccountState = {
  jwt: "",
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setJWT: (state, action: PayloadAction<string | null>) => {
      state.jwt = action.payload;
    },
  },
});

export const { setJWT } = accountSlice.actions;

export default accountSlice.reducer;

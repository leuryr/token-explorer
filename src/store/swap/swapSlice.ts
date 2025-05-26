import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SwapState } from "./types/swapTypes";
import { TokenInfo } from "../../types/types";

const initialState: SwapState = {
  source: { token: null, inputValue: "", subtext: "", inputMode: "usd" },
  target: { token: null, inputValue: "", subtext: "", inputMode: "token" },
};

export const swapSlice = createSlice({
  name: "swap",
  initialState,
  reducers: {
    setSourceToken: (state, action: PayloadAction<TokenInfo>) => {
      state.source.token = action.payload;
    },
    setTargetToken: (state, action: PayloadAction<TokenInfo>) => {
      state.target.token = action.payload;
    },
    setSourceInputMode: (state, action: PayloadAction<"usd" | "token">) => {
      state.source.inputMode = action.payload;
    },
    setTargetInputMode: (state, action: PayloadAction<"usd" | "token">) => {
      state.target.inputMode = action.payload;
    },
    setSourceValue: (state, action: PayloadAction<string>) => {
      state.source.inputValue = action.payload;
    },
    setTargetValue: (state, action: PayloadAction<string>) => {
      state.target.inputValue = action.payload;
    },
    setSourceSubtext: (state, action: PayloadAction<string>) => {
      state.source.subtext = action.payload;
    },
    setTargetSubtext: (state, action: PayloadAction<string>) => {
      state.target.subtext = action.payload;
    }
  },
});

export const {
  setSourceToken,
  setTargetToken,
  setSourceInputMode,
  setTargetInputMode,
  setSourceValue,
  setTargetValue,
  setSourceSubtext,
  setTargetSubtext,
} = swapSlice.actions;

export default swapSlice.reducer;

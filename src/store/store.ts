import { configureStore } from "@reduxjs/toolkit";
import swapReducer from "./swap/swapSlice";

export const store = configureStore({
  reducer: {
    swap: swapReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
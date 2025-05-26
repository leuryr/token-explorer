import { configureStore } from "@reduxjs/toolkit";
import swapReducer from "./swap/swapSlice";
import { tokensApi } from "./tokensApi/tokensApiSlice";

export const store = configureStore({
  reducer: {
    swap: swapReducer,
    [tokensApi.reducerPath]: tokensApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tokensApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
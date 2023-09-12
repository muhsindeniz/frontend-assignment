import { Action, ThunkAction, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import registerReducer from "../slices/registerJobSeekSlice";
import userReducer from '../slices/userSlice'

const store = configureStore({
  reducer: {
    register: registerReducer,
    user: userReducer,
  },
  middleware: getDefaultMiddleware({
    immutableCheck: process.env.NODE_ENV === "development",
    serializableCheck: process.env.NODE_ENV === "development",
  }),
  devTools: process.env.NODE_ENV !== "production",
});

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
export default store;

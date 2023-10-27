import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { intlSlice } from "./slices/intl.slice";
import { appSlice } from "./slices/app.slice";
import { userSlice } from "./slices/user.slice";
// ...
const store = configureStore({
  reducer: {
    intl: intlSlice.reducer,
    app: appSlice.reducer,
    user: userSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;

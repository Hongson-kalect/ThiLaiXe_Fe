import { RootState } from "../store";

export const selectAppInfo = (state: RootState) => state.app;

export const selectUserInfo = (state: RootState) => state.user;

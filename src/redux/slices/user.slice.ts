import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { appIntReduxType } from "src/interfaces/app.type";

type userIntReduxType = {
  id?: number;
  email?: string;
  role?: string;
  username?: string;
  isLogin?: boolean;
};

const initialState: userIntReduxType = {
  id: 0,
  email: "",
  role: "",
  username: "",
  isLogin: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<userIntReduxType>) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.role = action.payload.role;
      state.isLogin = true;
    },
  },
});

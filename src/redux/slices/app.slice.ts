import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { appIntReduxType } from "src/interfaces/app.type";

const initialState: appIntReduxType = {
  loading:false,
  anser: [],
  checkResult: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLoading:(state, action:PayloadAction<boolean>)=>{
      state.loading = action.payload
    },
    setAnser: (state, action: PayloadAction<number[]>) => {
      state.anser = action.payload;
    },
    setAnserIndex: (
      state,
      action: PayloadAction<{ index: number; value: number }>
    ) => {
      const tempArr = [...state.anser];
      tempArr[action.payload.index] = action.payload.value;
      state.anser = tempArr;
    },

    setCheckResult: (state, action: PayloadAction<boolean>) => {
      state.checkResult = action.payload;
    },
  },
});

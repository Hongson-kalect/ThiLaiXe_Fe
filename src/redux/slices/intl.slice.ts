import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import en from "src/languages/en.json";
import { intlValue } from "src/interfaces/intl";

const initialState: intlValue = {
  locale: "en",
  lang: en,
};

export const intlSlice = createSlice({
  name: "intl",
  initialState,
  reducers: {
    setLang: (state, action: PayloadAction<any>) => {
      state.lang = action.payload;
    },
    setLocale: (state, action: PayloadAction<string>) => {
      state.locale = action.payload;
    },
  },
});

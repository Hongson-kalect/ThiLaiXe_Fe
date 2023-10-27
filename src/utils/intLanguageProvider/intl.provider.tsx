import * as React from "react";
import vi from "src/languages/vi.json";
import en from "src/languages/en.json";
import { IntlProvider } from "react-intl";
import { useAppDispatch, useAppSelector } from "src/redux/store";
import { intlSlice } from "src/redux/slices/intl.slice";

export interface IIntWrapperProps {
  children: React.ReactNode;
}

let webLocale = "en";
if (global.navigator) webLocale = global.navigator.language;

export default function IntlLanguageProvider({ children }: IIntWrapperProps) {
  const dispatch = useAppDispatch();
  const { locale, lang } = useAppSelector((state) => state.intl);
  React.useEffect(() => {
    if (["vi-VN", "vi"].includes(locale)) {
      dispatch(intlSlice.actions.setLang(vi));
    } else dispatch(intlSlice.actions.setLang(en));
  }, [dispatch, locale]);

  return (
    <IntlProvider locale={webLocale} messages={lang} defaultLocale="en-US">
      {children}
    </IntlProvider>
  );
}

import * as React from "react";

import "./auth.scss";
import { ResetPassForm } from "./components/resetPassword.form";

export interface ISignupProps {}

export function ResetPassword(props: ISignupProps) {
  return (
    <div className="change-pass-page">
      <ResetPassForm />
    </div>
  );
}

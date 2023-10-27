import * as React from "react";

import "./auth.scss";
import { ChangePassForm } from "./components/changePassword.form";

export interface ISignupProps {}

export function ChangePass(props: ISignupProps) {
  return (
    <div className="change-pass-page">
      <ChangePassForm />
    </div>
  );
}

import * as React from "react";
import { SignUpForm } from "./components/signUp.form";

export interface ISignupProps {}

export function Signup(props: ISignupProps) {
  return (
    <div className="sign-up-page">
      <SignUpForm />
    </div>
  );
}

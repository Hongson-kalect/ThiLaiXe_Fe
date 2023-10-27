import { useState } from "react";

import "./auth.scss";
import { LoginForm } from "./components/login.form";
import { loginValueType } from "src/interfaces/auth.type";

type Props = {};

export default function Login({}: Props) {
  return (
    <div className="login-page">
      <LoginForm />
    </div>
  );
}

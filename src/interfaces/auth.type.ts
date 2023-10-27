export type loginValueType = {
  email: string;
  password: string;
};

export type VerifyParams = {
  email: string;
  type?: "signUp" | "changePassword" | "resetPassword";
  value: string;
};

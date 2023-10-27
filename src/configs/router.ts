const router = {
  login: "/auth/sign-in",
  signUp: "/auth/sign-up",
  changePassword: "/auth/change-password",
  forgotPassword: "/auth/forgot-password",
  resetPassword: "/auth/reset-password",
  home: "/",

  testOptions: "/test-option",
  tip: "/tip",

  question: "/question",
  addQuestion: "/question/add",
  editQuestion: "/question/:id",

  exam: "/exam",
  examId: "/exam/:id",
  startExam: "/start-exam",

  profile: "/profile",
  account: "/account",
  record: "/record",
  recordId: "/record/:id",

  employee: "/employee",
  addAndUpdateEmployee: "/employee/create-or-update",
  settings: "/settings",
  resetPasswordSetting: "/settings/change-password",
  changeCompanyInformation: "/settings/change-company-information",
  notFound: "*",
};

export default router;

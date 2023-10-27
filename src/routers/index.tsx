import { Suspense } from "react";
import { Outlet, createBrowserRouter } from "react-router-dom";

import config from "src/configs";
import DefaultLayout from "src/layouts/defaultLayout/default.layout";
import HomeLayout from "src/layouts/homeLayout/home.layout";
import Login from "src/pages/auth/login.page";
import { Signup } from "src/pages/auth/signUp.page";
import { Exam } from "src/pages/exam/exam.page";
import ExamTip from "src/pages/examTip/examTip.page";
import HomePage from "src/pages/home/home.page";
import Profile from "src/pages/profile/profile.page";
import AddQuestionPage from "src/pages/question/addQuestion.page";
import EditQuestionPage from "src/pages/question/editQuestion.page";
import Question from "src/pages/question/question.page";
import { StartExam } from "src/pages/startExam/startExam.page";
import Test from "src/pages/test";
import TestOptions from "src/pages/testOptions/testOptions.page";
import * as Pages from "src/routers/pages";
import ProtectedRouter from "./ProtectedRouter";
import AdminRouter from "./AdminRouter";
import { AccountPage } from "src/pages/account/account.page";
import { RecordPage } from "src/pages/record/record.page";
import { ChangePass } from "src/pages/auth/changePassword.page";
import { ResetPassword } from "src/pages/auth/resetPassword.page";
import QuestionForm from "src/pages/question/components/questionForm";
import { CheckRecordPage } from "src/pages/record/checkRecord.page";
import { CheckExamPage } from "src/pages/exam/checkExam.page";

const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      {
        element: <HomeLayout />,
        children: [
          { element: <HomePage />, path: config.router.home },
          { element: <Question />, path: config.router.question },

          { element: <TestOptions />, path: config.router.testOptions },
          { element: <StartExam />, path: config.router.startExam },
          { element: <ExamTip />, path: config.router.tip },
        ],
      },
      {
        element: <Outlet />,
        children: [
          { element: <Login />, path: config.router.login },
          { element: <ChangePass />, path: config.router.changePassword },
          { element: <ResetPassword />, path: config.router.forgotPassword },
          { element: <Signup />, path: config.router.signUp },
        ],
      },
      {
        element: <ProtectedRouter />,
        children: [
          {
            element: <HomeLayout />,
            children: [
              {
                element: <Profile />,
                path: config.router.profile,
              },
              {
                element: <RecordPage />,
                path: config.router.record,
              },
              {
                element: <CheckRecordPage />,
                path: config.router.recordId,
              },
            ],
          },
        ],
      },
      {
        element: <AdminRouter />,
        children: [
          {
            element: <HomeLayout />,
            children: [
              {
                element: <AccountPage />,
                path: config.router.account,
              },
              { element: <Exam />, path: config.router.exam },
              { element: <CheckExamPage />, path: config.router.examId },
              { element: <QuestionForm />, path: config.router.addQuestion },
              { element: <QuestionForm />, path: config.router.editQuestion },
            ],
          },
        ],
      },
      {
        element: (
          <Suspense fallback={<div>loading icon</div>}>
            <div>not found page</div>
            {/* <Pages.NotFoundPage /> */}
          </Suspense>
        ),
        path: config.router.notFound,
      },
    ],
  },
]);

export default router;

import React from "react";
import { CustomTitle } from "src/components/CustomText/CustomText";
import Layout from "src/components/Layout/Layout";
import QuestionForm from "./components/questionForm";

type Props = {};

const AddQuestionPage = (props: Props) => {
  return (
    <Layout className="question-page">
      <div className="top">
        <CustomTitle>Add new question</CustomTitle>
      </div>
      <div className="body">
        <div className="content">
          <QuestionForm />
        </div>
      </div>
    </Layout>
  );
};

export default AddQuestionPage;

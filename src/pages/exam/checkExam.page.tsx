import { useEffect, useState } from "react";

import "./Exam.scss";
import { Button, Modal, Select } from "antd";
import Loading from "src/components/Loading/Loading";
import Layout from "src/components/Layout/Layout";
import config from "src/configs";
import { scrollToId } from "../utils/utils";
import { useQuery } from "@tanstack/react-query";
import { ResultModal } from "../startExam/components/resultModal";
import { recordUtil } from "../utils/record.util";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "src/redux/store";
import { appSlice } from "src/redux/slices/app.slice";
import { QuestionList } from "./components/question.list";
import { examUtil } from "../utils/exam.utils";

export interface ICheckExamPageProps {}

export function CheckExamPage(props: ICheckExamPageProps) {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const getExamById = async () => {
    return await examUtil.getExamById(params.id || "0");
  };
  const { data: exam } = useQuery({
    queryFn: getExamById,
    queryKey: ["getExam"],
  });

  const handleQuestionLabelClick = (id: number) => {
    scrollToId("question-" + id);
  };

  useEffect(() => {
    if (exam) {
      dispatch(appSlice.actions.setAnser(exam.ansers));
    }
  }, [exam]);

  if (!exam) return <Loading />;

  return (
    <Layout
      leftNavWidth="15%"
      rightNavWidth="25%"
      contentBackGround="white"
      rightNavBackGround="white"
      bodyGap="12px"
      className="check-exam-page"
    >
      <div className="body">
        <div className="left-nav"></div>
        <Layout className="content hide-scroll">
          <div className="top">
            <h1
              style={{ textAlign: "center" }}
            >{`${exam?.type?.toUpperCase()} - ${exam.name}`}</h1>
          </div>
          {exam.questions ? (
            <QuestionList list={exam.questions} />
          ) : (
            <Loading />
          )}
        </Layout>
        <Layout className="right-nav">
          <div className="body">
            <Layout className="content" bottomHeight="50px">
              <div className="top">
                <p>Danh sách câu hỏi</p>
              </div>
              <div className="body">
                <div className="content ">
                  <div className="question-label-list">
                    {exam.questions.map((item: any, index: number) => {
                      return (
                        <div
                          key={index}
                          className={`question-label`}
                          onClick={() => handleQuestionLabelClick(index)}
                        >
                          {"Câu " + (index + 1)}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="bottom">
                <Button
                  size="large"
                  type="primary"
                  danger
                  onClick={() => {
                    navigate(config.router.home);
                  }}
                >
                  Về trang chủ
                </Button>
              </div>
            </Layout>
          </div>
        </Layout>
      </div>
    </Layout>
  );
}

import { useEffect, useState } from "react";

import "./startExam.scss";
import { clearLocalStorage, getLocalStorage } from "src/utils/localstorage";
import constants from "src/constants";
import { examUtil } from "../utils/exam.utils";
import { QuestionType } from "src/interfaces/question.type";
import { ExamEachLayout } from "./components/eachLayout";
import { Button, Modal, Select } from "antd";
import Loading from "src/components/Loading/Loading";
import Layout from "src/components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import config from "src/configs";
import { ExamListLayout } from "./components/listLayout";
import { scrollToId } from "../utils/utils";
import { useAppDispatch, useAppSelector } from "src/redux/store";
import { selectAppInfo, selectUserInfo } from "src/redux/selector/app.selector";
import { appSlice } from "src/redux/slices/app.slice";
import { ExamType } from "src/interfaces/exam.type";
import { ResultModal } from "./components/resultModal";

export interface IStartExamProps {}

let countDown: NodeJS.Timeout;

export function StartExam(props: IStartExamProps) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [exam, setExam] = useState<ExamType>();

  const [remainTime, setRemainTime] = useState<number>(3600);
  const { anser, checkResult } = useAppSelector(selectAppInfo);
  const { isLogin, id } = useAppSelector(selectUserInfo);
  const [questionIndex, setQuestionIndex] = useState(-1);
  const [currentQuestion, setCurrentQuestion] = useState<QuestionType>();
  const [pageLayout, setPageLayout] = useState<"list" | "each">("list");

  const [resultModal, setResultModal] = useState(false);

  const getExam = async (id: number, type: string) => {
    const data = await examUtil.getExamById(id);
    if (data) {
      startExam(data);
    }
  };
  const getExamRandom = async (type: string) => {
    const data = await examUtil.getExamByType(type);
    if (data) {
      startExam(data);
    }
  };

  const startExam = (data: ExamType) => {
    setExam(data);
    setQuestionIndex(0);
    dispatch(
      appSlice.actions.setAnserIndex({
        index: data?.questions?.length ? data?.questions?.length - 1 : 0,
        value: -1,
      })
    );
    setRemainTime(
      data.type === "b1"
        ? 1200
        : data.type === "b2"
        ? 1320
        : data.type === "c"
        ? 1440
        : data.type === "def"
        ? 1560
        : 1140
    );
  };

  const handleQuestionLabelClick = (id: number) => {
    setQuestionIndex(id);
    scrollToId("question-" + id);
  };

  const submitAnser = async () => {
    if (exam) {
      let data: ExamType;
      if (isLogin && exam.id) {
        setIsLoading(true);
        data = await examUtil.submitAndSaveAnser({
          anser,
          examId: exam.id,
          questionId: exam.questionId,
        });
      } else {
        data = await examUtil.submitAnser({
          anser,
          examId: exam.id,
          questionId: exam.questionId,
        });
      }
      setIsLoading(false);

      if (data?.questions) {
        const tempQuestions = exam?.questions?.map((question, index) => {
          return { ...question, ...data.questions?.[index] };
        });
        setExam({ ...exam, ...data, questions: tempQuestions });
      }
      setResultModal(true);

      dispatch(appSlice.actions.setCheckResult(true));

      clearInterval(countDown);
    }
  };

  useEffect(() => {
    const examId = getLocalStorage(constants.LOCALSTORAGE.examId);
    const examType = getLocalStorage(constants.LOCALSTORAGE.examType);

    if (!examType) {
      alert("Bạn chưa chọn đề bài");
      navigate(config.router.home);
    }
    setIsLoading(true);

    if (examId) {
      getExam(examId, examType);
    } else {
      getExamRandom(examType);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (exam?.questions) {
      setCurrentQuestion(exam.questions[questionIndex]);
    }
  }, [questionIndex, exam]);

  useEffect(() => {
    countDown = setInterval(() => {
      setRemainTime((prev) => {
        return prev ? prev - 1 : 0;
      });
    }, 1000);
    return () => clearInterval(countDown);
  }, []);

  useEffect(() => {
    if (remainTime === 0) {
      submitAnser();
      clearInterval(countDown);
    }
  }, [remainTime]);

  useEffect(() => {
    return () => {
      dispatch(appSlice.actions.setCheckResult(false));
      dispatch(appSlice.actions.setAnser([]));
    };
  }, []);

  useEffect(() => {
    dispatch(appSlice.actions.setLoading(isLoading));
  }, [isLoading]);

  if (!exam?.questions) return <Loading />;

  return (
    <Layout
      leftNavWidth="15%"
      rightNavWidth="25%"
      contentBackGround="white"
      rightNavBackGround="white"
      bodyGap="12px"
      className={`do-exam-page ${checkResult ? "check-result" : ""}`}
    >
      <div className="body">
        <div className="left-nav"></div>
        <Layout className="content hide-scroll">
          <div className="top">
            <h1
              style={{ textAlign: "center" }}
            >{`${exam?.type?.toUpperCase()} - ${exam.name}`}</h1>
          </div>
          {currentQuestion && exam.questions ? (
            pageLayout === "list" ? (
              <ExamListLayout list={exam.questions} />
            ) : (
              <ExamEachLayout
                questionIndex={questionIndex}
                list={exam.questions}
                setQuestionIndex={setQuestionIndex}
                question={currentQuestion}
              />
            )
          ) : (
            <Loading />
          )}
        </Layout>
        <Layout className="right-nav" topHeight="72px">
          <div className="top">
            {remainTime ? (
              <p>
                <b>{"Còn: "}</b>
                {`${Math.floor(remainTime / 60)} phút ${remainTime % 60} giây`}
              </p>
            ) : (
              <p>
                <b>Hết giờ</b>
              </p>
            )}

            <Select
              value={pageLayout}
              options={[
                { value: "list", label: "List Layout" },
                { value: "each", label: "Each Layout" },
              ]}
              onChange={(e: "list" | "each") => setPageLayout(e)}
            />
          </div>
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
                          className={`question-label ${
                            currentQuestion?.id === item.id ? "active " : " "
                          } ${
                            typeof anser[index] === "number" &&
                            anser[index] > -1
                              ? "ansered"
                              : ""
                          } ${
                            anser[index] === exam?.questions?.[index].correct
                              ? "correct"
                              : "wrong"
                          } ${
                            exam?.questions?.[index].require ? "require" : ""
                          }`}
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
                    if (checkResult) navigate(config.router.home);
                    else if (window.confirm("Nộp bài?")) submitAnser();
                  }}
                >
                  {checkResult ? "Về trang chủ" : "Nộp bài"}
                </Button>
              </div>
            </Layout>
          </div>
        </Layout>
      </div>
      <Modal
        open={resultModal}
        closable={false}
        footer={false}
        onCancel={() => setResultModal(false)}
      >
        <ResultModal exam={exam} onCancel={() => setResultModal(false)} />
      </Modal>
    </Layout>
  );
}

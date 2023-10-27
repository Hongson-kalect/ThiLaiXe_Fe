import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Button, Skeleton } from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CustomFlexBox } from "src/components/FlexBox/FlexBox";
import Layout from "src/components/Layout/Layout";
import config from "src/configs";
import { QuestionType } from "src/interfaces/question.type";
import { deleteQuestionUtil } from "src/pages/utils/question.util";
import { selectUserInfo } from "src/redux/selector/app.selector";
import { useAppSelector } from "src/redux/store";

export interface IQuestionEachLayoutProps {
  list: QuestionType[];
  total: number;
}

export function QuestionEachLayout({ list, total }: IQuestionEachLayoutProps) {
  const navigate = useNavigate();
  const [question, setQuestion] = useState<QuestionType>(list[0]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState(false);
  const { role } = useAppSelector(selectUserInfo);

  const handleDeleteQuestion = async (id: number) => {
    const data = await deleteQuestionUtil({ id });
    if (data.status === 200) toast.success("Xóa thành công");
  };

  useEffect(() => {
    if (question?.image !== list[questionIndex]?.image) setImageLoading(true);
    setQuestion(list[questionIndex]);
  }, [questionIndex]);

  useEffect(() => {
    if (list.length) setQuestion(list[0]);
  }, [list]);

  if (!question) return <div>Loading...</div>;

  return (
    <Layout
      className="question-each-layout"
      leftNavWidth="15%"
      rightNavWidth="25%"
      bodyGap="8px"
      contentBackGround="white"
      rightNavBackGround="white"
    >
      <div className="body">
        <div className="left-nav"></div>
        <Layout
          className="content question-each-item"
          bottomHeight="64px"
          topBottomGap="25%"
        >
          <div className="body">
            <div className="content">
              {question ? (
                <div className="question-info">
                  <CustomFlexBox
                    alignitem="center"
                    gap="8px"
                    justify="space-between"
                  >
                    <div
                      className={`title ${question.require ? "require" : ""}`}
                      id={"question-" + question.id}
                    >
                      <span>{"Câu  hỏi " + question.id + ": "}</span>
                      {question.title}
                    </div>

                    {role === "admin" ? (
                      <CustomFlexBox alignitem="center" gap="4px">
                        <div
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            navigate(config.router.question + "/" + question.id)
                          }
                        >
                          <EditFilled />
                        </div>
                        <div onClick={() => handleDeleteQuestion(question.id)}>
                          <DeleteFilled
                            style={{
                              fontSize: "18px",
                              color: "red",
                              cursor: "pointer",
                            }}
                          />
                        </div>
                      </CustomFlexBox>
                    ) : null}
                  </CustomFlexBox>

                  {question.image ? (
                    <div className={`image ${imageLoading ? "loading" : ""}`}>
                      <img
                        onLoad={() => setImageLoading(false)}
                        src={question.image}
                        alt="Ảnh câu hỏi"
                      />
                    </div>
                  ) : null}
                  {question.ansers.map((anser, index) => {
                    return (
                      <p
                        key={index}
                        className={`anser ${
                          index === question.correct ? "correct" : ""
                        }`}
                      >{`${index + 1}. ${anser}`}</p>
                    );
                  })}
                  {question.explain ? (
                    <div className={`explain`}>{question.explain}</div>
                  ) : null}
                </div>
              ) : (
                <Skeleton />
              )}
            </div>
          </div>

          <div className="bottom">
            <Button
              danger
              disabled={questionIndex === 0}
              onClick={() => setQuestionIndex((prev) => prev - 1)}
            >
              Về câu trước
            </Button>
            <Button
              type="primary"
              disabled={questionIndex === list.length - 1}
              onClick={() => setQuestionIndex((prev) => prev + 1)}
            >
              Đến câu tiếp theo
            </Button>
          </div>
        </Layout>
        <Layout className="right-nav">
          <div className="top">
            <p>Danh sách câu hỏi</p>
          </div>
          <div className="body">
            <div className="content">
              <div className="question-label-list">
                {list.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className={`question-label ${
                        question.id === item.id ? "active" : ""
                      }`}
                      onClick={() => setQuestionIndex(index)}
                    >
                      {"Câu " + item.id}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Layout>
      </div>
    </Layout>
  );
}

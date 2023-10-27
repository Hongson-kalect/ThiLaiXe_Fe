import { Button, Radio, Space } from "antd";
import { useState, useEffect, useMemo } from "react";
import { CustomButton } from "src/components/CustomButton/CustomButton";
import Layout, { CustomCol } from "src/components/Layout/Layout";
import { QuestionType } from "src/interfaces/question.type";
import { scrollToId } from "src/pages/utils/utils";
import { selectAppInfo } from "src/redux/selector/app.selector";
import { appSlice } from "src/redux/slices/app.slice";
import { useAppDispatch, useAppSelector } from "src/redux/store";

export interface IExamEachLayoutProps {
  questionIndex: number;
  setQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
  list: QuestionType[];
  question: QuestionType;
}

export function ExamEachLayout({
  questionIndex,
  question,
  list,
  setQuestionIndex,
}: IExamEachLayoutProps) {
  const dispatch = useAppDispatch();
  const { anser, checkResult } = useAppSelector(selectAppInfo);

  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    setImageLoading(true);
  }, [questionIndex]);

  return (
    <Layout className="question-info" bottomHeight="10%">
      <div className="body">
        <div className="content">
          <div
            className={`title ${question.require ? "require" : ""}`}
            id={"question-" + question.id}
          >
            <span>
              {questionIndex !== undefined
                ? "Câu  hỏi " + (questionIndex + 1) + ": "
                : "Câu hỏi: "}
            </span>
            {question.title}
          </div>
          {question.image ? (
            <div className={`image ${imageLoading ? "loading" : ""}`}>
              <img
                onLoad={() => setImageLoading(false)}
                src={question.image}
                alt="Ảnh câu hỏi"
              />
            </div>
          ) : null}
          <Radio.Group
            disabled={checkResult}
            className="questions-group"
            name={"question-" + questionIndex}
            value={anser[questionIndex]}
          >
            <Space direction="vertical" style={{ paddingLeft: "8px" }}>
              {question.ansers.map((anser2, index: number) => {
                return (
                  <Radio
                    key={index}
                    className={`radio-item ${
                      anser[questionIndex] === index ? "selected" : ""
                    } ${question.correct === index ? "correct" : "wrong"}`}
                    value={index}
                    onChange={(e) =>
                      dispatch(
                        appSlice.actions.setAnserIndex({
                          index: questionIndex,
                          value: index,
                        })
                      )
                    }
                  >
                    {anser2}
                  </Radio>
                );
              })}
            </Space>
          </Radio.Group>
          {question.correct !== anser[questionIndex] && question.explain ? (
            <div className={`explain`}>{question.explain}</div>
          ) : null}
        </div>
      </div>
      <div className="bottom">
        <CustomCol span={20} justify="space-between">
          <Button
            type="primary"
            size="large"
            danger
            disabled={questionIndex === 0}
            onClick={() => setQuestionIndex((prev) => prev - 1)}
          >
            Về câu trước
          </Button>
          <Button
            type="primary"
            size="large"
            disabled={questionIndex === list.length - 1}
            onClick={() => setQuestionIndex((prev) => prev + 1)}
          >
            Đến câu sau
          </Button>
        </CustomCol>
      </div>
    </Layout>
  );
}

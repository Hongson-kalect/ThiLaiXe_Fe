import { Radio, Space } from "antd";
import * as React from "react";
import { QuestionType } from "src/interfaces/question.type";
import { selectAppInfo } from "src/redux/selector/app.selector";
import { appSlice } from "src/redux/slices/app.slice";
import { useAppDispatch, useAppSelector } from "src/redux/store";

export interface IQuestionItemProps {
  index: number;
  question: QuestionType;
}

export function QuestionItem({ question, index }: IQuestionItemProps) {
  const { anser, checkResult } = useAppSelector(selectAppInfo);
  const dispatch = useAppDispatch();

  return (
    <div className="question-list-item">
      <div
        className={`title ${question.require ? "require" : ""}`}
        id={"question-" + index}
      >
        <span>
          {index !== undefined
            ? "Câu  hỏi " + (index + 1) + ": "
            : "Câu hỏi : "}
        </span>
        {question.title}
      </div>
      {question.image ? (
        <div className="image">
          <img src={question.image} alt="Ảnh câu hỏi" />
        </div>
      ) : null}

      <Radio.Group
        disabled={checkResult}
        value={anser[index]}
        className="questions-group"
        name={"question-" + index}
      >
        <Space direction="vertical" style={{ paddingLeft: "8px" }}>
          {question.ansers.map((questionAnser, i) => {
            return (
              <Radio
                className={`radio-item ${
                  anser[index] === i ? "selected" : ""
                } ${question.correct === i ? "correct" : "wrong"}`}
                key={i}
                value={i}
                onChange={() =>
                  dispatch(
                    appSlice.actions.setAnserIndex({
                      index: index || 0,
                      value: i,
                    })
                  )
                }
              >
                {questionAnser}
              </Radio>
            );
          })}
        </Space>
      </Radio.Group>
      {question.correct !== anser[index] && question.explain ? (
        <div className={`explain`}>{question.explain}</div>
      ) : null}
    </div>
  );
}

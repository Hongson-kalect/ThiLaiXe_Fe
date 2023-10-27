import { Radio, Space } from "antd";
import * as React from "react";
import { QuestionType } from "src/interfaces/question.type";

export interface ITrainingItemProps {
  anser: number;
  setAnser: React.Dispatch<React.SetStateAction<number>>;
  question: QuestionType;
}

export function TrainingItem({
  question,
  anser,
  setAnser,
}: ITrainingItemProps) {
  return (
    <div className="training-item">
      <div className={`title ${question.require ? "require" : ""}`}>
        {question.title}
      </div>
      {question.image ? (
        <div className="image">
          <img src={question.image} alt="Ảnh câu hỏi" />
        </div>
      ) : null}

      <Radio.Group
        className="questions-group"
        onChange={(e) => setAnser(e.target.value)}
        value={anser}
        disabled={anser > -1}
      >
        <Space direction="vertical" style={{ paddingLeft: "8px" }}>
          {question.ansers.map((questionAnser, i) => {
            return (
              <Radio
                className={`radio-item ${anser === i ? "selected" : ""}  ${
                  anser > -1 && question.correct === i ? "correct" : "wrong"
                }`}
                key={i}
                value={i}
              >
                {questionAnser}
              </Radio>
            );
          })}
        </Space>
      </Radio.Group>
      {anser > -1 && question.explain ? (
        <div className={`explain`}>{question.explain}</div>
      ) : null}
    </div>
  );
}

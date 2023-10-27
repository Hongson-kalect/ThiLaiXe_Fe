import * as React from "react";
import Layout from "src/components/Layout/Layout";
import { QuestionType } from "src/interfaces/question.type";
import { QuestionItem } from "./question.item";

export interface IExamListLayoutProps {
  list: QuestionType[];
}

export function QuestionList({ list }: IExamListLayoutProps) {
  return (
    <div className="question-list">
      {/* <div className="top">Danh sách câu hỏi</div> */}

      {list.map((item, index: number) => {
        return <QuestionItem question={item} key={index} index={index} />;
      })}
    </div>
  );
}

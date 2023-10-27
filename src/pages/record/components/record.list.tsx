import * as React from "react";
import Layout from "src/components/Layout/Layout";
import { QuestionType } from "src/interfaces/question.type";
import { scrollToId } from "src/pages/utils/utils";
import { Pagination } from "antd";
import { useCustomParams } from "src/hooks/useCustomParams";
import { useAppDispatch } from "src/redux/store";
import { RecordItem } from "./record.item";

export interface IExamListLayoutProps {
  list: QuestionType[];
}

export function RecordList({ list }: IExamListLayoutProps) {
  return (
    <div className="question-list">
      {/* <div className="top">Danh sách câu hỏi</div> */}

      {list.map((item, index: number) => {
        return <RecordItem question={item} key={index} index={index} />;
      })}
    </div>
  );
}

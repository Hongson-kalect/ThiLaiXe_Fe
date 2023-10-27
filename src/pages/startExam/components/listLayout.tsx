import * as React from "react";
import Layout from "src/components/Layout/Layout";
import { QuestionType } from "src/interfaces/question.type";
import { scrollToId } from "src/pages/utils/utils";
import { Pagination } from "antd";
import { useCustomParams } from "src/hooks/useCustomParams";
import { useAppDispatch } from "src/redux/store";
import { QuestionItem } from "./questionItem";

export interface IExamListLayoutProps {
  list: QuestionType[];
}

export function ExamListLayout({ list }: IExamListLayoutProps) {
  const { params, setParams } = useCustomParams();

  const handlePageChange = (page: number) => {
    setParams({
      ...params,
      page: page.toString(),
    });
  };
  return (
    <div className="question-list">
      {/* <div className="top">Danh sách câu hỏi</div> */}

      {list.map((item, index: number) => {
        return <QuestionItem question={item} key={index} index={index} />;
      })}
    </div>
  );
}

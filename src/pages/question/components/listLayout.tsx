import * as React from "react";
import Layout from "src/components/Layout/Layout";
import { QuestionType } from "src/interfaces/question.type";
import { QuestionItem } from "./questionItem";
import Question from "../question.page";
import { scrollToId } from "src/pages/utils/utils";
import { Pagination } from "antd";
import { useCustomParams } from "src/hooks/useCustomParams";

export interface IQuestionListLayoutProps {
  list: QuestionType[];
  total: number;
}

export function QuestionListLayout({ list, total }: IQuestionListLayoutProps) {
  const { params, setParams } = useCustomParams();

  const handlePageChange = (page: number) => {
    setParams({
      ...params,
      page: page.toString(),
    });
  };
  return (
    <Layout
      className="question-list-layout"
      leftNavWidth="15%"
      rightNavWidth="25%"
      bodyGap="8px"
      contentBackGround="white"
      rightNavBackGround="white"
    >
      {/* <div className="top">Danh sách câu hỏi</div> */}
      <div className="body">
        <div className="left-nav" />
        <div className="content question-list hide-scroll">
          {list.map((item, index: number) => {
            return <QuestionItem question={item} key={index} index={item.id} />;
          })}
        </div>
        <Layout className="right-nav" bottomHeight="48px">
          <div className="top">
            <p>Danh sách câu hỏi</p>
          </div>
          <div className="body">
            <div className="content">
              <div className="question-label-list">
                {list.map((item, index) => {
                  return (
                    <div
                      className="question-label"
                      key={index}
                      onClick={() => scrollToId("question-" + item.id)}
                    >
                      {"Câu " + item.id}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="bottom">
            <Pagination
              onChange={(page) => handlePageChange(page)}
              size="small"
              total={total}
              current={Number(params.page) || 1}
              pageSize={40}
              showSizeChanger={false}
            />
          </div>
        </Layout>
      </div>
    </Layout>
  );
}

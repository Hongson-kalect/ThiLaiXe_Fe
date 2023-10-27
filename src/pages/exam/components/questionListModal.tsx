import { useQuery } from "@tanstack/react-query";
import { Button } from "antd";
import { useMemo, useState } from "react";
import { CustomTable } from "src/components/CustomTable/CustomTable";
import Layout from "src/components/Layout/Layout";
import { useDebounce } from "src/hooks/useDebounce";
import { QuestionType } from "src/interfaces/question.type";
import { getQuestions } from "src/pages/utils/question.util";

export interface IQuestionListModalProps {
  questionFor: string;
  type: string;
  setQuestionList: any;
  onOk: () => void;
}

export function QuestionListModal(props: IQuestionListModalProps) {
  const [search, setSearch] = useState("");
  const searchDebounce = useDebounce(search);

  const getQuestionsQuery = async () => {
    return await getQuestions({
      search: searchDebounce,
      for: props.questionFor,
      type: props.type !== "require" ? props.type : "",
      require: props.type === "require" ? true : false,
      getAll: true,
    });
  };

  const { data: questionsData, isLoading } = useQuery<{
    questions: QuestionType[];
    total: number;
  }>({
    queryKey: ["getQuestions", searchDebounce, props],
    queryFn: getQuestionsQuery,
    keepPreviousData: true,
  });

  const tableColumns = useMemo(() => {
    return [
      { title: "ID", dataIndex: "id", key: "id" },
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
      },
      {
        title: "Image",
        dataIndex: "image",
        key: "image",
        render: (image: string) =>
          image ? (
            <img src={image} width="64px" height="32px" alt="Ảnh câu hỏi" />
          ) : null,
      },
    ];
  }, []);

  return (
    <Layout height="76vh" className="question-list-modal">
      <div className="body">
        <div className="content">
          <div className="filter">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <CustomTable
            loading={isLoading}
            rowSelection={{
              onChange(selectedRowKeys, selectedRows, info) {
                props.setQuestionList((prev: any) => ({
                  ...prev,
                  [props.type]: [...selectedRowKeys],
                }));
              },
            }}
            columns={tableColumns}
            rowKey={"id"}
            dataSource={questionsData?.questions}
          />
        </div>
      </div>

      <div className="bottom">
        <Button onClick={props.onOk}>Close</Button>
      </div>
    </Layout>
  );
}

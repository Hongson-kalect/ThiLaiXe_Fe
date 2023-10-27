import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";

import "./question.scss";
import { useCustomParams } from "src/hooks/useCustomParams";
import { getQuestions } from "../utils/question.util";
import { QuestionType, getQuestionParams } from "src/interfaces/question.type";
import Layout from "src/components/Layout/Layout";
import { CustomTitle } from "src/components/CustomText/CustomText";
import { Button, FloatButton, Modal, Select } from "antd";
import { QuestionListLayout } from "./components/listLayout";
import { QuestionEachLayout } from "./components/eachLayout";
import Loading from "src/components/Loading/Loading";
import { useDebounce } from "src/hooks/useDebounce";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { TrainingModal } from "./components/trainingModal";
import { useNavigate } from "react-router-dom";
import config from "src/configs";
import { appSlice } from "src/redux/slices/app.slice";
import { useAppDispatch } from "src/redux/store";

type Props = {};

const Question = (props: Props) => {
  const { params, setParams } = useCustomParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [helpModal, setHelpModal] = useState(false);
  const [pageLayout, setPageLayout] = useState<"list" | "each">(
    params.getAll ? "each" : "list"
  );
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [questionTotal, setQuestionTotal] = useState<number>(0);
  const [search, setSearch] = useState(params.search || "");
  const searchDebounce = useDebounce(search);
  const [training, setTraining] = useState(false);
  const [trainingAnser, setTrainingAnser] = useState(-1);

  const getQuestionsQuery = async () => {
    if (pageLayout === "list") {
      const param = (({ getAll, ...res }) => res)(params);
      return await getQuestions(param);
    }
    return await getQuestions(params);
  };

  const { data: questionsData, isLoading } = useQuery<{
    questions: QuestionType[];
    total: number;
  }>({
    queryKey: ["getQuestions", params],
    queryFn: getQuestionsQuery,
    keepPreviousData: true,
  });

  useEffect(() => {
    if (questionsData) {
      setQuestions(questionsData?.questions);
      setQuestionTotal(questionsData.total);
    }
  }, [questionsData]);

  useEffect(() => {
    if (searchDebounce === "") {
      delete params.search;
      setParams({
        ...params,
      });
    } else {
      if (params.search !== searchDebounce)
        setParams({
          ...params,
          search: searchDebounce,
        });
    }
  }, [searchDebounce]);

  useEffect(() => {
    let tempParams;
    if (pageLayout === "each") setParams({ ...params, getAll: "true" });
    else {
      params.getAll && delete params.getAll;
      setParams(params);
    }
  }, [pageLayout]);
  // return <div>cc</div>;

  useEffect(() => {
    dispatch(appSlice.actions.setLoading(isLoading));
  }, [isLoading]);

  return (
    <>
      <Layout className="question-page" backGround="#eee">
        <div className="top">
          <input
            type="text"
            placeholder="Từ khóa tìm kiếm..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Select
            placeholder="Loại bằng"
            defaultValue={params.for || "a1"}
            onChange={(value) => {
              setParams({ ...params, for: value });
            }}
            options={[
              { value: "a1", label: "Bằng A1" },
              { value: "a2", label: "Bằng A2" },
              { value: "a34", label: "A3 và A4" },
              { value: "b1", label: "Bằng B1" },
              { value: "b2cdef", label: "B2, C, D, E, F" },
            ]}
          />
          <Select
            placeholder="Loại câu hỏi"
            defaultValue={params.type || ""}
            onChange={(value) => {
              setParams({ ...params, type: value });
            }}
            options={[
              { value: "", label: "Tất cả Loại câu hỏi" },
              { value: "T1", label: "KN và Quy tác đường bộ" },
              { value: "T2", label: "Nghiệp vụ vận tải" },
              {
                value: "T3",
                label: "Văn hóa giao thông và đạo đức người lái xe",
              },
              { value: "T4", label: "Ký thuật lái xe" },
              { value: "T5", label: "Cấu tạo và sửa chữa" },
              { value: "T6", label: "Hệ thống biển báo đường bộ" },
              { value: "T7", label: "Giải sa hình & tình huống" },
            ]}
          />
          <Select
            value={pageLayout}
            onChange={(value) => {
              setPageLayout(value);
            }}
            options={[
              { value: "list", label: "Loại danh sách" },
              { value: "each", label: "Loại tuần tự" },
            ]}
          />

          <Button type="primary" onClick={() => setTraining(true)}>
            Luyện tập
          </Button>
          <Button
            type="primary"
            onClick={() => navigate(config.router.addQuestion)}
          >
            Thêm câu hỏi
          </Button>
        </div>
        <div className="body">
          <div className="content">
            {questions ? (
              pageLayout === "list" ? (
                <QuestionListLayout list={questions} total={questionTotal} />
              ) : (
                <QuestionEachLayout list={questions} total={questionTotal} />
              )
            ) : (
              <Loading />
            )}
          </div>
        </div>
      </Layout>

      <FloatButton
        icon={<QuestionCircleOutlined />}
        onClick={() => setHelpModal(true)}
        type="primary"
        style={{ right: 48 }}
      />

      <Modal
        className="questions-help-modal"
        open={helpModal}
        onCancel={() => setHelpModal(false)}
        closable={false}
        footer={false}
        width={800}
      >
        <ul>
          <li>
            <b>A1 - 200 câu hỏi</b>. Trong đó có 20 câu tình huống mất an toàn
            giao thông nghiêm trọng (KHÔNG bao gồm: 83 câu hỏi câu về khái niệm
            và quy tắc giao thông đường bộ, 26 câu về nghiệp vụ vận tải, 18 câu
            hỏi về văn hóa giao thông và đạo đức người lái xe, 44 câu về kỹ
            thuật lái xe và 35 câu về cấu tạo sửa chữa, 117 câu hỏi hệ thống
            biển báo hiệu đường bộ và 79 câu hỏi giải các thế sa hình và kỹ năng
            xử lý tình huống giao thông).
          </li>
          <li>
            <b>A2 - 450 câu hỏi</b>. Trong đó có 50 câu về tình huống mất an
            toàn giao thông nghiêm trọng (KHÔNG bao gồm: 05 câu hỏi khái niệm
            định nghĩa, 26 câu về nghiệp vụ vận tải, 17 câu hỏi về văn hóa giao
            thông, 39 câu về kỹ thuật lái xe ô tô và 35 câu về cấu tạo sửa chữa
            ô tô và 79 câu hỏi tình huống sa hình về điều khiển ô tô).
          </li>
          <li>
            <b>A3, A4 - 500 câu hỏi</b>. Trong đó có 54 câu về tình huống mất an
            toàn giao thông nghiêm trọng (KHÔNG bao gồm: 26 câu về nghiệp vụ vận
            tải, 35 câu về cấu tạo sửa chữa, 39 câu hỏi kỹ thuật lái xe).
          </li>
          <li>
            <b>B1 - 574 câu hỏi</b>. Có đủ 60 câu về tình huống mất an toàn giao
            thông nghiêm trọng (KHÔNG bao gồm 26 câu về nghiệp vụ vận tải).
          </li>
          <li>
            <b>B2, C, D, E, F - 200 câu hỏi</b>. Có đủ 60 câu về tình huống mất
            an toàn giao thông nghiêm trọng.
          </li>
          <li>
            <b>Câu điểm liệt - 60 câu</b>. Các câu hỏi điểm liệt có đề bài được
            tô màu đỏ. Trong bộ luật các câu điểm liệt không cố định VD với hạng
            A1 câu 1 là điểm liệt nhưng với A2 câu 1 chỉ là câu bình thường. Để
            thống nhất, mình sẽ sử dụng 60 điểm liệt trong trong danh sách chung
            600 câu làm các câu điểm liệt cho tất cả các loại bằng.
          </li>
          <li>
            <b>Luyện tập</b>. Tất cả các câu hỏi tìm kiếm sẽ được chọn ngẫu
            nhiên để bạn thực hành lần lượt. Nếu đang ở dạng danh sách, tối đa
            sẽ có 40 câu trên 1 lần, nếu bạn muốn luyện tập toàn bộ, vui lòng
            chọn hiển thị dạng tuần tự.
          </li>
          <li>
            <b>P/S - </b>. Bằng cách nào đó, trong bộ luật liệt kê hạng A1 lên
            đến 202 câu và 21 câu điểm liệt, với hạng A2 trong luật liệt kê 452
            câu với 54 câu điểm liệt. Với danh sách câu hỏi liệt chung, hạng A1
            sẽ có 21 câu điểm liệt, hạng A2 có 54 câu điểm liệt.
          </li>
        </ul>
      </Modal>

      <Modal
        className="training-modal"
        open={training}
        onCancel={() => {
          setTraining(false);
          setTrainingAnser(-2);
        }}
        closable={false}
        footer={false}
        width={800}
      >
        <TrainingModal
          questions={questions}
          anser={trainingAnser}
          setAnser={setTrainingAnser}
          onCancel={() => {
            setTraining(false);
            setTrainingAnser(-2);
          }}
        />
      </Modal>
    </>
  );
};

export default Question;

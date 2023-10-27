import { useEffect, useState } from "react";

import "./record.scss";
import { Button, Modal, Select } from "antd";
import Loading from "src/components/Loading/Loading";
import Layout from "src/components/Layout/Layout";
import config from "src/configs";
import { scrollToId } from "../utils/utils";
import { useQuery } from "@tanstack/react-query";
import { RecordList } from "./components/record.list";
import { ResultModal } from "../startExam/components/resultModal";
import { recordUtil } from "../utils/record.util";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "src/redux/store";
import { appSlice } from "src/redux/slices/app.slice";
import { selectAppInfo } from "src/redux/selector/app.selector";

export interface ICheckRecordPageProps {}

export function CheckRecordPage(props: ICheckRecordPageProps) {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [resultModal, setResultModal] = useState(true);
  const { anser } = useAppSelector(selectAppInfo);

  const getRecord = async () => {
    return await recordUtil.getRecord({ id: params.id || "0" });
  };
  const { data: record } = useQuery({
    queryFn: getRecord,
    queryKey: ["getRecord"],
  });

  const handleQuestionLabelClick = (id: number) => {
    scrollToId("question-" + id);
  };

  useEffect(() => {
    if (record) {
      dispatch(appSlice.actions.setAnser(record.ansers));
    }
  }, [record]);

  if (!record) return <Loading />;

  return (
    <Layout
      leftNavWidth="15%"
      rightNavWidth="25%"
      contentBackGround="white"
      rightNavBackGround="white"
      bodyGap="12px"
      className="check-record"
    >
      <div className="body">
        <div className="left-nav"></div>
        <Layout className="content hide-scroll">
          <div className="top">
            <h1
              style={{ textAlign: "center" }}
            >{`${record?.exam.type?.toUpperCase()} - ${record.exam.name}`}</h1>
          </div>
          {record.questions ? (
            <RecordList list={record.questions} />
          ) : (
            <Loading />
          )}
        </Layout>
        <Layout className="right-nav">
          <div className="body">
            <Layout className="content" bottomHeight="50px">
              <div className="top">
                <p>Danh sách câu hỏi</p>
              </div>
              <div className="body">
                <div className="content ">
                  <div className="question-label-list">
                    {record.questions.map((item: any, index: number) => {
                      return (
                        <div
                          key={index}
                          className={`question-label ${
                            item?.id === item.id ? "active " : " "
                          } ${
                            typeof anser[index] === "number" &&
                            anser[index] > -1
                              ? "ansered"
                              : ""
                          } ${
                            anser[index] === item.correct ? "correct" : "wrong"
                          } ${item.require ? "require" : ""}`}
                          onClick={() => handleQuestionLabelClick(index)}
                        >
                          {"Câu " + (index + 1)}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="bottom">
                <Button
                  size="large"
                  type="primary"
                  danger
                  onClick={() => {
                    navigate(config.router.home);
                  }}
                >
                  Về trang chủ
                </Button>
              </div>
            </Layout>
          </div>
        </Layout>
      </div>
      <Modal
        open={resultModal}
        closable={false}
        footer={false}
        onCancel={() => setResultModal(false)}
      >
        <ResultModal exam={record} onCancel={() => setResultModal(false)} />
      </Modal>
    </Layout>
  );
}

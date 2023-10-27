import { useState, useEffect } from "react";

import "./Exam.scss";
import { ExamList } from "./components/ExamList";
import { Button, Modal, Select } from "antd";
import { AddEditExamModal } from "./components/addEditExamModal";
import { useCustomParams } from "src/hooks/useCustomParams";
import { PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import Layout from "src/components/Layout/Layout";
import { useDebounce } from "src/hooks/useDebounce";

export interface IExamProps {}

export function Exam(props: IExamProps) {
  const [addEditModalOpen, setAddEditModalOpen] = useState(false);
  const [helpModal, setHelpModal] = useState(false);
  const [editId, setEditId] = useState(0);
  const { params, setParams } = useCustomParams();
  const [search, setSearch] = useState(params.search || "");
  const [examType, setExamType] = useState(params.type || "");
  const searchDebounce = useDebounce(search);

  const onModalClose = () => {
    setAddEditModalOpen(false);
    setEditId(0);
  };

  useEffect(() => {
    const paramsBody: { search?: string; type?: string } = {
      search: searchDebounce,
      type: examType,
    };
    if (!searchDebounce) delete paramsBody.search;
    if (!examType) delete paramsBody.type;

    setParams(paramsBody);
  }, [searchDebounce, examType]);

  return (
    <Layout
      className="exam-page"
      leftNavWidth="15%"
      rightNavWidth="15%"
      contentBackGround="white"
    >
      <div className="top filter">
        <input
          type="text"
          placeholder="Từ khóa tìm kiếm..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select
          placeholder="Loại bằng"
          defaultValue={params.for || ""}
          onChange={(value) => {
            setParams({ ...params, type: value });
          }}
          options={[
            { value: "", label: "Tất cả loại bằng" },
            { value: "a1", label: "Bằng A" },
            { value: "b1", label: "Bằng B1" },
            { value: "b2", label: "Bằng B2" },
            { value: "c", label: "Bằng C" },
            { value: "def", label: "Bằng D, E, F" },
          ]}
        />
        <Button
          type="primary"
          onClick={() => setAddEditModalOpen(true)}
          icon={<PlusOutlined />}
        >
          Tạo mới
        </Button>

        {/* <div className="help" onClick={() => setHelpModal(true)}>
          <QuestionCircleOutlined />
        </div> */}
      </div>

      <div className="body">
        <div className="left-nav" />
        <div className="content">
          <div className="list-wrap">
            <ExamList />
          </div>
        </div>
      </div>

      <Modal
        open={addEditModalOpen}
        onCancel={onModalClose}
        footer={false}
        closable={false}
        width={850}
      >
        <AddEditExamModal editId={editId} onCLose={onModalClose} />
      </Modal>
      {/* <Modal
        open={helpModal}
        onCancel={() => setHelpModal(false)}
        footer={false}
        closable={false}
      >
        <div>help modal</div>
      </Modal> */}
    </Layout>
  );
}

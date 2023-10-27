import { Button, Form, Input, Row, Select, Col, Modal } from "antd";
import { useEffect, useMemo, useState } from "react";
import Layout, { CustomCol } from "src/components/Layout/Layout";
import {
  examTypeOptions,
  examUtil,
  questionListForType,
} from "src/pages/utils/exam.utils";
import { QuestionListModal } from "./questionListModal";
import { toast } from "react-toastify";
import { CustomTitle } from "src/components/CustomText/CustomText";

export interface IAddEditExamModalProps {
  editId: number;
  onCLose: () => void;
}

export function AddEditExamModal(props: IAddEditExamModalProps) {
  if (props.editId) alert("edit by id");

  const [type, setType] = useState<"a1" | "b1" | "b2" | "c" | "def">("a1");
  const [questionType, setQuestionType] = useState("");
  const [questionNumber, setQuestionNumber] = useState(questionListForType.a1);
  const [examName, setExamName] = useState("");
  const [questionList, setQuestionList] = useState({
    T1: [],
    T2: [],
    T3: [],
    T4: [],
    T5: [],
    T6: [],
    T7: [],
    require: [],
  });

  const questions = useMemo(() => {
    return [
      ...questionList.T1,
      ...questionList.T2,
      ...questionList.T3,
      ...questionList.require,
      ...questionList.T4,
      ...questionList.T5,
      ...questionList.T6,
      ...questionList.T7,
    ];
  }, [questionList]);

  const handleCreateExam = async () => {
    if (!type) {
      toast.error("Vui lòng chọn loại bằng");
      return;
    }
    if (!examName) {
      toast.error("Vui lòng nhập tên đề bài");
      return;
    }
    if (
      examName &&
      questionList.T1.length === questionNumber.t1 &&
      questionList.T2.length === questionNumber.t2 &&
      questionList.T3.length === questionNumber.t3 &&
      questionList.T4.length === questionNumber.t4 &&
      questionList.T5.length === questionNumber.t5 &&
      questionList.T6.length === questionNumber.t6 &&
      questionList.T7.length === questionNumber.t7 &&
      questionList.require.length === 1
    ) {
      if (!window.confirm("Xác nhận tạo đề mới bằng những câu hỏi đã chọn?"))
        return;
      const data = {
        type: type,
        name: examName,
        questions: questions,
      };
      const res = await examUtil.createExam(data);

      if (res.status === 200) {
        toast.success("Tạo mới thành công");
        onModalClose();
        props.onCLose();
      } else {
        toast.error("Xảy ra lỗi!");
      }
    } else toast.error("Vui lòng chọn đầy đủ thông tin");
  };

  const handleAutoCreate = async () => {
    if (!type) {
      toast.error("Vui lòng chọn loại bằng");
      return;
    }
    if (!examName) {
      toast.error("Vui lòng nhập tên đề bài");
      return;
    }
    if (!window.confirm("Xác nhận tự động tạo mới đề " + type + "?")) return;
    const res = await examUtil.autoCreate({ type, name: examName });

    if (res.status === 200) toast.success("Created");
    else toast.error("Create fail");
  };

  const onModalClose = () => {
    setExamName("");
    setQuestionList({
      T1: [],
      T2: [],
      T3: [],
      T4: [],
      T5: [],
      T6: [],
      T7: [],
      require: [],
    });
  };

  useEffect(() => {
    setQuestionNumber(questionListForType[type]);
  }, [type]);

  return (
    <Layout layoutGap="8px">
      <div className="top">
        <CustomTitle>Chọn danh sách câu hỏi</CustomTitle>
      </div>
      <div className="body">
        <div className="content">
          <Form
            wrapperCol={{ span: 8, offset: 2 }}
            labelCol={{ span: 10, offset: 2 }}
            initialValues={{ type: "a1" }}
          >
            <Row>
              <Col span={12}>
                <Form.Item label="Loại bằng">
                  <Select
                    value={type}
                    options={examTypeOptions}
                    onChange={(value: "a1" | "b1" | "b2" | "c" | "def") =>
                      setType(value)
                    }
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Tên đề thi"
                  rules={[{ required: true, message: "Vui lòng nhập tên" }]}
                >
                  <Input
                    value={examName}
                    name="name"
                    onChange={(e) => setExamName(e.target.value)}
                    placeholder="Name..."
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item name={"T1"} label="KN & QT giao thông đường bộ">
                  <Button
                    disabled={!questionNumber.t1}
                    ghost
                    danger={questionList.T1.length !== questionNumber.t1}
                    onClick={() => setQuestionType("T1")}
                    type="primary"
                  >
                    {`Đã chọn ${
                      questionList.T1.length + "/" + questionNumber.t1
                    } câu hỏi`}
                  </Button>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name={"T2"} label="Nghiệp vụ vận tải">
                  <Button
                    disabled={!questionNumber.t2}
                    ghost
                    danger={questionList.T2.length !== questionNumber.t2}
                    onClick={() => setQuestionType("T2")}
                    type="primary"
                  >
                    {`Đã chọn ${
                      questionList.T2.length + "/" + questionNumber.t2
                    } câu hỏi`}
                  </Button>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item name={"T3"} label="Văn hóa GT và đạo đức lái xe">
                  <Button
                    disabled={!questionNumber.t3}
                    ghost
                    danger={questionList.T3.length !== questionNumber.t3}
                    onClick={() => setQuestionType("T3")}
                    type="primary"
                  >
                    {`Đã chọn ${
                      questionList.T3.length + "/" + questionNumber.t3
                    } câu hỏi`}
                  </Button>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name={"T4"} label="Kỹ thuật lái xe">
                  <Button
                    disabled={!questionNumber.t4}
                    ghost
                    danger={questionList.T4.length !== questionNumber.t4}
                    onClick={() => setQuestionType("T4")}
                    type="primary"
                  >
                    {`Đã chọn ${
                      questionList.T4.length + "/" + questionNumber.t4
                    } câu hỏi`}
                  </Button>
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <Form.Item name={"T5"} label="Cấu tạo và sửa chữa">
                  <Button
                    disabled={!questionNumber.t5}
                    ghost
                    danger={questionList.T5.length !== questionNumber.t5}
                    onClick={() => setQuestionType("T5")}
                    type="primary"
                  >
                    {`Đã chọn ${
                      questionList.T5.length + "/" + questionNumber.t5
                    } câu hỏi`}
                  </Button>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name={"T6"} label="Hệ thống biển báo">
                  <Button
                    disabled={!questionNumber.t6}
                    ghost
                    danger={questionList.T6.length !== questionNumber.t6}
                    onClick={() => setQuestionType("T6")}
                    type="primary"
                  >
                    {`Đã chọn ${
                      questionList.T6.length + "/" + questionNumber.t6
                    } câu hỏi`}
                  </Button>
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <Form.Item name={"T7"} label="Sa hình, Xử lý tình huống">
                  <Button
                    disabled={!questionNumber.t7}
                    ghost
                    danger={questionList.T7.length !== questionNumber.t7}
                    onClick={() => setQuestionType("T7")}
                    type="primary"
                  >
                    {`Đã chọn ${
                      questionList.T7.length + "/" + questionNumber.t7
                    } câu hỏi`}
                  </Button>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name={"require"} label="Câu điểm liệt">
                  <Button
                    ghost
                    danger={questionList.require.length !== 1}
                    onClick={() => setQuestionType("require")}
                    type="primary"
                  >
                    Chọn 1 câu
                  </Button>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              labelCol={{ span: 0, offset: 8 }}
              wrapperCol={{ span: 8, offset: 8 }}
            >
              <Row>
                <CustomCol justify="space-between" span={24}>
                  <Button
                    size="large"
                    type="primary"
                    onClick={handleAutoCreate}
                    danger
                  >
                    Tạo tự động
                  </Button>
                  <Button
                    size="large"
                    type="primary"
                    onClick={handleCreateExam}
                  >
                    Xác nhận
                  </Button>
                </CustomCol>
              </Row>
            </Form.Item>
          </Form>
        </div>
      </div>
      <Modal
        open={!!questionType}
        onCancel={() => setQuestionType("")}
        footer={false}
        closable={false}
        width={1200}
      >
        <QuestionListModal
          questionFor={type}
          type={questionType}
          setQuestionList={setQuestionList}
          onOk={() => setQuestionType("")}
        />
      </Modal>
    </Layout>
  );
}

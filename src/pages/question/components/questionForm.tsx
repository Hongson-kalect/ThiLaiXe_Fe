import { Checkbox, Form, Input, Radio, Space } from "antd";
import { useState, useMemo, useEffect } from "react";
import { CustomForm } from "src/components/CustomForm/CustomForm";
import {
  CustomInput,
  CustomSelect,
} from "src/components/CustomInput/CustomInput";
import { styled } from "styled-components";
import { PlusOutlined } from "@ant-design/icons";
import { CustomButton } from "src/components/CustomButton/CustomButton";
import { Center } from "src/components/CenterChild/centerChild";
import { httpPost } from "src/configs/axios";
import { CreateQuestionParams } from "src/interfaces/question.type";
import {
  createQuestion,
  editQuestionUtil,
  getQuestionUtil,
} from "src/pages/utils/question.util";
import { toast } from "react-toastify";
import { useCustomParams } from "src/hooks/useCustomParams";
import Layout from "src/components/Layout/Layout";
import { CustomTitle } from "src/components/CustomText/CustomText";
import { useNavigate, useParams } from "react-router-dom";
import config from "src/configs";

type Props = {};

const CustomRadio = styled(Radio)`
  width: 100%;
  & > span:last-child {
    margin-left: 20px;
    width: 90%;
  }
`;
const CustomRadioGroup = styled(Radio.Group)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 8px;
  row-gap: 12px;
  & > span > svg {
    width: 20px;
    height: 20px;
    color: gray;
    cursor: pointer;
  }
`;

const CustomCheckGroup = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0px 8px;
  column-gap: 32px;
`;

const QuestionForm = (props: Props) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [anserNumber, setQuestionNumber] = useState<number>(4);
  const params = useParams();
  // console.log(params);
  const questionId = useMemo(() => {
    return params.id;
  }, [params]);
  const [formValue, setFormValue] = useState<CreateQuestionParams>({
    ansers: [],
    correct: -1,
    title: "",
    explain: "",
    image: "",
    a1: true,
    a2: true,
    a3a4: true,
    b1: true,
    b2cdef: true,
    require: false,
    type: "T1",
  });

  console.log(questionId);

  const handleFormSubmit = async () => {
    if (
      formValue.correct < 0 ||
      !formValue.type ||
      !formValue.title ||
      !(formValue?.ansers?.length > 1)
    ) {
      toast("Input not valid");
      return;
    }

    if (Number(questionId)) {
      try {
        const res = await editQuestionUtil({
          id: Number(questionId),
          value: formValue,
        });

        toast.success("Edited");
        navigate(config.router.question);
      } catch (error) {
        toast.error("update fail");
      }
    } else {
      const res = await createQuestion(formValue);
      if (res) {
        toast("Saved");
        clearFormInput();
        setFormValue({
          ...formValue,
          ansers: [],
          explain: "",
          title: "",
        });
      }
    }
  };

  const clearFormInput = () => {
    form.resetFields();
  };

  const getQuestion = async () => {
    if (!questionId) return null;
    const data = await getQuestionUtil(questionId);
    console.log(data);
    setFormValue({
      ansers: data.ansers,
      correct: data.correct,
      title: data.title,
      explain: data.explain,
      image: data.image,
      a1: data?.a1,
      a2: data?.a2,
      a3a4: data?.a3a4,
      b1: data?.b1,
      b2cdef: data?.b2cdef,
      require: data?.require,
      type: data?.type || "T1",
    });
  };

  useEffect(() => {
    getQuestion();
  }, [questionId]);

  return (
    <Layout backGround="white" topHeight="60px">
      <div className="top">
        <CustomTitle>{questionId ? "Sửa câu hỏi" : "Thêm câu hỏi"}</CustomTitle>
      </div>
      <div className="body">
        <div className="content">
          <CustomForm
            form={form}
            labelCol={{ offset: 1, span: 3 }}
            labelAlign="left"
            wrapperCol={{ span: 14, offset: 0 }}
            onFinish={handleFormSubmit}
            style={{
              padding: "10px 32px",
            }}
          >
            <Form.Item label={`Đề bài`}>
              <CustomInput
                value={formValue.title}
                onChange={(e) =>
                  setFormValue((prev: any) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
              />
            </Form.Item>
            <Form.Item label="Câu trả lời">
              <CustomRadioGroup value={formValue.correct}>
                {/* <Space direction="vertical" style={{ width: "100%" }}> */}
                {Array.from(Array(anserNumber).keys()).map(
                  (a: any, index: number) => {
                    return (
                      <CustomRadio
                        key={index}
                        value={index}
                        onChange={(e) =>
                          setFormValue((prev: any) => ({
                            ...prev,
                            correct: index,
                          }))
                        }
                      >
                        <CustomInput
                          value={formValue.ansers[index] || ""}
                          onChange={(e) =>
                            setFormValue((prev: any) => {
                              const tempArr = prev.ansers;
                              tempArr[index] = e.target.value;
                              // tempArr[index] = e.target.value;
                              return { ...prev, ansers: [...tempArr] };
                            })
                          }
                        />
                      </CustomRadio>
                    );
                  }
                )}
                <PlusOutlined
                  onClick={() => setQuestionNumber((prev) => prev + 1)}
                />
                {/* </Space> */}
              </CustomRadioGroup>
            </Form.Item>
            <Form.Item label="Loại bằng">
              <CustomCheckGroup>
                <Checkbox
                  defaultChecked
                  onChange={(e) =>
                    setFormValue((prev: any) => ({
                      ...prev,
                      a1: e.target.checked,
                    }))
                  }
                >
                  A1
                </Checkbox>
                <Checkbox
                  defaultChecked
                  onChange={(e) =>
                    setFormValue((prev: any) => ({
                      ...prev,
                      a2: e.target.checked,
                    }))
                  }
                >
                  A2
                </Checkbox>
                <Checkbox
                  defaultChecked
                  onChange={(e) =>
                    setFormValue((prev: any) => ({
                      ...prev,
                      a3a4: e.target.checked,
                    }))
                  }
                >
                  A3 and A4
                </Checkbox>
                <Checkbox
                  defaultChecked
                  onChange={(e) =>
                    setFormValue((prev: any) => ({
                      ...prev,
                      b1: e.target.checked,
                    }))
                  }
                >
                  B1{" "}
                </Checkbox>
                <Checkbox
                  defaultChecked
                  onChange={(e) =>
                    setFormValue((prev: any) => ({
                      ...prev,
                      b2cdef: e.target.checked,
                    }))
                  }
                >
                  B2, C, D, E, F
                </Checkbox>
                <Checkbox
                  onChange={(e) =>
                    setFormValue((prev: any) => ({
                      ...prev,
                      require: e.target.checked,
                    }))
                  }
                >
                  Câu điểm liệt
                </Checkbox>
              </CustomCheckGroup>
            </Form.Item>
            <Form.Item label="Giải thích">
              <CustomInput
                value={formValue.explain}
                onChange={(e) =>
                  setFormValue((prev: any) => ({
                    ...prev,
                    explain: e.target.value,
                  }))
                }
              />
            </Form.Item>

            <Form.Item label="Đường dẫn ảnh">
              <CustomInput
                value={formValue.image}
                onChange={(e) =>
                  setFormValue((prev: any) => ({
                    ...prev,
                    image: e.target.value,
                  }))
                }
              />
            </Form.Item>
            <Form.Item label="Loại câu hỏi">
              <CustomSelect
                value={formValue.type}
                defaultValue={"T1"}
                options={[
                  {
                    label: "Khái niệm và quy tắc giao thông đường bộ ",
                    value: "T1",
                  },
                  { label: "Nghiệp vụ vận tải ", value: "T2" },
                  {
                    label: "Văn hóa giao thông và đạo đức người lái xe  ",
                    value: "T3",
                  },
                  { label: "Kỹ thuật lái xe", value: "T4" },
                  { label: "Cấu tạo và sửa chữa ", value: "T5" },
                  { label: "Hệ thống biển báo hiệu đường bộ", value: "T6" },
                  {
                    label:
                      "Giải các thế sa hình và kỹ năng xử lý tình huống giao thông",
                    value: "T7",
                  },
                  {
                    label: "Tình huống mất an toàn giao thông nghiêm trọng",
                    value: "T8",
                  },
                ]}
                onChange={(value) => {
                  setFormValue((prev: any) => ({ ...prev, type: value }));
                }}
              />
            </Form.Item>

            <Form.Item wrapperCol={{ span: 24 }}>
              <Center>
                <CustomButton type="primary" htmlType="submit">
                  {questionId ? "Sửa câu hỏi" : "Thêm câu hỏi"}
                </CustomButton>
              </Center>
            </Form.Item>
          </CustomForm>
        </div>
      </div>
    </Layout>
  );
};

export default QuestionForm;

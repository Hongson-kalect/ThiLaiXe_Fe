import { DeleteFilled, EditFilled, EditOutlined } from "@ant-design/icons";
import { Radio, Space } from "antd";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CustomFlexBox } from "src/components/FlexBox/FlexBox";
import config from "src/configs";
import { QuestionType } from "src/interfaces/question.type";
import { deleteQuestionUtil } from "src/pages/utils/question.util";
import { selectAppInfo, selectUserInfo } from "src/redux/selector/app.selector";
import { appSlice } from "src/redux/slices/app.slice";
import { useAppDispatch, useAppSelector } from "src/redux/store";

export interface IQuestionItemProps {
  index: number;
  question: QuestionType;
}

export function QuestionItem({ question, index }: IQuestionItemProps) {
  const navigate = useNavigate();
  const { anser, checkResult } = useAppSelector(selectAppInfo);
  const dispatch = useAppDispatch();
  const { role } = useAppSelector(selectUserInfo);

  const handleDeleteQuestion = async (id: number) => {
    const data = await deleteQuestionUtil({ id });
    if (data.status === 200) toast.success("Xóa thành công");
  };

  return (
    <div className="question-list-item">
      <CustomFlexBox alignitem="center" gap="8px" justify="space-between">
        <div
          className={`title ${question.require ? "require" : ""}`}
          id={"question-" + index}
        >
          <span>
            {index !== undefined ? "Câu  hỏi " + index + ": " : "Câu hỏi : "}
          </span>
          {question.title}
        </div>
        {role === "admin" ? (
          <CustomFlexBox alignitem="center" gap="4px">
            <div
              style={{ cursor: "pointer" }}
              onClick={() => navigate(config.router.question + "/" + index)}
            >
              <EditFilled />
            </div>
            <div onClick={() => handleDeleteQuestion(index)}>
              <DeleteFilled
                style={{ fontSize: "18px", color: "red", cursor: "pointer" }}
              />
            </div>
          </CustomFlexBox>
        ) : null}
      </CustomFlexBox>

      {question.image ? (
        <div className="image">
          <img src={question.image} alt="Ảnh câu hỏi" />
        </div>
      ) : null}

      {question.ansers.map((anser, index) => {
        return (
          <p
            key={index}
            className={`anser ${index === question.correct ? "correct" : ""}`}
          >{`${index + 1}. ${anser}`}</p>
        );
      })}

      {question.explain ? (
        <div className={`explain`}>{question.explain}</div>
      ) : null}
    </div>
  );
}

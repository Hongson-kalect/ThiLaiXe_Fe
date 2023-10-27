import { Button } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomTitle } from "src/components/CustomText/CustomText";
import Layout from "src/components/Layout/Layout";
import config from "src/configs";
import constants from "src/constants";
import { ExamType } from "src/interfaces/exam.type";
import { getLocalStorage } from "src/utils/localstorage";

export interface IResultModalProps {
  exam: ExamType;
  onCancel: () => void;
}

export function ResultModal({ exam, onCancel }: IResultModalProps) {
  const [type] = useState(getLocalStorage(constants.LOCALSTORAGE.examType));
  const navigate = useNavigate();

  console.log(exam);

  const [result] = useState(() => {
    let beOk = false;
    if (typeof exam.score === "number") {
      return undefined;
    } else if (!exam.score?.correct || exam.isFailAtRequire) return false;
    switch (type) {
      case "a1":
        if (exam.score?.correct >= 21) beOk = true;
        break;
      case "b1":
        if (exam.score?.correct >= 27) beOk = true;
        break;
      case "b2":
        if (exam.score?.correct >= 32) beOk = true;
        break;
      case "c":
        if (exam.score?.correct >= 36) beOk = true;
        break;
      case "def":
        if (exam.score?.correct >= 41) beOk = true;
        break;

      default:
        if (exam.score?.correct >= 23) beOk = true;
    }
    return beOk;
  });

  return (
    <Layout className="result-modal" topBottomGap="12px" height="65vh">
      <div className="top">
        <CustomTitle>Kết quả</CustomTitle>
      </div>
      <div className="body">
        <div className="content">
          <p className="score">
            {typeof exam.score === "number" ? (
              <b>
                <i>{exam.score}</i>
              </b>
            ) : (
              <b>
                <i>{exam.score?.correct}</i>/{exam.score?.total}
              </b>
            )}
          </p>
          <p>
            Bạn đã trả lời{" "}
            {exam.isFailAtRequire ? (
              <b style={{ color: "red", fontSize: "24px", fontWeight: "bold" }}>
                {" Sai "}
              </b>
            ) : (
              <b
                style={{ color: "green", fontSize: "24px", fontWeight: "bold" }}
              >
                {" Đúng "}
              </b>
            )}
            câu điểm liệt
          </p>
          {result !== undefined ? (
            <div className={`concluse ${result ? "ok" : ""}`}>
              {result ? "Đạt" : "Không đạt"}
            </div>
          ) : null}
        </div>
      </div>
      <div className="bottom">
        <Button onClick={onCancel} type="primary">
          Xem đáp án
        </Button>
        <Button onClick={() => navigate(config.router.home)} ghost danger>
          Về trang chủ
        </Button>
      </div>
    </Layout>
  );
}

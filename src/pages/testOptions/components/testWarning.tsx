import { Checkbox } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "src/components/CustomButton/CustomButton";
import { CustomTitle } from "src/components/CustomText/CustomText";
import Layout from "src/components/Layout/Layout";
import config from "src/configs";
import { setLocalStorage } from "src/utils/localstorage";

export interface ITestWarningProps {
  code: "loginToSaveNotify" | "autoTestNoSaveNotify";
  onConfirm: () => void;
  onCancel?: () => void;
}

export function TestWarning(props: ITestWarningProps) {
  const navigate = useNavigate();
  const [notAgain, setNotAgain] = useState(false);

  const handleOnOk = () => {
    if (notAgain) {
      setLocalStorage(props.code, false);
    }

    props.onConfirm();
  };

  if (props.code === "autoTestNoSaveNotify")
    return (
      <Layout className="exam-warning" height="50vh" layoutGap="24px">
        <div className="top">
          <CustomTitle>LƯU Ý</CustomTitle>
        </div>
        <div className="body">
          <div className="content">
            <p>
              Bài thi được tạo tự động sẽ không lưu lại kết quả. Bạn vẫn được
              kiểm tra điểm số và đáp án.
            </p>
            <Checkbox
              checked={notAgain}
              onChange={(e) => setNotAgain(e.target.checked)}
              style={{ marginTop: "auto" }}
            >
              Không hiện lại
            </Checkbox>
          </div>
        </div>
        <div className="bottom">
          <CustomButton type="primary" onClick={handleOnOk}>
            Xác nhận tiếp tục
          </CustomButton>
          <CustomButton type="primary" danger onClick={props.onCancel}>
            Hủy
          </CustomButton>
        </div>
      </Layout>
    );
  // if(props.code ==='loginToSave')
  else {
    return (
      <Layout className="exam-warning" height="50vh" layoutGap="24px">
        <div className="top">
          <CustomTitle>LƯU Ý</CustomTitle>
        </div>
        <div className="body">
          <div className="content">
            <p>Bạn chưa đăng nhập. Kết quả bài thi sẽ không được ghi lại!</p>
            <Checkbox
              checked={notAgain}
              onChange={(e) => setNotAgain(e.target.checked)}
              style={{ marginTop: "auto" }}
            >
              Không hiện lại
            </Checkbox>
          </div>
        </div>
        <div className="bottom">
          <CustomButton type="primary" onClick={handleOnOk}>
            Xác nhận tiếp tục
          </CustomButton>

          <CustomButton
            type="primary"
            onClick={() => navigate(config.router.login)}
          >
            Đăng nhập
          </CustomButton>
        </div>
      </Layout>
    );
  }
}

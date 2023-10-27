import * as React from "react";
import { CustomTitle } from "src/components/CustomText/CustomText";
import Layout from "src/components/Layout/Layout";
import { TestItem } from "./testItem";
import { CustomButton } from "src/components/CustomButton/CustomButton";
import { Modal } from "antd";
import { TestWarning } from "./testWarning";
import { useQuery } from "@tanstack/react-query";
import { httpGet } from "src/configs/axios";
import { examUtil } from "src/pages/utils/exam.utils";
import { ExamType } from "src/interfaces/exam.type";
import { getLocalStorage, setLocalStorage } from "src/utils/localstorage";
import config from "src/configs";
import constants from "src/constants";
import { useNavigate } from "react-router-dom";
import { appSlice } from "src/redux/slices/app.slice";
import { useAppDispatch } from "src/redux/store";

export interface ITestListProps {
  // examList:any[]
  type: "a1" | "a2" | "a34" | "b1" | "b2" | "c" | "def";
}

export default function TestList(props: ITestListProps) {
  const dispatch = useAppDispatch();
  const [isLogin] = React.useState(false);
  const navigate = useNavigate();

  const getExamsFn = async () => {
    const type = ["b1", "b2", "c", "def"].includes(props.type)
      ? props.type
      : "a1";
    return await examUtil.getExam({ type });
  };

  const { data: examList, isLoading } = useQuery<ExamType[]>({
    queryFn: getExamsFn,
    queryKey: ["getExamsFn", props.type],
  });

  const [selectedExam, setSelectedExam] = React.useState(-1);
  const [warningCode, setWarningCode] = React.useState<
    null | "loginToSaveNotify" | "autoTestNoSaveNotify"
  >(null);
  const [warningConfirm, setWarningConfirm] = React.useState<() => void>(
    () => {}
  );
  const [warningCancel, setWarningCancel] = React.useState<() => void>(
    () => {}
  );

  const handleChooseExam = (id: number) => {
    // check localStorage not disable login warning
    const isLogin = getLocalStorage(constants.LOCALSTORAGE.token);
    const loginTosaveNotify = getLocalStorage(
      constants.LOCALSTORAGE.loginToSaveNotify
    );
    if (!isLogin && loginTosaveNotify !== false) {
      setWarningCode("loginToSaveNotify");
      setWarningConfirm((prev) => {
        return () => {
          // go to exam with id
          setLocalStorage(constants.LOCALSTORAGE.examId, id);
          setLocalStorage(constants.LOCALSTORAGE.examType, props.type);
          navigate(config.router.startExam);
        };
      });
      setWarningCancel(() => {
        return () => {
          setWarningCode(null);
        };
      });
    } else {
      // go to exam with id
      setLocalStorage(constants.LOCALSTORAGE.examId, id);
      setLocalStorage(constants.LOCALSTORAGE.examType, props.type);
      navigate(config.router.startExam);
    }
  };

  const handleAutoTest = (type: string) => {
    const autoTestNoSaveNotify = getLocalStorage(
      constants.LOCALSTORAGE.autoTestNoSaveNotify
    );
    if (autoTestNoSaveNotify !== false) {
      setWarningCode("autoTestNoSaveNotify");
      setWarningConfirm((prev) => {
        return () => {
          // go to auto exam with type
          setLocalStorage(constants.LOCALSTORAGE.examId, null);
          setLocalStorage(constants.LOCALSTORAGE.examType, props.type);
          navigate(config.router.startExam);
        };
      });
      setWarningCancel(() => {
        return () => {
          setWarningCode(null);
        };
      });
    } else {
      // go to auto exam with type
      setLocalStorage(constants.LOCALSTORAGE.examId, null);
      setLocalStorage(constants.LOCALSTORAGE.examType, props.type);
      navigate(config.router.startExam);
    }
  };

  React.useEffect(() => {
    dispatch(appSlice.actions.setLoading(isLoading));
  }, [isLoading]);

  return (
    <>
      <Layout height="60vh" className="test-list" bottomHeight="50px">
        <div className="top">
          <CustomTitle className="title">
            Chọn đề bài - Loại {props.type.toUpperCase()}
          </CustomTitle>
        </div>
        <div className="body">
          <div className="content">
            <div className="exam-list">
              {examList &&
                examList.map((item, i) => {
                  return (
                    <div key={i} onClick={() => handleChooseExam(item.id)}>
                      <TestItem name={item.name} />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        <div className="bottom">
          <CustomButton
            type="primary"
            danger
            onClick={() => handleAutoTest(props.type)}
          >
            Đề tạo tự động
          </CustomButton>
        </div>
      </Layout>

      <Modal
        open={!!warningCode}
        onCancel={warningCancel}
        closable={false}
        footer={false}
      >
        <TestWarning
          code={warningCode || "loginToSaveNotify"}
          onConfirm={warningConfirm}
          onCancel={warningCancel}
        />
      </Modal>
    </>
  );
}

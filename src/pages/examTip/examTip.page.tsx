import { CustomButton } from "src/components/CustomButton/CustomButton";
import { CustomTitle } from "src/components/CustomText/CustomText";
import { CustomFlexBox } from "src/components/FlexBox/FlexBox";
import Layout from "src/components/Layout/Layout";
import config from "src/configs";
import { httpGet, httpPost } from "src/configs/axios";

import "./examTip.scss";
import { EditOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { FloatButton, Modal } from "antd";
import { useState, useMemo, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import parser from "html-react-parser";
import { useAppDispatch, useAppSelector } from "src/redux/store";
import { selectUserInfo } from "src/redux/selector/app.selector";
import { appSlice } from "src/redux/slices/app.slice";

type Props = {};

const ExamTip = (props: Props) => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const { role } = useAppSelector(selectUserInfo);
  const modules = useMemo(() => {
    return {
      toolbar: [
        [{ size: ["small", false, "large", "huge"] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ color: [] }, { background: [] }],
        ["link", "image"],
      ],
    };
  }, []);

  const getTipMarkdown = async () => {
    try {
      const res = await httpGet(config.apiPath.tipMarkdown);
      setValue("");
      return res.data;
    } catch (error) {
      return null;
    }
  };
  const {
    data: tip,
    refetch,
    isLoading,
  } = useQuery({
    queryFn: getTipMarkdown,
    queryKey: ["getMarkdown"],
  });

  const handleChangeTipMarkdownn = async () => {
    if (window.confirm("Chắc chắn?")) {
      await httpPost(config.apiPath.tipMarkdown, { value });
      setIsEdit(false);
      refetch();
    }
  };

  useEffect(() => {
    dispatch(appSlice.actions.setLoading(isLoading));
  }, [isLoading]);

  // useEffect(() => {
  //   if (tip) setValue(tip.value);
  // }, [tip]);

  console.log(value);

  return (
    <Layout className="tip-page" contentBackGround="white">
      <div className="top">
        <CustomTitle>Mẹo - Gợi ý thi trắc nghiệm</CustomTitle>
      </div>
      <div className="body">
        <CustomFlexBox
          direction="column"
          className="content"
          margin="0px 10%"
          padding="20px"
        >
          {tip ? parser(tip.value) : <div>Chưa có mẹo hay gợi ý nào.</div>}
        </CustomFlexBox>
      </div>
      <Modal
        closable={false}
        footer={false}
        open={isEdit}
        onCancel={() => setIsEdit(false)}
      >
        <Layout height="76vh" layoutGap="8px" bottomHeight="42px">
          <div className="top">
            <CustomTitle>Chỉnh sửa mẹo</CustomTitle>
          </div>
          <div className="body">
            <div className="content">
              <ReactQuill
                theme="snow"
                value={value || tip?.value || ""}
                onChange={(value) => setValue(value)}
                modules={modules}
              />
            </div>
          </div>
          <div className="bottom">
            <CustomButton type="primary" onClick={handleChangeTipMarkdownn}>
              Xác nhận chỉnh sửa
            </CustomButton>
          </div>
        </Layout>
      </Modal>
      {role === "admin" ? (
        <FloatButton
          onClick={() => setIsEdit(true)}
          type="primary"
          style={{ right: 48 }}
          icon={<EditOutlined />}
        />
      ) : null}
    </Layout>
  );
};

export default ExamTip;

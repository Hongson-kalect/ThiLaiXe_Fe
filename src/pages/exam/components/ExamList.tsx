import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, Tooltip } from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CustomTable } from "src/components/CustomTable/CustomTable";
import { CustomTitle } from "src/components/CustomText/CustomText";
import { CustomFlexBox } from "src/components/FlexBox/FlexBox";
import Layout from "src/components/Layout/Layout";
import config from "src/configs";
import { useCustomParams } from "src/hooks/useCustomParams";
import { ExamType } from "src/interfaces/exam.type";
import { examUtil } from "src/pages/utils/exam.utils";
import { appSlice } from "src/redux/slices/app.slice";
import { useAppDispatch } from "src/redux/store";

export interface IExamListProps {}

export function ExamList(props: IExamListProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { params, setParams } = useCustomParams();
  const examTableColumn = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Loại bằng", dataIndex: "type", key: "type" },
    { title: "Tên", dataIndex: "name", key: "name" },
    {
      title: "Thời gian tạo",
      dataIndex: "createdAt",
      key: "createAt",
      render: (time: string) => (
        <div>{new Date(Number(time)).toISOString().slice(0, 19)}</div>
      ),
    },
    {
      title: "Lựa chọn",
      dataIndex: "id",
      key: "options",
      render: (id: number) => (
        <CustomFlexBox justify="center" gap="4px" alignitem="center">
          <div onClick={() => navigate(config.router.exam + "/" + id)}>
            <Tooltip title="xem đề">
              <EyeOutlined
                style={{ fontSize: "18px", color: "orange", cursor: "pointer" }}
              />
            </Tooltip>
          </div>

          <Tooltip title="Xóa">
            <DeleteOutlined
              style={{ fontSize: "18px", color: "red", cursor: "pointer" }}
              onClick={() => handleDeleteExam(id)}
            />
          </Tooltip>
        </CustomFlexBox>
      ),
    },
  ];

  const handleDeleteExam = async (id: number) => {
    if (window.confirm("Xóa đề thi này?")) {
      const data = await examUtil.deleteExam(id);
      if (data.status === 200) toast.success("Xóa thành công");
    }
  };

  const getExamQuery = async () => {
    return await examUtil.getExam(params);
  };

  const { data: exams, isLoading } = useQuery<ExamType[]>({
    queryFn: getExamQuery,
    queryKey: ["getExams", params],
    keepPreviousData: true,
  });

  useEffect(() => {
    dispatch(appSlice.actions.setLoading(isLoading));
  }, [isLoading]);

  return (
    <Layout topHeight="64px" topBackGround="#dedede" layoutGap="12px">
      <div className="top">
        <CustomTitle>Danh sách đề bài</CustomTitle>
      </div>
      <div className="body">
        <div className="content">
          <CustomTable
            rowKey={"id"}
            columns={examTableColumn}
            dataSource={exams}
          />
          ;
        </div>
      </div>
    </Layout>
  );
}

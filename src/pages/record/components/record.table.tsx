import { useQuery } from "@tanstack/react-query";
import { Button } from "antd";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CustomTable } from "src/components/CustomTable/CustomTable";
import { CustomTitle } from "src/components/CustomText/CustomText";
import { CustomFlexBox } from "src/components/FlexBox/FlexBox";
import Layout from "src/components/Layout/Layout";
import config from "src/configs";
import constants from "src/constants";
import { useCustomParams } from "src/hooks/useCustomParams";
import { AccountType } from "src/interfaces/account.type";
import { ExamType } from "src/interfaces/exam.type";
import { RecordType } from "src/interfaces/record.type";
import { accountUtil } from "src/pages/utils/account.util";
import { examUtil } from "src/pages/utils/exam.utils";
import { appSlice } from "src/redux/slices/app.slice";
import { userSlice } from "src/redux/slices/user.slice";
import { useAppDispatch } from "src/redux/store";
import { setLocalStorage } from "src/utils/localstorage";

export interface IRecordTableProps {
  histories: RecordType[];
}

export function RecordTable({ histories }: IRecordTableProps) {
  const { params, setParams } = useCustomParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [checkHistoryId, setCheckHistoryId] = useState(0);
  const historyTableColumn = useMemo(
    () => [
      { title: "ID", dataIndex: "id", key: "id" },
      { title: "Email", dataIndex: "email", key: "email" },
      { title: "Mã đề", dataIndex: "examId", key: "examId" },
      { title: "Loại đề", dataIndex: "examType", key: "examType" },
      { title: "Điểm", dataIndex: "score", key: "score" },
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
          <CustomFlexBox justify="center" alignitem="center">
            <Button
              danger
              onClick={() => navigate(config.router.record + "/" + id)}
            >
              Xem lại
            </Button>
          </CustomFlexBox>
        ),
      },
    ],
    []
  );

  return (
    <Layout topHeight="64px" topBackGround="#dedede" layoutGap="12px">
      <div className="top">
        <CustomTitle>Danh sách lịch sử</CustomTitle>
      </div>
      <div className="body">
        <div className="content">
          {histories?.length > 0 && historyTableColumn !== undefined ? (
            <CustomTable
              rowKey={"id"}
              columns={historyTableColumn}
              dataSource={histories}
            />
          ) : (
            <p>Không có dữ liệu</p>
          )}
        </div>
      </div>
    </Layout>
  );
}

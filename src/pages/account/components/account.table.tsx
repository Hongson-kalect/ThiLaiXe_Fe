import { useQuery } from "@tanstack/react-query";
import { Button } from "antd";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { CustomTable } from "src/components/CustomTable/CustomTable";
import { CustomTitle } from "src/components/CustomText/CustomText";
import { CustomFlexBox } from "src/components/FlexBox/FlexBox";
import Layout from "src/components/Layout/Layout";
import { useCustomParams } from "src/hooks/useCustomParams";
import { AccountType } from "src/interfaces/account.type";
import { ExamType } from "src/interfaces/exam.type";
import { accountUtil } from "src/pages/utils/account.util";
import { examUtil } from "src/pages/utils/exam.utils";

export interface IExamListProps {
  accounts: AccountType[];
  fetchAccount: any;
}

export function AccountTable({ accounts, fetchAccount }: IExamListProps) {
  const { params, setParams } = useCustomParams();
  const [deleteId, setDeleteId] = useState(0);
  const examTableColumn = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Username", dataIndex: "username", key: "username" },
    { title: "Role", dataIndex: "role", key: "role" },
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
          <Button danger onClick={() => setDeleteId(id)}>
            Delete
          </Button>
        </CustomFlexBox>
      ),
    },
  ];

  const handleDeleteAccount = async () => {
    await accountUtil.deleteAccount(deleteId);
    fetchAccount();
  };

  useEffect(() => {
    if (!deleteId) return;

    const account = accounts?.find((item) => item.id === deleteId);
    if (!account) toast("Không tìm thấy tài khoản");
    else if (account.role === "admin") {
      toast.error("Không thể xóa admin");
    } else if (window.confirm("Xóa tài khoản này?")) handleDeleteAccount();
  }, [deleteId]);

  return (
    <Layout topHeight="64px" topBackGround="#dedede" layoutGap="12px">
      <div className="top">
        <CustomTitle>Danh sách tài khoản</CustomTitle>
      </div>
      <div className="body">
        <div className="content">
          <CustomTable
            rowKey={"id"}
            columns={examTableColumn}
            dataSource={accounts}
          />
          ;
        </div>
      </div>
    </Layout>
  );
}

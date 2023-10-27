import { useState, useEffect } from "react";

import "./account.scss";
import { Button, Modal, Select } from "antd";
import { useCustomParams } from "src/hooks/useCustomParams";
import { PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import Layout from "src/components/Layout/Layout";
import { useDebounce } from "src/hooks/useDebounce";
import { CreateAccountModal } from "./components/createAccount.modal";
import { AccountTable } from "./components/account.table";
import { accountUtil } from "../utils/account.util";
import { useQuery } from "@tanstack/react-query";
import { AccountType } from "src/interfaces/account.type";
import { useAppDispatch } from "src/redux/store";
import { appSlice } from "src/redux/slices/app.slice";

export interface IExamProps {}

export function AccountPage(props: IExamProps) {
  const dispatch = useAppDispatch();

  const [isOpenAddAcountModal, setIsOpenAddAcountModal] = useState(false);

  const { params, setParams } = useCustomParams();
  const [search, setSearch] = useState(params.search || "");
  const searchDebounce = useDebounce(search);

  const getAccountQuery = async () => {
    return await accountUtil.getAccount({
      search: params.search || "",
      role: params.role || "",
    });
  };

  const {
    data: accounts,
    refetch: fetchAccount,
    isLoading,
  } = useQuery<AccountType[]>({
    queryFn: getAccountQuery,
    queryKey: ["getAccounts", params],
    keepPreviousData: true,
  });

  const onModalClose = () => {
    setIsOpenAddAcountModal(false);
    fetchAccount();
  };

  useEffect(() => {
    const paramsBody: { search?: string; type?: string } = {
      ...params,
      search: searchDebounce,
    };
    if (!searchDebounce) delete paramsBody.search;

    setParams(paramsBody);
  }, [searchDebounce]);

  useEffect(() => {
    dispatch(appSlice.actions.setLoading(isLoading));
  }, [isLoading]);

  return (
    <Layout
      className="exam-page"
      leftNavWidth="15%"
      rightNavWidth="15%"
      contentBackGround="white"
    >
      <div className="top filter">
        <input
          type="text"
          placeholder="Từ khóa tìm kiếm..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select
          placeholder="Loại bằng"
          defaultValue={params.for || ""}
          onChange={(value) => {
            setParams({ ...params, role: value });
          }}
          options={[
            { value: "", label: "Tất cả tài khoản" },
            { value: "admin", label: "Tài khoản Admin" },
            { value: "member", label: "Tài khoản khách" },
          ]}
        />
        <Button
          type="primary"
          onClick={() => setIsOpenAddAcountModal(true)}
          icon={<PlusOutlined />}
        >
          Tạo mới
        </Button>
      </div>

      <div className="body">
        <div className="left-nav" />
        <div className="content">
          <div className="list-wrap">
            {accounts ? (
              <AccountTable accounts={accounts} fetchAccount={fetchAccount} />
            ) : null}
          </div>
        </div>
      </div>

      <CreateAccountModal
        isOpen={isOpenAddAcountModal}
        onCancel={onModalClose}
      />
    </Layout>
  );
}

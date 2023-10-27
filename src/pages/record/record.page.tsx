import { useState, useEffect } from "react";

import "./record.scss";
import { Button, Modal, Select } from "antd";
import { useCustomParams } from "src/hooks/useCustomParams";
import { PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import Layout from "src/components/Layout/Layout";
import { useDebounce } from "src/hooks/useDebounce";
import { accountUtil } from "../utils/account.util";
import { useQuery } from "@tanstack/react-query";
import { recordUtil } from "../utils/record.util";
import { useAppDispatch, useAppSelector } from "src/redux/store";
import { selectUserInfo } from "src/redux/selector/app.selector";
import { CustomTitle } from "src/components/CustomText/CustomText";
import { RecordTable } from "./components/record.table";
import { appSlice } from "src/redux/slices/app.slice";

export interface IExamProps {}

export function RecordPage(props: IExamProps) {
  const dispatch = useAppDispatch();
  const { id: userId } = useAppSelector(selectUserInfo);

  const { params, setParams } = useCustomParams();
  const [search, setSearch] = useState(params.search || "");
  const searchDebounce = useDebounce(search);

  const getAccountQuery = async () => {
    if (!userId) return [];
    return await recordUtil.getRecords({
      id: userId,
      search: params.search || "",
    });
  };

  const { data: histories, isLoading } = useQuery({
    queryFn: getAccountQuery,
    queryKey: ["getRecords", userId],
    // keepPreviousData: true,
  });

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
      {/* <div className="top filter">
        <input
          type="text"
          placeholder="Từ khóa tìm kiếm..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div> */}

      <div className="body">
        <div className="left-nav" />
        <div className="content">
          <div className="list-wrap">
            {histories ? <RecordTable histories={histories} /> : null}
          </div>
        </div>
      </div>
    </Layout>
  );
}

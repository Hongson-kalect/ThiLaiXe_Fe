import React from "react";
import { Outlet } from "react-router-dom";
import Layout from "src/components/Layout/Layout";
import Loading from "src/components/Loading/Loading";
import { selectAppInfo } from "src/redux/selector/app.selector";
import { useAppSelector } from "src/redux/store";
import { styled } from "styled-components";

type Props = {};

const DefaultLayout = (props: Props) => {
  const { loading } = useAppSelector(selectAppInfo);
  return (
    <Layout noParent backGround="#dadada">
      {loading ? <Loading /> : null}
      {/* <Loading /> */}
      <div className="body">
        <div className="content">
          <Outlet />
        </div>
      </div>
    </Layout>
  );
};

export default DefaultLayout;

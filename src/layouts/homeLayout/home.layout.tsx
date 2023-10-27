import { useEffect } from "react";
import Layout from "src/components/Layout/Layout";

import "./home.layout.scss";
import { Outlet, useNavigate } from "react-router-dom";
import { CustomTitle } from "src/components/CustomText/CustomText";
import { CustomButton } from "src/components/CustomButton/CustomButton";
import config from "src/configs";
import Header from "./components/header";
import { authUtil } from "src/pages/utils/auth.util";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "src/redux/store";
import { selectUserInfo } from "src/redux/selector/app.selector";
import { appSlice } from "src/redux/slices/app.slice";
import { userSlice } from "src/redux/slices/user.slice";

type Props = {};

const HomeLayout = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const userInfo = useAppSelector(selectUserInfo);
  console.log(userInfo);

  const to = (link: string) => {
    navigate(link);
  };

  const getUserInfo = async () => {
    const res = await authUtil.getUser();
    if (res) {
      dispatch(
        userSlice.actions.setUser({
          id: res.id,
          email: res?.email,
          role: res.role,
          username: res.username,
        })
      );
    }
  };

  useEffect(() => {
    console.log("getYUsetInfo");
    getUserInfo();
  }, []);

  return (
    <Layout topHeight="40px" className="home-layout" layoutGap="4px">
      <div className="top">
        <Header />
      </div>
      <div className="body">
        {/* <div className="left-nav"></div> */}
        <div className="content">
          <Outlet />
        </div>
        {/* <div className="right-nav"></div> */}
      </div>
      {/* <div className="bottom"></div> */}
    </Layout>
  );
};

export default HomeLayout;

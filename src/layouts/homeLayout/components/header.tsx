import { Avatar, Button, Tooltip } from "antd";
import Link from "antd/es/typography/Link";

import * as React from "react";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "src/components/CustomButton/CustomButton";
import { CustomTitle } from "src/components/CustomText/CustomText";
import config from "src/configs";
import constants from "src/constants";
import { selectUserInfo } from "src/redux/selector/app.selector";
import { userSlice } from "src/redux/slices/user.slice";
import { useAppDispatch, useAppSelector } from "src/redux/store";
import router from "src/routers";
import { eraseCookie } from "src/utils/cookie";

export interface IHeaderProps {}

export default function Header(props: IHeaderProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { email, id, isLogin, role, username } = useAppSelector(selectUserInfo);

  console.log(email, id, isLogin, role, username);

  const handleLogout = () => {
    if (isLogin) {
      dispatch(
        userSlice.actions.setUser({
          id: 0,
          username: "",
          email: "",
          isLogin: false,
          role: "",
        })
      );
    }

    eraseCookie(constants.LOCALSTORAGE.token);
    navigate(config.router.login);
  };

  return (
    <div className="home-header">
      <Tooltip title="go home" mouseEnterDelay={0.5}>
        <CustomTitle
          className="title"
          onClick={() => navigate(config.router.home)}
        >
          Thi thử lý thuyết bằng lái xe{" "}
        </CustomTitle>
      </Tooltip>
      {/* {role === "admin" ? (
        <div>
          <Link onClick={() => navigate(config.router.account)}>
            Quản lý tài khoản
          </Link>
        </div>
      ) : null}
      {role === "admin" ? (
        <div>
          <Link onClick={() => navigate(config.router.exam)}>
            Quản lý đề bài
          </Link>
        </div>
      ) : null} */}
      <div className="options">
        {isLogin ? (
          <>
            <p>{username || email}</p>
            <Tooltip title="profile">
              <Avatar
                src="https://www.w3schools.com/howto/img_avatar.png"
                size={"small"}
                onClick={() => navigate(config.router.profile)}
              />
            </Tooltip>
          </>
        ) : null}
        <Button type="primary" danger={isLogin} onClick={handleLogout}>
          {isLogin ? "Đăng xuất" : "Đăng nhập"}
        </Button>
      </div>
    </div>
  );
}

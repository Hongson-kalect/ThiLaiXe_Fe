import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import config from "src/configs";
import constants from "src/constants";
import { selectUserInfo } from "src/redux/selector/app.selector";
import { useAppSelector } from "src/redux/store";
import { getCookie } from "src/utils/cookie";

const AdminRouter = () => {
  const { role, isLogin } = useAppSelector(selectUserInfo);
  const navigate = useNavigate();
  useEffect(() => {
    const token = getCookie(constants.LOCALSTORAGE.token);
    if (!token) navigate(config.router.login);
    if (role === "member") {
      navigate(config.router.login);
    }
    //check token or call api to verify user is authenticated
  }, [role]);

  return <Outlet />;
};

export default AdminRouter;

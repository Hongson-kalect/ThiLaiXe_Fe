import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import config from "src/configs";
import constants from "src/constants";
import { getCookie } from "src/utils/cookie";

const ProtectedRouter = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = getCookie(constants.LOCALSTORAGE.token);
    if (!token) {
      navigate(config.router.login);
    }
    //check token or call api to verify user is authenticated
  }, []);

  return <Outlet />;
};

export default ProtectedRouter;

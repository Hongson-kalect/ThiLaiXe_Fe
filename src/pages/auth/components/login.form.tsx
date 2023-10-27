import { Button, Col, Form, Input, Row } from "antd";
import Link from "antd/es/typography/Link";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CustomButton } from "src/components/CustomButton/CustomButton";
import {
  CustomInput,
  CustomPassword,
} from "src/components/CustomInput/CustomInput";
import { CustomTitle } from "src/components/CustomText/CustomText";
import { CustomCol } from "src/components/Layout/Layout";
import config from "src/configs";
import constants from "src/constants";
import { loginValueType } from "src/interfaces/auth.type";
import { authUtil } from "src/pages/utils/auth.util";
import { getCookie, setCookie } from "src/utils/cookie";

export interface ILoginFormProps {}

export function LoginForm(props: ILoginFormProps) {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [loginValue, setLoginValue] = useState<loginValueType>({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    setButtonDisabled(true);
    setTimeout(() => {
      setButtonDisabled(false);
    }, 5000);
    try {
      const data = await authUtil.signIn(form.getFieldsValue());

      console.log(data);

      setCookie(constants.LOCALSTORAGE.token, data.token, 24);
      toast.success("Đăng nhập thành công");
      navigate(config.router.home);
    } catch (error) {
      toast.error("Thông tin đăng nhập không hợp lệ!");
      return false;
    }
  };

  console.log("token", getCookie(constants.LOCALSTORAGE.token));

  return (
    <div className="form-wrapper">
      <CustomTitle className="title">Đăng nhập</CustomTitle>
      <Form
        form={form}
        className="form"
        labelAlign="left"
        labelCol={{ span: 5, offset: 1 }}
        wrapperCol={{ span: 16, offset: 0 }}
        onFinish={handleLogin}
        onFinishFailed={() => toast.error("Thông tin không hợp lệ")}
      >
        <Form.Item
          label="Email"
          name={"email"}
          rules={[
            { required: true, message: "Vui lòng nhập email" },
            {
              pattern: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
              message: `Email chưa hợp lệ`,
            },
          ]}
        >
          <CustomInput />
        </Form.Item>
        <Form.Item
          label="Mật khẩu"
          name={"password"}
          rules={[
            { required: true, message: "Please input your username!" },
            {
              pattern:
                /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!#$%\-_=+<>])([a-zA-Z0-9!#$%\-_=+<>]+)$/,
              message: `Ít nhất 1 chữ cái, 1 ký tự và 1 số`,
            },
            {
              min: 6,
              message: "Ít nhất 6 ký tự!",
            },
            {
              max: 24,
              message: "Tối đa 24 ký tự!",
            },
          ]}
        >
          <CustomPassword />
        </Form.Item>

        <Form.Item label={""} wrapperCol={{ span: 24 }}>
          <Row>
            <Col span={7}></Col>
            <CustomCol span={14} justify="center">
              <CustomButton
                disabled={buttonDisabled}
                type="primary"
                block
                htmlType="submit"
              >
                Đăng nhập
              </CustomButton>
            </CustomCol>
            <Col span={4}></Col>
          </Row>
          <Row>
            <Col span={6}></Col>
            <CustomCol span={14} justify="center">
              <p>
                Chưa có tài khoản?{" "}
                <Link onClick={() => navigate(config.router.signUp)}>
                  Đăng ký
                </Link>
              </p>
            </CustomCol>
            <Col span={4}></Col>
          </Row>
          <Row>
            <Col span={6}></Col>
            <CustomCol span={14} justify="center">
              <p>
                Quên mật khẩu?{" "}
                <Link onClick={() => navigate(config.router.forgotPassword)}>
                  Đặt lại ngay
                </Link>
              </p>
            </CustomCol>
            <Col span={4}></Col>
          </Row>
          <Row>
            <Col span={6}></Col>
            <CustomCol span={14} justify="center">
              <p>
                Mật khẩu quá dễ?{" "}
                <Link onClick={() => navigate(config.router.changePassword)}>
                  Đổi mật khẩu
                </Link>
              </p>
            </CustomCol>
            <Col span={4}></Col>
          </Row>
        </Form.Item>
      </Form>
    </div>
  );
}

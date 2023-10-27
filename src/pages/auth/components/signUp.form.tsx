import { Col, Form, Modal, Row } from "antd";
import Link from "antd/es/typography/Link";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CustomButton } from "src/components/CustomButton/CustomButton";
import {
  CustomInput,
  CustomPassword,
} from "src/components/CustomInput/CustomInput";
import { CustomTitle } from "src/components/CustomText/CustomText";
import { CustomCol } from "src/components/Layout/Layout";
import { VerifyModal } from "src/components/VerifyModal/VerifyModal";
import config from "src/configs";
import { authUtil } from "src/pages/utils/auth.util";

export interface ISignUpFormProps {}

export function SignUpForm(props: ISignUpFormProps) {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [isOpenVerifyModal, setIsOpenVerifyModal] = useState(false);
  const [verifyValue, setVerifyValue] = useState("");

  const handleSignup = async () => {
    if (
      form.getFieldValue("password") !== form.getFieldValue("confirm-password")
    ) {
      toast("2 Mật khẩu không trùng nhau");
      return;
    }
    console.log(form.getFieldsValue());
    setIsOpenVerifyModal(true);
  };

  const getVerifyCode = async () => {
    await authUtil.signUpMail(form.getFieldValue("email"));
  };

  const onVerify = async () => {
    const data = await authUtil.mailVerify({
      email: form.getFieldValue("email"),
      value: verifyValue,
    });
    console.log(data);
    if (data?.status === 200) {
      const data = await authUtil.signUp({
        email: form.getFieldValue("email"),
        password: form.getFieldValue("password"),
      });
      if (data?.status === 200) {
        toast.success("Tạo tài khoản thành công!");
        navigate(config.router.login);
      }
    }
  };

  return (
    <div className="form-wrapper">
      <CustomTitle className="title">Đăng ký</CustomTitle>
      <Form
        form={form}
        className="form"
        labelAlign="left"
        labelCol={{ span: 5, offset: 1 }}
        wrapperCol={{ span: 16, offset: 0 }}
        onFinish={handleSignup}
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

        <Form.Item
          label="Nhập lại"
          name={"confirm-password"}
          rules={[
            { required: true, message: "Please input your username!" },

            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <CustomPassword />
        </Form.Item>

        <Form.Item label={""} wrapperCol={{ span: 24 }}>
          <Row>
            <Col span={7}></Col>
            <CustomCol span={14} justify="center">
              <CustomButton type="primary" block htmlType="submit">
                Đăng ký
              </CustomButton>
            </CustomCol>
            <Col span={4}></Col>
          </Row>
          <Row>
            <Col span={6}></Col>
            <CustomCol span={14} justify="center">
              <p>
                Đã có tài khoản?{" "}
                <Link onClick={() => navigate(config.router.login)}>
                  Đăng nhập
                </Link>
              </p>
            </CustomCol>
            <Col span={4}></Col>
          </Row>
        </Form.Item>
      </Form>

      <VerifyModal
        title={`Gửi mã xác minh đến email ${form.getFieldValue(
          "email"
        )}, bấm xác nhận gửi và vào mail để lấy mã`}
        isOpen={isOpenVerifyModal}
        onGetCode={getVerifyCode}
        onVerify={onVerify}
        verifyValue={verifyValue}
        setVerifyValue={setVerifyValue}
        onCancel={() => setIsOpenVerifyModal(false)}
      />
    </div>
  );
}

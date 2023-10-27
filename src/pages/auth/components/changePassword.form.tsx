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

export function ChangePassForm(props: ISignUpFormProps) {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleChangePass = async () => {
    if (
      form.getFieldValue("password") !== form.getFieldValue("confirm-password")
    ) {
      toast("2 Mật khẩu không trùng nhau");
      return;
    }
    const data = await authUtil.changePass({
      email: form.getFieldValue("email"),
      password: form.getFieldValue("password"),
      oldPassword: form.getFieldValue("old-password"),
    });
    if (data?.status === 200) {
      toast.success("Đổi thành công!");
      navigate(config.router.login);
    }
  };

  return (
    <div className="form-wrapper">
      <CustomTitle className="title">Đổi mật khẩu</CustomTitle>
      <Form
        form={form}
        className="form"
        labelAlign="left"
        labelCol={{ span: 6, offset: 1 }}
        wrapperCol={{ span: 16, offset: 0 }}
        onFinish={handleChangePass}
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
          label="Mật khẩu cũ"
          name={"old-password"}
          rules={[
            { required: true, message: "old password is required" },
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
          label="Mật khẩu mới"
          name={"password"}
          rules={[
            { required: true, message: "new password is required" },
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
            { required: true, message: "Please confirm password!" },

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
                Đổi mật khẩu
              </CustomButton>
            </CustomCol>
            <Col span={4}></Col>
          </Row>
          <Row>
            <Col span={6}></Col>
            <CustomCol span={14} justify="center">
              <p>
                Đổi ý?{" "}
                <Link onClick={() => navigate(config.router.login)}>
                  Đăng nhập
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

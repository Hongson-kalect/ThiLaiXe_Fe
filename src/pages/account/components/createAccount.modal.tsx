import { Button, Form, Modal } from "antd";
import * as React from "react";
import { toast } from "react-toastify";
import {
  CustomInput,
  CustomPassword,
  CustomSelect,
} from "src/components/CustomInput/CustomInput";
import { CustomTitle } from "src/components/CustomText/CustomText";
import { CustomFlexBox } from "src/components/FlexBox/FlexBox";
import { accountUtil } from "src/pages/utils/account.util";

export interface ICreateAccountModalProps {
  isOpen: boolean;
  onCancel: any;
}

export function CreateAccountModal(props: ICreateAccountModalProps) {
  const [form] = Form.useForm();

  const handleCreateAccount = async () => {
    if (window.confirm("Tạo mới tài khoản này?")) {
      try {
        await accountUtil.createAccount(form.getFieldsValue());
        toast.success("Thêm tài khoản thành công");
        props.onCancel();
      } catch (error) {
        toast.error("Tạo mới thất bại");
      }
    }
  };
  return (
    <Modal
      open={props.isOpen}
      closable={false}
      footer={false}
      onCancel={props.onCancel}
    >
      <CustomFlexBox direction="column" gap="16px">
        <CustomTitle>Thêm tài khoản mới</CustomTitle>
        <Form
          form={form}
          labelAlign="left"
          labelCol={{ span: 6, offset: 2 }}
          wrapperCol={{ span: 13, offset: 1 }}
          onFinish={handleCreateAccount}
          initialValues={{
            role: "member",
          }}
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
          <Form.Item label="Username" name={"username"}>
            <CustomInput placeholder="nullable" />
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
            label="Quyền hạn"
            name={"role"}
            rules={[{ required: true, message: "Cái này không thể bỏ trống" }]}
          >
            <CustomSelect
              options={[
                { value: "member", label: "Thành viên" },
                { value: "admin", label: "Admin" },
              ]}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 24 }}>
            <CustomFlexBox justify="center">
              <Button size="large" htmlType="submit" type="primary">
                Tạo tài khoản
              </Button>
            </CustomFlexBox>
          </Form.Item>
        </Form>
      </CustomFlexBox>
    </Modal>
  );
}

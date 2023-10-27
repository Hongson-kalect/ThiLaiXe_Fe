import { Button, Form } from "antd";
import { useState, useEffect } from "react";

import "./profile.scss";
import { CustomInput } from "src/components/CustomInput/CustomInput";
import { CustomTitle } from "src/components/CustomText/CustomText";
import { CustomFlexBox } from "src/components/FlexBox/FlexBox";
import Layout from "src/components/Layout/Layout";
import { useQuery } from "@tanstack/react-query";
import { profileUtil } from "../utils/profile.util";
import { useAppDispatch, useAppSelector } from "src/redux/store";
import { selectUserInfo } from "src/redux/selector/app.selector";
import { UserProfileType } from "src/interfaces/profile.type";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import config from "src/configs";
import { appSlice } from "src/redux/slices/app.slice";

type Props = {};

const Profile = (props: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useAppSelector(selectUserInfo);
  const [form] = Form.useForm();
  const [isEditInfo, setIsEditInfo] = useState(false);

  const getUserInfoFn = async () => {
    return await profileUtil.getUserProfile(id || 0);
  };
  const { data: userInfo, isLoading } = useQuery<UserProfileType>({
    queryFn: getUserInfoFn,
    queryKey: ["getUserInfo", id],
  });

  const handleEditClick = async () => {
    if (!isEditInfo) setIsEditInfo(true);
    else {
      try {
        await profileUtil.setUserProfile({
          ...form.getFieldsValue(),
          profileId: userInfo?.profile?.id || 0,
        });

        toast.success("profile updated");

        setIsEditInfo(false);
      } catch (error) {
        toast.error("Action Error");
      }
    }
  };

  useEffect(() => {
    if (!userInfo) return;
    form.setFieldsValue({
      email: userInfo?.email,
      username: userInfo?.username,
      firstName: userInfo?.profile?.firstName,
      lastName: userInfo?.profile?.lastName,
      date_of_birth: userInfo?.profile?.date_of_birth,
      place_of_birth: userInfo?.profile?.place_of_birth,
      phone: userInfo?.profile?.phone,
      address: userInfo?.profile?.address,
    });
  }, [userInfo]);

  useEffect(() => {
    dispatch(appSlice.actions.setLoading(isLoading));
  }, [isLoading]);

  return (
    <Layout className="profile-page" bottomHeight="52px">
      <div className="body">
        <div className="content">
          <CustomFlexBox justify="center">
            <CustomFlexBox
              className="profile-form-wrap"
              direction="column"
              alignitem="center"
              gap="32px"
            >
              <CustomTitle>Thông tin cá nhân</CustomTitle>
              <Form
                disabled={!isEditInfo}
                form={form}
                className="profile-form"
                labelCol={{ span: 6, offset: 1 }}
                labelAlign="left"
                wrapperCol={{ span: 16 }}
              >
                <Form.Item name={"email"} label="Email">
                  <CustomInput
                    placeholder="Not set"
                    disabled
                    value={userInfo?.email}
                  />
                </Form.Item>
                <Form.Item name={"username"} label="User Name">
                  <CustomInput placeholder="Not set" />
                </Form.Item>
                <Form.Item name={"firstName"} label="First Name">
                  <CustomInput placeholder="Not set" />
                </Form.Item>
                <Form.Item name={"lastName"} label="Last Name">
                  <CustomInput placeholder="Not set" />
                </Form.Item>
                <Form.Item name={"date_of_birth"} label="Date of Birth">
                  <CustomInput placeholder="Not set" />
                </Form.Item>
                <Form.Item name={"place_of_birth"} label="Place of birth">
                  <CustomInput placeholder="Not set" />
                </Form.Item>
                <Form.Item name={"phone"} label="Phone number">
                  <CustomInput placeholder="Not set" />
                </Form.Item>
                <Form.Item name={"address"} label="Address">
                  <CustomInput placeholder="Not set" />
                </Form.Item>
              </Form>

              <CustomFlexBox gap="12px">
                <Button
                  size="large"
                  type="primary"
                  onClick={() => navigate(config.router.record)}
                >
                  Lịch sử thi
                </Button>
                <Button size="large" type="primary" onClick={handleEditClick}>
                  Sửa thông tin
                </Button>
                <Button
                  size="large"
                  type="primary"
                  onClick={() => navigate(config.router.changePassword)}
                >
                  Đổi mật khẩu
                </Button>
              </CustomFlexBox>
            </CustomFlexBox>
          </CustomFlexBox>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;

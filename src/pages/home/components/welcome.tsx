import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { CustomFlexBox } from "src/components/FlexBox/FlexBox";
import config from "src/configs";
import { selectUserInfo } from "src/redux/selector/app.selector";
import { useAppSelector } from "src/redux/store";

export interface IWelcomeProps {}

export function Welcome(props: IWelcomeProps) {
  const navigate = useNavigate();
  const { role } = useAppSelector(selectUserInfo);
  return (
    <CustomFlexBox
      height="100%"
      direction="column"
      justify="space-evenly"
      className="welcome"
    >
      <CustomFlexBox direction="column" alignitem="center" justify="center">
        <p className="title">Chương trình ôn luyện lái xe</p>
        <p className="sub-title">Đầy đủ - Chính xác - Chất lượng</p>
      </CustomFlexBox>
      {role === "admin" ? (
        <CustomFlexBox
          alignitem="center"
          justify="space-evenly"
          width="100%"
          gap="8px"
        >
          <Card
            onClick={() => navigate(config.router.account)}
            className="card-item"
            hoverable
            style={{ width: 240, padding: "4px 6px" }}
            cover={
              <img
                alt="Manage account"
                src="https://cdn-icons-png.flaticon.com/512/32/32441.png"
              />
            }
          >
            <Meta
              title="Quản lý tài khoản"
              description="Xem thông tin về danh sách, quyền hạn."
            />
          </Card>
          <Card
            onClick={() => navigate(config.router.exam)}
            className="card-item"
            hoverable
            style={{ width: 240, padding: "4px 6px" }}
            cover={
              <img
                alt="Manage test exam"
                src="https://cdn-icons-png.flaticon.com/512/1581/1581942.png"
              />
            }
          >
            <Meta
              title="Quản lý đề bài"
              description="Tạo thêm kho đề bài cho hệ thống"
            />
          </Card>
          <Card
            onClick={() => navigate(config.router.question)}
            className="card-item"
            hoverable
            style={{ width: 240, padding: "4px 6px" }}
            cover={
              <img
                alt="Manage question"
                src="https://cdn-icons-png.flaticon.com/512/114/114903.png"
              />
            }
          >
            <Meta
              title="Quản lý câu hỏi"
              description="Xem và xử lý danh sách câu hỏi hiện tại"
            />
          </Card>
        </CustomFlexBox>
      ) : (
        <CustomFlexBox justify="center">
          <p className="sub-title">Cảm ơn bạn đã chọn chúng tôi!</p>
        </CustomFlexBox>
      )}
    </CustomFlexBox>
  );
}

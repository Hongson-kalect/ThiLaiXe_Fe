import React from "react";
import { CustomTitle } from "src/components/CustomText/CustomText";
import MenuItem from "../components/home.menuItem";

import "./home.scss";
import { useNavigate } from "react-router-dom";
import config from "src/configs";
import Layout from "src/components/Layout/Layout";
import { CustomFlexBox } from "src/components/FlexBox/FlexBox";
import { Card, FloatButton } from "antd";
import { ArrowDownOutlined } from "@ant-design/icons";
import { scrollToId } from "../utils/utils";
import { useAppSelector } from "src/redux/store";
import { selectUserInfo } from "src/redux/selector/app.selector";
import { Welcome } from "./components/welcome";
import Meta from "antd/es/card/Meta";

type Props = {};

const HomePage = (props: Props) => {
  const navigate = useNavigate();
  const to = (link: string) => {
    navigate(link);
  };

  const { role } = useAppSelector(selectUserInfo);

  return (
    <Layout>
      <FloatButton
        icon={<ArrowDownOutlined />}
        type="primary"
        style={{ right: 48 }}
        onClick={() => scrollToId("bottom")}
      />
      <div className="body">
        <div className="content  hide-scroll">
          <CustomFlexBox
            height="100%"
            justify="space-evenly"
            direction="column"
            className="home-page"
          >
            <div className="top">
              <CustomTitle>Luyện thi bằng lái xe</CustomTitle>
            </div>
            <CustomFlexBox className="content menu">
              <Card
                onClick={() => to(config.router.testOptions)}
                className="card-item"
                hoverable
                style={{ width: 240, padding: "4px 6px" }}
                cover={
                  <div
                    style={{
                      background:
                        "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSyqZR4VBZjID2MaI_nbVq02cQxwH3QsYOiA&usqp=CAU) center center no-repeat",
                      backgroundSize: "contain",
                      height: "200px",
                    }}
                  />
                }
              >
                <Meta
                  title="Thi thử ngay"
                  description="Thi thử và chấm điểm trực tiếp ngay với đầy đủ các loại đề thi cho tất cả các loại bằng lái."
                />
              </Card>
              <Card
                onClick={() => to(config.router.question)}
                className="card-item"
                hoverable
                style={{ width: 240, padding: "4px 6px" }}
                cover={
                  <div
                    style={{
                      background:
                        "url(https://thibanglaixe.com.vn/wp-content/uploads/2020/07/600-cau-hoi487.jpg) center center no-repeat",
                      backgroundSize: "contain",
                      height: "200px",
                    }}
                  />
                }
              >
                <Meta
                  title="Danh sách câu hỏi"
                  description="Tổng hợp đầy đủ câu hỏi được phân loại chi tiết theo các loại câu hỏi, bằng lái tương ứng."
                />
              </Card>
              <Card
                onClick={() => to(config.router.tip)}
                className="card-item"
                hoverable
                style={{ width: 240, padding: "4px 6px" }}
                cover={
                  <div
                    style={{
                      background:
                        "url(https://cdn-icons-png.flaticon.com/512/6194/6194008.png) center center no-repeat",
                      backgroundSize: "contain",
                      height: "200px",
                    }}
                  />
                }
              >
                <Meta
                  title="Mẹo thi"
                  description="Cung cấp một số mẹo thi hữu ích, gíp bạn ghi nhớ dễ dàng cách trả lời trong kỳ thi thực tế."
                />
              </Card>
              {/* <div className="item">
                  <MenuItem
                    onClick={() => to(config.router.testOptions)}
                    title="Thi thử ngay"
                    decribe="Thi thử và chấm điểm trực tiếp ngay với đầy đủ các loại đề thi cho tất cả các loại bằng lái."
                    imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSyqZR4VBZjID2MaI_nbVq02cQxwH3QsYOiA&usqp=CAU"
                  />
                </div> */}
              {/* <div className="item">
                  <MenuItem
                    onClick={() => to(config.router.question)}
                    title="Xem câu hỏi"
                    decribe="Tổng hợp đầy đủ câu hỏi được phân loại chi tiết theo các loại câu hỏi, bằng lái tương ứng"
                    imgSrc="https://thibanglaixe.com.vn/wp-content/uploads/2020/07/600-cau-hoi487.jpg"
                  />
                </div> */}
              {/* <div className="item">
                  <MenuItem
                    onClick={() => to(config.router.tip)}
                    title="Mẹo thi"
                    decribe="Cung cấp một số mẹo thi hữu ích, gíp bạn ghi nhớ dễ dàng cách trả lời trong kỳ thi thực tế"
                    imgSrc="https://cdn-icons-png.flaticon.com/512/6194/6194008.png"
                  />
                </div> */}
            </CustomFlexBox>
          </CustomFlexBox>
          <Welcome />
          <div id="bottom"></div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;

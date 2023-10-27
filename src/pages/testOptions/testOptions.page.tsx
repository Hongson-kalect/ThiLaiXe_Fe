import React, { useState } from "react";

import "./testOptions.scss";
import { CustomTitle } from "src/components/CustomText/CustomText";
import MenuItem from "../components/home.menuItem";
import Layout from "src/components/Layout/Layout";
import { Card, FloatButton, Modal } from "antd";
import TestList from "./components/testList";
import { QuestionCircleOutlined } from "@ant-design/icons";
import Meta from "antd/es/card/Meta";

type Props = {};

const TestOptions = (props: Props) => {
  const [examType, setExamType] = useState<
    null | "a1" | "a2" | "a34" | "b1" | "b2" | "c" | "def"
  >(null);

  const [openHelpModal, setOpenHelpModal] = useState(false);

  return (
    <>
      <Layout className="test-option-page">
        <div className="body">
          <div className="content menu">
            <div className="top">
              <CustomTitle className="title">Chọn loại bằng lái</CustomTitle>
            </div>
            <div className="list">
              <Card
                onClick={() => {
                  setExamType("a1");
                }}
                className="card-item"
                hoverable
                style={{ width: 240, padding: "4px 6px" }}
                cover={
                  <img
                    height="200"
                    alt="A1"
                    src="https://truongdaynghethanhcong.vn/wp-content/uploads/2019/01/XEMAYPNG-min-800x800.png"
                  />
                }
              >
                <Meta
                  title="Hạng A1 *"
                  description="Mô tô hai bánh có dung tích xy lanh từ 50 cm3 đến dưới 175 cm3. Mô tô 3 bánh cho người khuyết tật."
                />
              </Card>
              <Card
                onClick={() => {
                  setExamType("a2");
                }}
                className="card-item"
                hoverable
                style={{ width: 240, padding: "4px 6px" }}
                cover={
                  <img
                    height="200"
                    alt="Hạng A2"
                    src="https://banglaixeotohanoi.com/wp-content/uploads/2021/03/1-thi-bang-a2.jpg"
                  />
                }
              >
                <Meta
                  title="Hạng A2"
                  description="Mô tô hai bánh có dung tích xy lanh từ 175 cm3 trở lên và bao gồm các phương tiện của hạng xe A1"
                />
              </Card>
              <Card
                onClick={() => {
                  setExamType("a34");
                }}
                className="card-item"
                hoverable
                style={{ width: 240, padding: "4px 6px" }}
                cover={
                  <img
                    height="200"
                    alt="A3 & A4"
                    src="https://cdn.thuvienphapluat.vn/phap-luat/2022-2/HD/bang-lai-xe-a3.jpg"
                  />
                }
              >
                <Meta
                  title="A3 & A4"
                  description="A3 - Xe ba bánh. A4 - Xe kéo nhỏ, trọng tải đến 1000kg, bao gồm phương tiện của hạng xe A2. A1"
                />
              </Card>
              <Card
                onClick={() => {
                  setExamType("b1");
                }}
                className="card-item"
                hoverable
                style={{ width: 240, padding: "4px 6px" }}
                cover={
                  <img
                    height="200"
                    alt="Hạng B1 *"
                    src="https://hocthilaixeoto.com/upload/images/hoc-lai-xe-hang-B2.png"
                  />
                }
              >
                <Meta
                  title="Hạng B1 *"
                  description="Xe ô tô chở không quá 9 chỗ, cả vị trí tài xế. Trọng tải dưới 3500kg. Không hành nghề lái xe"
                />
              </Card>
              <Card
                onClick={() => {
                  setExamType("b2");
                }}
                className="card-item"
                hoverable
                style={{ width: 240, padding: "4px 6px" }}
                cover={
                  <img
                    height="200"
                    alt="Hạng B2"
                    src="https://hocthilaixeoto.com/upload/images/hoc-lai-xe-hang-B2.png"
                  />
                }
              >
                <Meta
                  title="Hạng B2"
                  description="Phương tiện của hạng xe B1, bằng này cho phép người điều khiển phương tiện hành nghề lái xe"
                />
              </Card>
              <Card
                onClick={() => {
                  setExamType("c");
                }}
                className="card-item"
                hoverable
                style={{ width: 240, padding: "4px 6px" }}
                cover={
                  <img
                    height="200"
                    alt="Hạng C"
                    src="https://dongtien.edu.vn/wp-content/uploads/2019/08/xe-tai-duoi-3.5-tan.jpg"
                  />
                }
              >
                <Meta
                  title="Hạng C"
                  description="Phương tiện hạng B1, B2 được phép hành nghề lái xe, được phép chở khối lượng hàng trên 3500kg"
                />
              </Card>
              <Card
                onClick={() => {
                  setExamType("def");
                }}
                className="card-item"
                hoverable
                style={{ width: 240, padding: "4px 6px" }}
                cover={
                  <img
                    height="200"
                    alt="Hạng D, E, F"
                    src="https://giadinh.mediacdn.vn/296230595582509056/2023/7/19/bang-lai-xe-hang-f-moi-1689757808635427679136.jpg"
                  />
                }
              >
                <Meta
                  title="Hạng D, E, F"
                  description="D - Giới hạn dưới 30 chỗ, E - Trên 30 chỗ. F+Hạng xe (FC,CD,FE) Loại xe tương ứng + rơ moóc"
                />
              </Card>

              {/* <div className="item">
                <MenuItem
                  onClick={() => {
                    setExamType("a1");
                  }}
                  title="Hạng A1 *"
                  decribe="Mô tô hai bánh có dung tích xy lanh từ 50 cm3 đến dưới 175 cm3. Mô tô 3 bánh cho người khuyết tật."
                  imgSrc="https://truongdaynghethanhcong.vn/wp-content/uploads/2019/01/XEMAYPNG-min-800x800.png"
                />
              </div>
              <div className="item">
                <MenuItem
                  onClick={() => {
                    setExamType("a2");
                  }}
                  title="Hạng A2"
                  decribe="Mô tô hai bánh có dung tích xy lanh từ 175 cm3 trở lên"
                  imgSrc="https://banglaixeotohanoi.com/wp-content/uploads/2021/03/1-thi-bang-a2.jpg"
                />
              </div>
              <div className="item">
                <MenuItem
                  onClick={() => {
                    setExamType("a34");
                  }}
                  title="A3 & A4"
                  decribe="A3 - Xe ba bánh. A4 - Xe kéo nhỏ, trọng tải đến 1000kg"
                  imgSrc="https://cdn.thuvienphapluat.vn/phap-luat/2022-2/HD/bang-lai-xe-a3.jpg"
                />
              </div>
              <div className="item">
                <MenuItem
                  onClick={() => {
                    setExamType("b1");
                  }}
                  title="Hạng B1 *"
                  decribe="Xe ô tô chở không quá 9. Trọng tải dưới 3500kg. Không hành nghề lái xe"
                  imgSrc="https://img2.bantoyota.com.vn/2022/03/01/z6MFjsm1/bang-b1-duoc-lai-nhung-xe-nao-0312.jpg"
                />
              </div>
              <div className="item">
                <MenuItem
                  onClick={() => {
                    setExamType("b2");
                  }}
                  title="Hạng B2"
                  decribe="B2 - Hành nghề lái xe"
                  imgSrc="https://dongtien.edu.vn/wp-content/uploads/2019/08/xe-tai-duoi-3.5-tan.jpg"
                />
              </div>
              <div className="item">
                <MenuItem
                  onClick={() => {
                    setExamType("c");
                  }}
                  title="Hạng C"
                  decribe="Xe hạng B1, 2 tải trọng Trên 3500kg"
                  imgSrc="https://dongtien.edu.vn/wp-content/uploads/2019/08/xe-tai-duoi-3.5-tan.jpg"
                />
              </div>
              <div className="item">
                <MenuItem
                  onClick={() => {
                    setExamType("def");
                  }}
                  title="Hạng D, E, F"
                  decribe="D - Dưới 30 chỗ, E - Trên 30 chỗ. F+Hạng xe (FC,CD,FE) Loại xe tương ứng + rơ moóc"
                  imgSrc="https://dongtien.edu.vn/wp-content/uploads/2019/08/xe-tai-duoi-3.5-tan.jpg"
                />
              </div> */}
              {/* <div className="item">
                <MenuItem
                  onClick={() => {
                    setAdjustExam(true);
                  }}
                  title="Đề tùy chỉnh"
                  decribe="Tự cấu hình số lượng câu hỏi, loại câu hỏi,..."
                  imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8BJDfXz2RKy5-rZOk5psOnvd0IPLGDso43g&usqp=CAU"
                />
              </div> */}
            </div>
          </div>
        </div>
      </Layout>
      <Modal
        open={!!examType}
        onCancel={() => setExamType(null)}
        footer={false}
        closable={false}
        width={1000}
      >
        <TestList type={examType || "a1"} />
      </Modal>
      <FloatButton
        onClick={() => setOpenHelpModal(true)}
        type="primary"
        style={{ right: 48 }}
        icon={<QuestionCircleOutlined />}
      />
      <Modal
        open={openHelpModal}
        onCancel={() => setOpenHelpModal(false)}
        footer={false}
        closable={false}
        width={800}
        className="test-options-help-modal"
      >
        <ul>
          <li>
            <b>Ký hiệu *:</b> Bằng lái thông dụng.
          </li>
          <li>Bằng lái A4 có thể điều khiển cả xe ở các hạng A1, A2.</li>
          <li>Bằng lái A3 có thể điều khiển cả xe ở các hạng A1, A2, A3.</li>
          <li>Bằng lái A2 có thể điều khiển cả xe ở các hạng A1.</li>
          <li>
            <b>{"Ta có A4 > A3 > A2 > A1."}</b>
          </li>
          <li>
            <b>{"Hiểu tương tự với F > E > D > C > B2 > B1."}</b>
          </li>
          <li>
            <b>A1 -</b> 25 câu hỏi, 19 phút thi, điểm đạt 21/25.
          </li>
          <li>
            <b>A2, A3, A4 -</b> 25 câu hỏi, 19 phút thi, điểm đạt 23/25.
          </li>
          <li>
            <b>B1 -</b> 30 câu hỏi, 20 phút thi, điểm đạt 27/30.
          </li>
          <li>
            <b>B2 -</b> 35 câu hỏi, 22 phút thi, điểm đạt 32/35.
          </li>
          <li>
            <b>C -</b> 40 câu hỏi, 24 phút thi, điểm đạt 36/40.
          </li>
          <li>
            <b>DEF -</b> 45 câu hỏi, 26 phút thi, điểm đạt 41/45.
          </li>
          <li>
            <b>P/S :</b> Hiện tại, mỗi loại đề đều có 20 đề thi cố định. Ngoài
            ra, bạn có thể chọn tạo đề tự động, 1 đề mới sẽ được tạo ra cho bạn.
            Đề cố định sẽ lưu lại kết quả làm bài cho những tài khoản đã đăng
            nhập - Xem ở mục profile.
          </li>
        </ul>
      </Modal>
    </>
  );
};

export default TestOptions;

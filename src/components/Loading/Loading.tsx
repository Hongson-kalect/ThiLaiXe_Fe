import React from "react";

import "./Loading.scss";
import { LoadingOutlined } from "@ant-design/icons";
import { CustomFlexBox } from "../FlexBox/FlexBox";

const Loading = () => {
  const [isSpin, setIsSpin] = React.useState(false);

  return (
    <div className={`loading-wrapper ${isSpin ? "spin" : ""}`}>
      <CustomFlexBox gap="12px" direction="column">
        <LoadingOutlined />
        <div>Loading...</div>
      </CustomFlexBox>
    </div>
  );
};

export default Loading;

import { Button } from "antd";
import { styled } from "styled-components";

export const CustomButton = styled(Button)`
  outline: none;
  border: none;
  box-shadow: none;
  font-size: 16px !important;
  font-weight: 600;
  height: ${(props) =>
    props.size === "large"
      ? "56px"
      : props.size === "small"
      ? "24px"
      : "40px"} !important;
`;

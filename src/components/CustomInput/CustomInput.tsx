import { DatePicker, Input, InputNumber, Select } from "antd";
import { styled } from "styled-components";

export const CustomInput = styled(Input)`
  align-items: center;
  font-weight: 500;
  height: 44px;
  padding: 11px 12px;
  outline: none !important;
  border: none !important;
  box-shadow: none !important;
  background-color: #f1f3f5;
`;

export const CustomPassword = styled(Input.Password)`
  align-items: center;
  font-weight: 500;
  height: 44px;
  padding: 11px 12px;
  outline: none !important;
  border: none !important;
  box-shadow: none !important;
  background-color: #f1f3f5;
  input {
    background-color: #f1f3f5;
  }
`;

export const CustomInputNumber = styled(InputNumber)`
  outline: none;
  border: none;
  box-shadow: none !important;
  background-color: #efefef;
`;

export const CustomSelect = styled(Select)`
  min-width: 100px;
  outline: none;
  border: none;
  box-shadow: none !important;
  /* background-color: #efefef; */
  .ant-select-selector {
    outline: none;
    border: none !important;
    box-shadow: none !important;
    background-color: #efefef !important;
  }
`;

export const CustomDatePicker = styled(DatePicker)`
  outline: none;
  border: none;
  box-shadow: none !important;
  background-color: #efefef !important;
  height: 30px;
`;

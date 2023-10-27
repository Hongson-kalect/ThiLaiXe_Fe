import { useState, useEffect } from "react";

import "./VerifyModal.scss";
import { Button, Modal } from "antd";
import styled from "styled-components";
import { CustomFlexBox } from "../FlexBox/FlexBox";
import { CustomInput, CustomInputNumber } from "../CustomInput/CustomInput";

export interface IVerifyModalProps {
  isOpen: boolean;
  onCancel?: () => void;
  onGetCode: () => void;
  onVerify: () => void;
  title?: string;
  verifyValue: string;
  setVerifyValue: React.Dispatch<React.SetStateAction<string>>;
}
let timer: NodeJS.Timeout;

export function VerifyModal(props: IVerifyModalProps) {
  const [remainTime, setRemainTime] = useState(0);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleGetCode = () => {
    if (remainTime) return;

    props.onGetCode();
    setRemainTime(60);
    timer = setInterval(() => {
      setRemainTime((prev) => prev - 1);
    }, 1000);
  };

  const handleVerify = () => {
    setButtonDisabled(true);
    props.onVerify();
    setTimeout(() => {
      setButtonDisabled(false);
    }, 5000);
  };

  useEffect(() => {
    if (!remainTime) {
      if (timer) clearInterval(timer);
    }
  }, [remainTime]);

  const onClose = () => {
    clearInterval(timer);
    setRemainTime(0);
    props.setVerifyValue("");
    props.onCancel && props.onCancel();
  };

  return (
    <Modal
      open={props.isOpen}
      closable={false}
      footer={false}
      onCancel={onClose}
    >
      <CustomFlexBox justify="center" margin="0px 4px 8px">
        {props.title}
      </CustomFlexBox>
      <CustomFlexBox gap="8px" alignitem="center">
        <CustomInput
          value={props.verifyValue}
          onChange={(e) => props.setVerifyValue(e.target.value)}
        />
        <Button type="primary" ghost={!!remainTime} onClick={handleGetCode}>
          {remainTime ? remainTime + "s" : "Lấy mã"}
        </Button>
      </CustomFlexBox>

      <CustomFlexBox justify="center" margin="12px 0 0 0">
        <Button
          onClick={handleVerify}
          loading={buttonDisabled}
          disabled={buttonDisabled}
          type="primary"
          size="large"
        >
          Xác minh
        </Button>
      </CustomFlexBox>
    </Modal>
  );
}

import { Form } from "antd";
import { styled } from "styled-components";

export const CustomFormItem = styled(Form.Item)`
  display: flex;
  align-items: center;
`;

type formItemProps = {
  className?: string;
  label?: string;
  name?: string;
  rules?: any[];
  valuePropName?: string;
  marginbottom?: string;
  children: React.ReactNode;
};

const FormItemWrapper = ({ className, children, ...props }: formItemProps) => {
  return (
    <Form.Item className={className} {...props}>
      {children}
    </Form.Item>
  );
};

export const FormItemNoMargin = styled(FormItemWrapper)`
  margin-bottom: ${(props) => props.marginbottom || "12px"};
  .ant-row.ant-form-item-row {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
`;

export const CustomForm = styled(Form)`
  .ant-col > label {
    font-size: 16px !important;
  }
  width: 100%;
`;

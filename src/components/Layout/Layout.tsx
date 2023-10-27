import { Col } from "antd";
import React from "react";
import { styled } from "styled-components";

type Props = {
  backGround?: string;
  topBackGround?: string;
  bodyBackGround?: string;
  contentBackGround?: string;
  rightNavBackGround?: string;
  leftNavBackGround?: string;
  bottomBackGround?: string;

  topHeight?: string;
  bodyHeight?: string;
  bottomHeight?: string;
  leftNavWidth?: string;
  rightNavWidth?: string;

  className?: string;
  noParent?: boolean;
  height?: string;
  width?: string;

  layoutGap?: string;
  topBottomGap?: string;
  bodyGap?: string;
  children?: React.ReactNode;
  childrenClassNameList?:
    | "top"
    | "body"
    | "left-nav"
    | "content"
    | "right-nav"
    | "bottom";
};

type ColProps = {
  span?: number;
  className?: string;
  children?: React.ReactNode;
  style?: any;
  justify?:
    | "center"
    | "flex-start"
    | "flex-end"
    | "space-between"
    | "space-evenly";
};

export const LayoutRender = ({ className, children }: Props) => {
  return <div className={className}>{children}</div>;
};

const ColRender = ({ className, children, style, ...props }: ColProps) => {
  return (
    <Col className={className} {...props}>
      {children}
    </Col>
  );
};

export const Layout = styled(LayoutRender)`
  ${(props) => (props.backGround ? `background: ${props.backGround}` : null)};

  display: flex;
  flex-direction: column;
  height: ${(props) => (props.noParent ? "100vh" : "100%")};
  width: ${(props) => (props.noParent ? "100vw" : "100%")};
  row-gap: ${(props) => props.layoutGap || "0px"};
  ${(props) => (props.height ? `height: ${props.height}` : null)};
  ${(props) => (props.width ? `width: ${props.width}` : null)};

  & > .top {
    ${(props) =>
      props.topBackGround ? `background: ${props.topBackGround}` : null};
    height: ${(props) => props.topHeight || "40px"};
    display: flex;
    justify-content: center;
    align-items: center;
    gap: ${(props) => props.topBottomGap || "4px"};
  }

  & > .body {
    ${(props) =>
      props.bodyBackGround ? `background: ${props.bodyBackGround}` : null};
    overflow: auto;
    height: ${(props) =>
      props.bodyHeight ||
      `calc(100% - ${props.topHeight || "0px"} - ${
        props.bottomHeight || "0px"
      })`};
    display: flex;
    flex: 1;
    column-gap: ${(props) => props.bodyGap || "0px"};

    & > .left-nav {
      ${(props) =>
        props.leftNavBackGround
          ? `background: ${props.leftNavBackGround}`
          : null};
      width: ${(props) => props.leftNavWidth || "25%"};
    }

    & > .content {
      ${(props) =>
        props.contentBackGround
          ? `background: ${props.contentBackGround}`
          : null};
      overflow: auto;
      height: 100%;
      width: ${(props) =>
        `calc(100% - ${props.leftNavWidth || "0px"} - ${
          props.rightNavWidth || "0px"
        })`};
    }

    & > .right-nav {
      ${(props) =>
        props.rightNavBackGround
          ? `background: ${props.rightNavBackGround}`
          : null};
      width: ${(props) => props.rightNavWidth || "25%"};
    }
  }

  & > .bottom {
    ${(props) =>
      props.bottomBackGround ? `background: ${props.bottomBackGround}` : null};
    height: ${(props) => props.bottomHeight || "32px"};
    display: flex;
    justify-content: center;
    align-items: center;

    gap: ${(props) => props.topBottomGap || "4px"};
  }
`;

export const CustomCol = styled(ColRender)`
  ${(props) =>
    props.justify ? "display:flex;justify-content:" + props.justify : null}
`;

export default Layout;

import { Typography } from "antd";
import * as React from "react";
import styled from "styled-components";
import "./CustomText.scss";
import { Link } from "react-router-dom";

type ICenterTextProps = {};

export const CustomLink = styled(Link)`
  display: inline-block;
  font-size: 12px;
  font-weight: 400;
  width: 100%;
  text-align: center;
  color: ${(props) => props.color || "black"};
  font-style: italic;
`;

export const CustomLargeTitle = styled.div`
  font-size: 40px;
  text-transform: uppercase;
  color: #222;
  letter-spacing: 1px;
  font-family: "Playfair Display", serif;
  font-weight: 400;
`;

export const CustomTitle = styled.div`
  font-size: 24px;
  text-align: center;
  text-transform: uppercase;
  color: #222;
  letter-spacing: 1px;
  font-family: "Playfair Display", serif;
  font-weight: 400;
`;

export const CustomSmallTitle = styled.div`
  font-size: 16px;
  text-transform: uppercase;
  color: #222;
  letter-spacing: 1px;
  font-family: "Playfair Display", serif;
  font-weight: 400;
`;

// export default function CustomText(props: ICenterTextProps) {
//   return <div></div>;
// }

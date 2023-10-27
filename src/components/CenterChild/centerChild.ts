import React from "react";
import { styled } from "styled-components";

type Props = {
  children: React.ReactNode;
};
export const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

// const CenterChild = (children: Props) => {
//   return (
//     <Center>{children}</Center>
//   )
// }

// export default CenterChild

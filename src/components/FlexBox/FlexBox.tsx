import styled from "styled-components";

type FlexBoxDeclareProps = {
  className?: string;
  children?: React.ReactNode;
  padding?: string;
  margin?: string;

  direction?: "column" | "row";
  alignitem?: "center" | "flex-start" | "flex-end";
  justify?:
    | "center"
    | "flex-start"
    | "flex-end"
    | "space-between"
    | "space-evenly"
    | "space-around";
  gap?: string;

  background?: string;

  width?: string;
  height?: string;
};

const FlexBoxDeclare = ({
  className,
  children,
  ...props
}: FlexBoxDeclareProps) => {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
};

export const CustomFlexBox = styled(FlexBoxDeclare)`
  display: flex;

  ${(props) => (props.height ? `height:${props.height};` : null)}
  ${(props) => (props.width ? `width:${props.width};` : null)}

    ${(props) =>
    props.direction ? `flex-direction:${props.direction};` : null}
    ${(props) => (props.alignitem ? `align-items:${props.alignitem};` : null)}
    ${(props) => (props.justify ? `justify-content:${props.justify};` : null)}
    ${(props) => (props.background ? `background:${props.background};` : null)}
    ${(props) => (props.gap ? `gap:${props.gap};` : null)}
    ${(props) => (props.padding ? `padding:${props.padding};` : null)}
    ${(props) => (props.margin ? `margin:${props.margin};` : null)}
`;

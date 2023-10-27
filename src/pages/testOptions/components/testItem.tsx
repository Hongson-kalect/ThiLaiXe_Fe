import * as React from "react";

export interface ITestItemProps {
  name: string;
}

export function TestItem(props: ITestItemProps) {
  return <div className="test-item">{props.name}</div>;
}

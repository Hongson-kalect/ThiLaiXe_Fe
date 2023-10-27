import React, { useEffect, useState } from "react";

import "./pages.scss";

type Props = {
  onClick: () => void;
  title: string;
  imgSrc: string;
  decribe?: string;
};

const MenuItem = (props: Props) => {
  const [disappear, setDisappear] = useState(false);
  const [mouseOver, setMouseOver] = useState(false);

  useEffect(() => {
    let d: NodeJS.Timeout;
    if (disappear) {
      d = setTimeout(() => {
        setDisappear(false);
        setMouseOver(false);
      }, 300);
    }

    return () => {
      if (d) clearTimeout(d);
    };
  }, [disappear]);
  return (
    <div
      className="home-menu-item"
      onClick={props.onClick}
      onMouseEnter={() => {
        setMouseOver(true);
        setDisappear(false);
      }}
      onMouseLeave={() => {
        setDisappear(true);
      }}
    >
      <div
        className="img"
        style={{
          backgroundImage: `url(${props.imgSrc}),linear-gradient(to right, gray , #4c4c4c)`,
        }}
      />
      <div className="info">
        <p className="title" style={{ textAlign: "center" }}>
          {props.title}
        </p>
        {mouseOver ? (
          <p className={`decribe ${disappear ? "disappear" : ""}`}>
            {props.decribe}
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default MenuItem;

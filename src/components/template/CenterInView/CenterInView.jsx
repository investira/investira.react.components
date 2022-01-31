import React from "react";
import Style from "./CenterInView.module.scss";

const CenterInView = (props) => {
  return (
    <div className={Style.root} {...props}>
      <div className={Style.child}>{props.children}</div>
    </div>
  );
};

CenterInView.displayName = "CenterInView";

export default CenterInView;

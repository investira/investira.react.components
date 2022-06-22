import React, { useState } from "react";
import { renders } from "investira.react.lib";
import Basic from "../Basic";

import Style from "./ContainerFeedback.module.scss";

function ContainerFeedback(props) {
  const [feedbackClick, setFeedbackClick] = useState(false);
  const [epicenter, setEpicenter] = useState({
    left: 0,
    top: 0,
    radius: 0,
  });

  function handleFeedbackClick(e) {
    let xEpicenter = epicenter;
    if (feedbackClick) {
      xEpicenter = epicenter;
    } else {
      xEpicenter = renders.getEpicenterLeftTop(e, props.centralized);
    }

    setFeedbackClick(!feedbackClick);
    setEpicenter(xEpicenter);
  }

  return (
    <>
      <Basic className={Style.root}>{props.children}</Basic>
      <span
        className={Style.container}
        onMouseDown={handleFeedbackClick}
        style={props.centralized ? { overflow: "unset" } : {}}
      >
        {feedbackClick && (
          <span
            className={Style.animation}
            style={{
              left: epicenter.left,
              top: epicenter.top,
              width: epicenter.radius,
              height: epicenter.radius,
            }}
            onAnimationEnd={handleFeedbackClick}
          >
            <span className={Style.animation_background} />
          </span>
        )}
      </span>
    </>
  );
}

export default ContainerFeedback;

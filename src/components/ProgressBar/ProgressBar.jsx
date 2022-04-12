import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import Style from "./ProgressBar.module.scss";

function ProgressBar(props) {
  const xSpanClass = classNames(Style.progressBarFill, {
    [Style.animate]: props.animate === "indeterminate",
  });

  const xRootClass = classNames(Style.progressBar, props.className);

  return (
    <div className={xRootClass}>
      <span
        style={{
          width: `${String(props.value)}%`,
          backgroundColor: `var(--color-${props.color})`,
        }}
        className={xSpanClass}
      ></span>
      <span
        style={{
          backgroundColor: `var(--color-${props.color})`,
        }}
        className={xSpanClass}
      ></span>
    </div>
  );
}

ProgressBar.propTypes = {
  color: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  animate: PropTypes.oneOf(["indeterminate", "progress"]),
};

ProgressBar.defaultProps = {
  color: "primary",
  value: 100,
  animate: "progress",
};

export default ProgressBar;

import React, { memo } from "react";
import PropTypes from "prop-types";
import { validators } from "investira.sdk";
import Style from "./Deck.module.scss";

const Deck = memo((props) => {
  function isActive(activeView, id) {
    if (activeView === id) {
      return true;
    }
    return false;
  }

  function isPrev(prevView, id) {
    if (prevView.includes(id)) {
      return true;
    }
    return false;
  }

  function viewState(pId) {
    let classname = Style.view;

    if (isPrev(props.prevView, pId)) {
      classname += ` ${Style.viewPrev} `;
    }

    if (isActive(props.activeView, pId)) {
      classname += ` ${Style.viewActive} `;
    }

    if (!isActive(props.activeView, pId) && !isPrev(props.prevView, pId)) {
      classname += ` ${Style.viewOffset} `;
    }

    return classname;
  }

  const spreadChildren = (pChildren) => {
    const xNewChildren = [];

    for (const child of pChildren) {
      if (validators.isArray(child)) {
        xNewChildren.push(...child);
      } else {
        xNewChildren.push(child);
      }
    }

    return xNewChildren;
  };

  const styleView = (pActiveView, pChildId, pIndex) => {
    const isActive = pActiveView === pChildId;
    return isActive ? { zIndex: 1101 + pIndex } : { zIndex: 1100 };
  };

  function mapChildrens(pChildren) {
    const xChildrens = spreadChildren(pChildren);
    const xElements = xChildrens.map((xChild, xIndex) => {
      if (xChild !== false) {
        return (
          <div
            key={xIndex}
            id={`${xChild.props.id}`}
            className={viewState(xChild.props.id)}
            style={styleView(props.activeView, xChild.props.id, xIndex)}
          >
            {xChild}
          </div>
        );
      }
      return false;
    });

    return xElements;
  }

  const { children, id } = props;

  return (
    <div id={`deck-${id}`} className={Style.deck}>
      <div id={`deck-${id}__wrap`} className={Style.wrap}>
        {children.constructor === Array
          ? mapChildrens(children)
          : props.children}
      </div>
    </div>
  );
});

Deck.propTypes = {
  id: PropTypes.string.isRequired,
  prevView: PropTypes.array,
  activeView: PropTypes.string,
};

Deck.defaultProps = {
  prevView: [],
};

export default Deck;

import React, { memo, useCallback } from "react";
import PropTypes from "prop-types";
import { validators } from "investira.sdk";
import {
  useParams,
  useRouteMatch,
  useLocation,
  useHistory,
} from "react-router-dom";
import Style from "./Deck.module.scss";

const Deck = memo((props) => {
  const match = useRouteMatch();
  const location = useLocation();
  const params = useParams();
  const history = useHistory();

  // console.log("match", match);
  // console.log("location", location);
  // console.log("params", params);
  // console.log("history", history);

  const isActive = useCallback(
    (pActiveView, pId) => {
      if (pActiveView === pId) {
        return true;
      }
      return false;
    },
    [match.url]
  );

  const isPrev = useCallback((pPrevView, id) => {
    if (pPrevView.includes(id)) {
      return true;
    }
    return false;
  }, []);

  const viewState = useCallback(
    (pId) => {
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
    },
    [isActive, isPrev, props.activeView, props.prevView]
  );

  const spreadChildren = useCallback((pChildren) => {
    const xNewChildren = [];

    for (const child of pChildren) {
      if (validators.isArray(child)) {
        xNewChildren.push(...child);
      } else {
        xNewChildren.push(child);
      }
    }

    return xNewChildren;
  }, []);

  const styleView = (pActiveView, pChildId, pIndex) => {
    const isActive = pActiveView === pChildId;
    return isActive ? { zIndex: 1101 + pIndex } : { zIndex: 1100 };
  };

  const mapChildrens = useCallback(
    (pChildren) => {
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
    },
    [props.activeView, viewState]
  );

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

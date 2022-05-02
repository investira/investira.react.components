import React, { memo, useState, useEffect, useRef } from "react";
import { validators } from "investira.sdk";
import PropTypes from "prop-types";
import { DeckContext } from "../";
import { useRouteMatch, useHistory } from "react-router-dom";

const DeckProvider = memo((props) => {
  const [activeView, setActive] = useState(null);
  const [prevView, setPreview] = useState([]);
  const [beforeView, setBeforeView] = useState(null);

  const URL = useRef(null);

  const match = useRouteMatch();
  const history = useHistory();

  const isActive = (pId) => {
    return pId === activeView;
  };

  const isBefore = (pId) => {
    return pId === beforeView;
  };

  const pushRoute = (pId) => {
    history.push(`${URL.current}/${pId}`);
  };

  const handleNextView = (pId) => {
    let xPrevView = [...prevView, activeView];

    setActive(pId);
    setPreview(xPrevView);
    setBeforeView(activeView);
  };

  const handleForwardView = (pId) => {
    pushRoute(pId);
    handleNextView(pId);
  };

  const handlePrevView = (pCallback) => {
    if (!validators.isEmpty(prevView)) {
      let xPrevView = [...prevView];
      const xActive = xPrevView.pop();

      props.withRoute && history.goBack();

      setActive(xActive);
      setPreview(xPrevView);
      setBeforeView(activeView);
    }

    pCallback && pCallback({ activeView, prevView, beforeView });
  };

  const handleResetState = (pActive = null, pPreview = [], pCallback) => {
    setActive(pActive);
    setPreview(pPreview);
    pCallback && pCallback();
  };

  useEffect(() => {
    URL.current = match.url;
    //pushRoute(props.initialView);

    setActive(props.initialView);
    setPreview(props.initialPrev);
  }, [props.initialView, props.initialPrev]);

  return (
    <>
      <DeckContext.Provider
        value={{
          ...props.value,
          activeView,
          prevView,
          isActive,
          isBefore,
          beforeView,
          onNextView: handleNextView,
          onPrevView: handlePrevView,
          onReset: handleResetState,
          onForwardView: handleForwardView,
        }}
      >
        {props.children}
      </DeckContext.Provider>
    </>
  );
});

DeckProvider.displayName = "DeckProvider";

DeckProvider.propTypes = {
  initialView: PropTypes.string.isRequired,
  initialPrev: PropTypes.array,
  withRoute: PropTypes.bool,
};

DeckProvider.defaultProps = {
  value: {},
  initialPrev: [],
  withRoute: false,
};

export default DeckProvider;

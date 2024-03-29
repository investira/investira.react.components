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

  const pushRoute = (pUrl, pId) => {
    history.push(`${pUrl}/${pId}`);
  };

  const pushPathName = () => {
    history.push({ pathname: match.url + `/${props.initialView}` });
  };

  const handleNextView = (pId) => {
    let xPrevView = [...prevView, activeView];

    setActive(pId);
    setPreview(xPrevView);
    setBeforeView(activeView);
  };

  const handleForwardView = (pId) => {
    pushRoute(URL.current, pId);
    handleNextView(pId);
  };

  const handlePrevView = (pCallback) => {
    if (!validators.isEmpty(prevView)) {
      let xPrevView = [...prevView];
      const xActive = xPrevView.pop();
      const xIsInitialView = xActive === props.initialView;
      props.withRoute && history.goBack();
      xIsInitialView && props.withRoute && pushPathName();

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
    setActive(props.initialView);
    setPreview(props.initialPrev);
  }, [props.initialView, props.initialPrev]);

  useEffect(() => {
    props.withRoute && pushPathName();
  }, []);
  return (
    <>
      <DeckContext.Provider
        value={{
          ...props.value,
          activeView: activeView,
          prevView: prevView,
          isActive: isActive,
          isBefore: isBefore,
          beforeView: beforeView,
          handleNextView: handleNextView,
          handlePrevView: handlePrevView,
          handleReset: handleResetState,
          handleForwardView: handleForwardView,
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

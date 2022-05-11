import React, { memo, useState } from "react";
import CrudContext from "../CrudContext";

const CrudProvider = memo((props) => {
  const [itemData, setItemData] = useState({});

  const state = { ...props.state, itemData };

  const onCreate = (pValues, pActions) => {
    props.actions.onCreate && props.actions.onCreate(pValues, pActions);
  };

  const onRead = (pParams, pService, pSuccess, pError, pIsFetching) => {
    props.actions.onRead &&
      props.actions.onRead(pParams, pService, pSuccess, pError, pIsFetching);
  };

  const onReadOne = (pData, pCallback) => {
    setItemData(pData);
    pCallback && pCallback(pData);
  };

  const onUpdate = (pValues, pActions) => {
    props.actions.onUpdate && props.actions.onUpdate(pValues, pActions);
  };

  const onDelete = (pValues, pActions) => {
    props.actions.onDelete && props.actions.onDelete(pValues, pActions);
  };

  const actions = {
    customActions: props.customActions,
    onCreate,
    onRead,
    onReadOne,
    onUpdate,
    onDelete,
  };

  return (
    <>
      <CrudContext.Provider
        value={{
          ...state,
          ...actions,
        }}
      >
        {props.children}
      </CrudContext.Provider>
    </>
  );
});

CrudProvider.displayName = "CrudProvider";

export default CrudProvider;

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { validators } from "investira.sdk";

import { CenterInView } from "../template";
import Typography from "../wrappers/Typography";

import Style from "./ContentList.module.scss";

function ContentList(props) {
  const hasListData = (pList) => {
    return validators.isEmpty(pList);
  };

  const isDataValid = (pList) => {
    if (hasListData(pList) && validators.isArray(pList)) {
      return !validators.isNull(pList[0].id);
    } else {
      return false;
    }
  };

  const xClassRoot = classNames(Style.root, props.className, {
    [Style.emptyList]: hasListData(props.list),
  });

  if (validators.isNull(props.list)) {
    return (
      <CenterInView>
        <Typography variant={"body2"} align={"center"} color={"textSecondary"}>
          Propriedade <b>list</b> está indefinida. É necessário que um array
          seja atribuido.
        </Typography>
      </CenterInView>
    );
  }

  if (validators.isNull(props.item)) {
    return (
      <CenterInView>
        <Typography variant={"body2"} align={"center"} color={"textSecondary"}>
          Propriedade <b>item</b> está indefinida. É necessário que um
          componente seja atribuido.
        </Typography>
      </CenterInView>
    );
  }

  const Component = props.item;
  const { keyName, ...othersItemProps } = props.itemProps;

  return (
    <div className={xClassRoot}>
      {hasListData(props.list) ? (
        <CenterInView>
          <Typography
            variant={"body2"}
            align={"center"}
            color={"textSecondary"}
          >
            {props.emptyMessage || "Lista está vazia"}
          </Typography>
        </CenterInView>
      ) : isDataValid(props.list) ? (
        <CenterInView>
          <Typography
            variant={"body2"}
            align={"center"}
            color={"textSecondary"}
          >
            É necessário haver um id único
          </Typography>
        </CenterInView>
      ) : (
        <TransitionGroup
          className={Style.list}
          appear={true}
          enter={true}
          exit={true}
        >
          {Object.values(props.list).map((xItem, xIndex) => {
            return (
              <CSSTransition
                key={xItem[keyName] || xIndex}
                in={true}
                timeout={500}
                classNames={Style}
                unmountOnExit
                appear
                onEnter={props.onEnter}
                onExited={props.onExited}
              >
                <Component
                  key={`Item-${xItem[keyName] || xIndex}`}
                  data={xItem}
                  {...othersItemProps}
                />
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      )}
    </div>
  );
}

ContentList.propTypes = {
  list: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  emptyMessage: PropTypes.string,
  item: PropTypes.oneOfType([
    PropTypes.elementType,
    PropTypes.node,
    PropTypes.func,
  ]).isRequired,
  className: PropTypes.object,
  itemProps: PropTypes.object,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};

ContentList.defaultProps = {
  itemProps: {},
};

export default ContentList;

import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  InfiniteLoader,
} from "react-virtualized";
import { validators, strings } from "investira.sdk";
import { Box } from "../";

const STATUS_LOADING = 1;
const STATUS_LOADED = 2;

function ListVirtual(props) {
  const _onMount = useRef(false);
  const listRoot = useRef();
  const cache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 100,
    //keyMapper: index => props.list[index]
  });

  const timeoutIdMap = {};

  const [loadedRowCount, setLoadedRowCount] = useState(0);
  const [loadedRowsMap, setLoadedRowsMap] = useState({});
  const [loadingRowCount, setLoadingRowCount] = useState(0);

  const hasListData = (pList) => {
    return validators.isEmpty(pList);
  };

  const isRowLoaded = ({ index }) => {
    return !!loadedRowsMap[index];
    // return ({ index }) => index < props.list.length;
  };

  const loadMoreRows = ({ startIndex, stopIndex }) => {
    const { nextPage, onNextPage } = props;

    const xIncrement = stopIndex - startIndex + 1;

    for (let xI = startIndex; xI <= stopIndex; xI++) {
      loadedRowsMap[xI] = STATUS_LOADING;
    }

    _onMount && setLoadingRowCount(loadingRowCount + xIncrement);

    const timeoutId = setTimeout(() => {
      delete timeoutIdMap[timeoutId];

      for (let xI = startIndex; xI <= stopIndex; xI++) {
        loadedRowsMap[xI] = STATUS_LOADED;
      }

      _onMount && setLoadingRowCount(loadingRowCount - xIncrement);
      setLoadedRowCount(loadedRowCount + xIncrement);

      promiseResolver();
    }, 1000);

    let promiseResolver;

    // Realiza request se tiver mais páginas
    const xSize = props.list.length;

    if (startIndex > xSize / 2 && stopIndex <= xSize - 1 && nextPage) {
      const xParams = strings.querystringToObject(nextPage);
      onNextPage && onNextPage(xParams);
    }

    return new Promise((resolve) => {
      promiseResolver = resolve;
    });
  };

  function renderRow({ index, key, style, parent }) {
    const Component = props.item;
    const { keyName, ...othersItemProps } = props.itemProps;

    const { list } = props;
    const isLoaded = loadedRowsMap[index] === STATUS_LOADED;

    return (
      <CellMeasurer
        key={key}
        cache={cache}
        parent={parent}
        columnIndex={0}
        rowIndex={index}
      >
        <div key={key} style={style}>
          <Component
            isLoaded={isLoaded}
            key={`Item-${key}`}
            index={index}
            data={list[index] || {}}
            {...othersItemProps}
          />
        </div>
      </CellMeasurer>
    );
  }

  const removeTabIndex = (pListRootElem) => {
    if (pListRootElem?.current) {
      const xReactVirtualizedElem = pListRootElem.current.querySelector(
        '[aria-readonly="true"]'
      );

      xReactVirtualizedElem.removeAttribute("tabindex");
    }
  };

  useEffect(() => {
    _onMount.current = true;
    removeTabIndex(listRoot);
    return () => {
      _onMount.current = false;
    };
  }, []);

  // useEffect(() => {
  //   const newRows = props.list.filter(
  //     (value) => prevProps.list.indexOf(value) < 0
  //   );
  //   const newRowsIndex = newRows.map((value) => props.list.indexOf(value));
  //   newRowsIndex.forEach((index) => {
  //     cache.clear(index);
  //   });

  //   newRowsIndex.length &&
  //     _list.recomputeRowHeights(Math.min(...newRowsIndex));
  // },[list])
  //const xRowCount = props.list.length;
  const xRowCount = props.totalItens || props.list.length;

  return (
    <Box
      ref={listRoot}
      sx={[
        { position: "relative", minHeight: "100%" },
        hasListData(props.list) && { height: "100%" },
      ]}
    >
      <InfiniteLoader
        isRowLoaded={isRowLoaded}
        loadMoreRows={loadMoreRows}
        rowCount={xRowCount}
      >
        {({ onRowsRendered, registerChild }) => (
          <AutoSizer>
            {({ width, height }) => (
              <List
                //ref={registerChild}
                ref={(element) => {
                  // _list = element;
                  registerChild(element);
                }}
                width={width}
                onRowsRendered={onRowsRendered}
                height={height}
                deferredMeasurementCache={cache}
                rowHeight={cache.rowHeight}
                rowRenderer={renderRow}
                rowCount={xRowCount}
                overscanRowCount={props.overscanRowCount}
              />
            )}
          </AutoSizer>
        )}
      </InfiniteLoader>
    </Box>
  );
}

ListVirtual.propTypes = {
  list: PropTypes.array.isRequired,
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
  overscanRowCount: PropTypes.number,
};

ListVirtual.defaultProps = {
  itemProps: {},
  list: [],
  overscanRowCount: 10,
};

export default ListVirtual;

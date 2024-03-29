import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  InfiniteLoader,
} from "react-virtualized";
import { validators, strings } from "investira.sdk";

import Style from "./ListVirtual.module.scss";

const STATUS_LOADING = 1;
const STATUS_LOADED = 2;

class ListVirtual extends PureComponent {
  constructor() {
    super();

    this._onMount = false;

    this.renderRow = this.renderRow.bind(this);

    this.cache = new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 100,
      //keyMapper: index => this.props.list[index]
    });

    this.timeoutIdMap = {};

    this.state = {
      loadedRowCount: 0,
      loadedRowsMap: {},
      loadingRowCount: 0,
    };

    this.listRoot = React.createRef();
  }

  hasListData = (pList) => {
    return validators.isEmpty(pList);
  };

  isRowLoaded = ({ index }) => {
    const { loadedRowsMap } = this.state;
    return !!loadedRowsMap[index];
    // return ({ index }) => index < this.props.list.length;
  };

  loadMoreRows = ({ startIndex, stopIndex }) => {
    const { nextPage, onNextPage } = this.props;
    const { loadedRowsMap, loadingRowCount } = this.state;

    const xIncrement = stopIndex - startIndex + 1;

    for (let xI = startIndex; xI <= stopIndex; xI++) {
      loadedRowsMap[xI] = STATUS_LOADING;
    }

    this._onMount &&
      this.setState({
        loadingRowCount: loadingRowCount + xIncrement,
      });

    const timeoutId = setTimeout(() => {
      const { loadedRowCount, loadingRowCount } = this.state;

      delete this.timeoutIdMap[timeoutId];

      for (let xI = startIndex; xI <= stopIndex; xI++) {
        loadedRowsMap[xI] = STATUS_LOADED;
      }

      this._onMount &&
        this.setState({
          loadingRowCount: loadingRowCount - xIncrement,
          loadedRowCount: loadedRowCount + xIncrement,
        });

      promiseResolver();
    }, 1000);

    let promiseResolver;

    // Realiza request se tiver mais páginas
    const xSize = this.props.list.length;

    if (startIndex > xSize / 2 && nextPage) {
      const xParams = strings.querystringToObject(nextPage);
      onNextPage && onNextPage(xParams);
    }

    return new Promise((resolve) => {
      promiseResolver = resolve;
    });
  };

  renderRow({ index, key, style, parent }) {
    const Component = this.props.item;
    const { keyName, ...othersItemProps } = this.props.itemProps;

    const { list } = this.props;
    const { loadedRowsMap } = this.state;
    const isLoaded = loadedRowsMap[index] === STATUS_LOADED;

    return (
      <CellMeasurer
        key={key}
        cache={this.cache}
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

  removeTabIndex = (pListRootElem) => {
    if (pListRootElem?.current) {
      const xReactVirtualizedElem = pListRootElem.current.querySelector(
        '[aria-readonly="true"]'
      );

      xReactVirtualizedElem.removeAttribute("tabindex");
    }
  };

  componentDidMount() {
    this._onMount = true;
    this.removeTabIndex(this.listRoot);
  }

  componentDidUpdate(prevProps, prevState) {
    const newRows = this.props.list.filter(
      (value) => prevProps.list.indexOf(value) < 0
    );
    const newRowsIndex = newRows.map((value) => this.props.list.indexOf(value));
    newRowsIndex.forEach((index) => {
      this.cache.clear(index);
    });

    newRowsIndex.length &&
      this._list.recomputeRowHeights(Math.min(...newRowsIndex));
  }

  componentWillUnmount() {
    this._onMount = false;
  }

  render() {
    const xClassRoot = classNames(Style.root, this.props.className, {
      [Style.emptyList]: this.hasListData(this.props.list),
    });

    //const xRowCount = this.props.list.length;
    const xRowCount = this.props.totalItens || this.props.list.length;

    return (
      <div ref={this.listRoot} className={xClassRoot}>
        <InfiniteLoader
          isRowLoaded={this.isRowLoaded}
          loadMoreRows={this.loadMoreRows}
          rowCount={xRowCount}
          minimumBatchSize={this.props.minimumBatchSize}
          threshold={this.props.threshold}
        >
          {({ onRowsRendered, registerChild }) => (
            <AutoSizer>
              {({ width, height }) => (
                <List
                  ref={(element) => {
                    this._list = element;
                    registerChild(element);
                  }}
                  width={width}
                  onRowsRendered={onRowsRendered}
                  height={height}
                  deferredMeasurementCache={this.cache}
                  rowHeight={this.cache.rowHeight}
                  rowRenderer={this.renderRow}
                  rowCount={xRowCount}
                  overscanRowCount={this.props.overscanRowCount}
                />
              )}
            </AutoSizer>
          )}
        </InfiniteLoader>
      </div>
    );
  }
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
  threshold: PropTypes.number,
  minimumBatchSize: PropTypes.number,
};

ListVirtual.defaultProps = {
  itemProps: {},
  list: [],
  overscanRowCount: 40,
  threshold: 20,
  minimumBatchSize: 40,
};

export default ListVirtual;

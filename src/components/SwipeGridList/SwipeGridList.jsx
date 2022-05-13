import React, { memo, useRef, useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { validators } from "investira.sdk";
import { Grid, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";

import "swiper/swiper.scss";
import "swiper/modules/grid/grid.scss";
import "swiper/modules/pagination/pagination.scss";

import Style from "./SwipeGridList.module.scss";

const SwipeGridList = memo((props) => {
  const [warpHeight, setWarpHeight] = useState(300);
  const slideRef = useRef(null);
  const PAGINATION_HEIGHT = 28;

  // HANDLERS
  const handleClick = useCallback(
    (pData, pIndex, pEvent) => () => {
      if (props.onClick) {
        props.onClick(pData, pIndex, pEvent);
      }
    },
    [props]
  );

  useEffect(() => {
    if (slideRef.current) {
      const slideHeight = slideRef.current.children[0].clientHeight;
      const calcHeight =
        slideHeight * props.rows +
        props.spaceBetween * (props.rows - 1) +
        PAGINATION_HEIGHT;
      setWarpHeight(calcHeight);
    }
  }, [props.data, props.rows, props.spaceBetween]);

  // RENDER
  const xId = `swipe-grid-list-${props.id}`;
  const Component = props.child;

  const renderItem = useCallback(
    (pItem, pIndex) => {
      const xElemKey = `${xId}-grid-item-${pIndex}`;
      const xSlideStyle = {
        height: `calc((100% - ${props.spaceBetween}px) / ${props.rows})`,
      };
      return (
        <SwiperSlide id={xId} key={xElemKey} ref={slideRef} style={xSlideStyle}>
          <Component
            {...props.childProps}
            data={pItem}
            onClick={(e) => handleClick(pItem, pIndex, e)}
          />
        </SwiperSlide>
      );
    },
    [handleClick, props.childProps, props.rows, props.spaceBetween, xId]
  );

  return (
    <Swiper
      slidesPerView={props.columns}
      grid={{
        fill: "row",
        rows: props.rows,
      }}
      spaceBetween={props.spaceBetween}
      pagination={props.pagination}
      modules={[Grid, Pagination]}
      className={Style.gridContainer}
    >
      {!validators.isEmpty(props.data) &&
        Object.values(props.data).map((xItem, xIndex) => {
          return renderItem(xItem, xIndex);
        })}
    </Swiper>
  );
});

SwipeGridList.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  child: PropTypes.elementType.isRequired,
  childProps: PropTypes.object,
  keyValue: PropTypes.string,
  pagination: PropTypes.bool,
  slideWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  spaceBetween: PropTypes.number,
  centeredSlides: PropTypes.bool,
  centeredSlidesBounds: PropTypes.bool,
  columns: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

SwipeGridList.defaultProps = {
  id: "default",
  data: [],
  keyValue: "id",
  pagination: true,
  slideWidth: "auto",
  spaceBetween: 8,
  centeredSlides: true,
  centeredSlidesBounds: true,
  columns: 3,
  rows: 2,
};

export default SwipeGridList;

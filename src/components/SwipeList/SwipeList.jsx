import React, { memo } from "react";
import PropTypes from "prop-types";
import { validators } from "investira.sdk";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import "swiper/swiper.scss";
import "swiper/modules/navigation/navigation.scss";
import "swiper/modules/pagination/pagination.scss";
import Style from "./SwipeList.module.scss";

const SwipeList = memo((props) => {
  // HANDLERS
  const handleClick = (pData, pIndex, pEvent) => () => {
    if (props.onClick) {
      props.onClick(pData, pIndex, pEvent);
    }
  };

  // RENDER
  const xId = `swipe-list-${props.id}`;
  const Component = props.child;

  return (
    <Swiper
      pagination={props.pagination}
      modules={[Pagination]}
      centeredSlides={props.centeredSlides}
      centeredSlidesBounds={props.centeredSlidesBounds}
      slidesPerView={props.slidesPerView}
      spaceBetween={props.spaceBetween}
      className={Style.container}
    >
      {!validators.isEmpty(props.data) &&
        Object.values(props.data).map((xItem, xIndex) => {
          const xElemKey = `${xId}-item-${xIndex}`;
          return (
            <SwiperSlide key={xElemKey} style={{ width: props.slideWidth }}>
              <Component
                {...props.childProps}
                data={xItem}
                onClick={(e) => handleClick(xItem, xIndex, e)}
              />
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
});

SwipeList.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  child: PropTypes.elementType.isRequired,
  childProps: PropTypes.object,
  keyValue: PropTypes.string,
  pagination: PropTypes.bool,
  slideWidth: PropTypes.number,
  spaceBetween: PropTypes.number,
  centeredSlides: PropTypes.bool,
  centeredSlidesBounds: PropTypes.bool,
  slidesPerView: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

SwipeList.defaultProps = {
  id: "default",
  data: [],
  keyValue: "id",
  pagination: true,
  slideWidth: 343,
  spaceBetween: 8,
  centeredSlides: true,
  centeredSlidesBounds: true,
  slidesPerView: "auto",
};

export default SwipeList;

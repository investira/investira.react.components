import React, { memo } from "react";
import PropTypes from "prop-types";
import { validators } from "investira.sdk";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import "swiper/swiper.scss";
import "swiper/modules/navigation/navigation.scss";
import "swiper/modules/pagination/pagination.scss";
import { styled } from "@mui/material/styles";

const Container = styled(Swiper)(({ theme }) => ({
  display: "flex",
  // flexDirection: "column-reverse",
  flexDirection: "column",
  // "@global": {
  ".swiper-wrapper > div:first-of-type": {
    marginLeft: "16px",
  },
  ".swiper-wrapper > div:last-of-type": {
    marginRight: "16px",
  },
  ".swiper-pagination": {
    position: "relative",
    bottom: 0,
    padding: "4px 16px",
    height: "28px",

    "&-bullet-active": {
      background: theme.palette.primary.main,
    },
  },
  // },
}));

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
    <Container
      pagination={props.pagination}
      className={Style.container}
      modules={[Pagination]}
      centeredSlides={props.centeredSlides}
      centeredSlidesBounds={props.centeredSlidesBounds}
      slidesPerView={props.slidesPerView}
      spaceBetween={props.spaceBetween}
    >
      {!validators.isEmpty(props.data) &&
        Object.values(props.data).map((xItem, xIndex) => {
          const xElemKey = `${xId}-item-${xIndex}`;
          return (
            <SwiperSlide key={xElemKey} style={{ width: props.slideWidth }}>
              {({ isActive }) => (
                <Component
                  {...props.childProps}
                  data={xItem}
                  onClick={(e) => handleClick(xItem, xIndex, e)}
                  isActive={isActive}
                />
              )}
            </SwiperSlide>
          );
        })}
    </Container>
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

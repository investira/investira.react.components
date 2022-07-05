import React, { useState, useRef, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Hammer from "hammerjs";
import NavDots from "../NavDots";
import Icon from "../Icon";
import { ButtonBase, IconButton } from "../wrappers";
import Style from "./SlideView.module.scss";

function SlideView(props) {
  const [wrapWidth, setWrapWidth] = useState(0);
  const [wrapPosition, setWrapPosition] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);
  const [slideChildWidth, setSlideChildWidth] = useState(0);
  const [slideCount, setSlideCount] = useState(0);
  const [slideCurrent, setSlideCurrent] = useState(0);
  const [backButton, setBackButton] = useState(false);
  const [nextButton, setNextButton] = useState(true);
  const [swipeable, setSwipeable] = useState(props.swipeable);
  const [roadmap, setRoadmap] = useState([]);
  const [triggerNext, setTriggerNext] = useState(false);

  const slideRef = useRef();
  const slideWrapRef = useRef();
  const slideChildRef = useRef();

  const _isMounted = useRef(false);

  function dotsButtons(pChildrens) {
    const xMaxDots = 5;

    let xCurrent = [...pChildrens];

    xCurrent.slice(slideCurrent, slideCurrent + xMaxDots);

    const elements = xCurrent.map((_, i) => {
      const isActive = slideCurrent === i ? Style.isActive : "";

      return (
        <ButtonBase
          key={i}
          centerRipple={true}
          className={Style.dotButton}
          onClick={() => move(i)}
        >
          <span className={Style.dot + " " + isActive} />
        </ButtonBase>
      );
    });

    return elements;
  }

  const nextSlide = () => {
    if (slideCurrent < slideCount - 1) {
      setState(
        {
          slideCurrent: slideCurrent + 1,
        },
        () => move(slideCurrent)
      );
    }
  };

  const prevSlide = () => {
    if (slideCurrent > 0) {
      setState({ slideCurrent: slideCurrent - 1 }, () => move(slideCurrent));
    }
  };

  const mapChildrens = () => {
    let xClass = props.fullWidth ? Style.viewFull : Style.view;

    let elements = props.children.map((child, i) => {
      return (
        <div
          key={`${props.id}-${i}`}
          ref={slideChildRef}
          id={`slideview-${i}`}
          className={xClass}
          style={{
            zIndex: 100 - i,
          }}
        >
          {child}
        </div>
      );
    });

    return elements;
  };

  function setElementsSizes() {
    if (_isMounted.current) {
      let xChildCount = React.Children.count(props.children);
      let xSlideWidth = slideRef.current.offsetWidth;
      let xSlideChildWidth = slideChildRef.current.offsetWidth;
      let xWrapWidth = xSlideWidth;

      setWrapWidth(xWrapWidth);
      setSlideWidth(xSlideWidth);
      setSlideChildWidth(xSlideChildWidth), setSlideCount(xChildCount);
    }
  }

  function onPan(e) {
    e.preventDefault();
    let xDelta = e.deltaX;
    let xPercent = (100 / wrapWidth) * xDelta;

    let xAnimate = false;

    if (e.type === "panend" || e.type === "pancancel") {
      if (Math.abs(xPercent) > 21 && e.type === "panend") {
        let xSlideCurrent = slideCurrent;

        setSlideCurrent((xSlideCurrent += xPercent < 0 ? 1 : -1));

        if (swipeable && slideCount === slideCurrent && xPercent < -50) {
          props.onSlideFinish && props.onSlideFinish();
        }
      }

      xPercent = 0;
      xAnimate = true;
    }

    move(slideCurrent, xPercent, xAnimate);
  }

  const move = (pMoveIndex, pPercent, pAnimate) => {
    if (_isMounted.current) {
      setState({
        slideCurrent: pMoveIndex,
      });

      let xMoveIndex = Math.max(0, Math.min(pMoveIndex, slideCount - 1));
      let xPercent = pPercent || 0;
      let xClassName = slideWrapRef.current.className;

      if (pAnimate) {
        if (xClassName.indexOf(Style.swapped) === -1) {
          slideWrapRef.current.className += ` ${Style.swapped}`;
        }
      } else {
        if (xClassName.indexOf(Style.swapped) !== -1) {
          slideWrapRef.current.className = xClassName
            .replace(Style.swapped, "")
            .trim();
        }
      }

      let xViewIndex, xPos, xTranslate;

      for (xViewIndex = 0; xViewIndex < slideCount; xViewIndex++) {
        if (props.fullWidth) {
          xPos =
            (wrapWidth / 100) * ((xViewIndex - xMoveIndex) * 100 + xPercent);
        } else {
          xPos =
            (slideChildWidth / 100) *
            ((xViewIndex - xMoveIndex) * 100 + xPercent);
          xPos = xPos + 12;
        }

        if (Hammer.DIRECTION_HORIZONTAL) {
          xTranslate = "translate3d(" + xPos + "px, 0, 0)";
        }

        views[xViewIndex].style.transform = xTranslate;
        views[xViewIndex].style.mozTransform = xTranslate;
        views[xViewIndex].style.webkitTransform = xTranslate;
      }

      setSlideCurrent(xMoveIndex);
      setBackButton(xMoveIndex > 0 ? true : false);
      setNextButton(xMoveIndex < slideCount - 1 ? true : false);

      props.slideCallback && props.slideCallback(state);
    }
  };

  function swipeable() {
    /*
     * Resolve Bug no Chrome Mobile
     */

    if (props.fullWidth) {
      let views = slideWrapRef.current.querySelectorAll(
        `div[id^="slideview-"]`
      );

      function logArrayElements(element) {
        let xHammer = Hammer(element);
        xHammer.on("swipe", () => {
          return false;
        });
      }

      views.forEach(logArrayElements);
    }

    /* --- */
    let hammer = new Hammer(slideWrapRef.current, {
      inputClass:
        Hammer.TouchMouseInput /* Truque para permitir o pan horizontal e a rolagem */,
    });

    hammer.add(
      new Hammer.Pan({
        direction: Hammer.DIRECTION_HORIZONTAL,
        threshold: 30,
      })
    );

    hammer.on("panmove panend pancancel", Hammer.bindFn(onPan, this));
  }

  const mount = () => {
    views = Array.prototype.slice.call(slideWrapRef.current.children, 0);

    setElementsSizes();
    props.swipeable && swipeable();
  };

  useEffect(() => {
    _isMounted.current = true;
    mount();
    window.addEventListener("resize", () => {
      setElementsSizes();
      move(slideCurrent);
    });
    return () => {
      _isMounted.current = false;
      window.removeEventListener("resize", () => {
        setElementsSizes();
        move(slideCurrent);
      });
    };
  }, []);

  // useEffect(() =>{

  // }, [slideCurrent])

  // componentDidUpdate(prevProps, prevState) {
  //   if (
  //     props.slideCallback &&
  //     slideCurrent !== prevState.slideCurrent
  //   ) {
  //     props.slideCallback(state);
  //   }

  //   if (slideCount !== prevState.slideCount) {
  //     move(slideCurrent);
  //   }

  //   if (props.step !== prevProps.step) {
  //     move(props.step);
  //   }

  //   if (props.children !== prevProps.children) {
  //     views = Array.prototype.slice.call(
  //       slideWrapRef.current.children,
  //       0
  //     );
  //     let xChildCount = React.Children.count(props.children);
  //     setState({
  //       slideCount: xChildCount,
  //     });
  //   }

  //   if (props.triggerNext !== prevProps.triggerNext) {
  //     setState({
  //       triggerNext: props.triggerNext,
  //     });
  //   }

  //   if (
  //     triggerNext !== prevState.triggerNext &&
  //     triggerNext === true
  //   ) {
  //     move(slideCurrent + 1);
  //   }
  // }

  const { area, nav, className } = props;

  const xRootClass = classNames(Style.root, className, {
    [Style.container]: area === "container",
  });

  const xNavClass = classNames(Style.nav, {
    [Style.isNavDot]: nav === "dots",
    [Style.isNavArrow]: nav === "arrows",
  });

  return (
    <div className={xRootClass} ref={slideRef}>
      <div
        className={Style.wrap}
        ref={slideWrapRef}
        style={{
          transform: `translate(${wrapPosition}px)`,
        }}
      >
        {mapChildrens()}
      </div>

      {nav ? (
        <nav className={xNavClass}>
          {nav === "dots" ? (
            <NavDots
              size={props.children.length}
              index={slideCurrent}
              onClick={move}
            />
          ) : nav === "arrows" ? (
            <Fragment>
              {props.onSlideStart && !backButton ? (
                <IconButton aria-label="voltar" onClick={props.onSlideStart}>
                  <Icon color={"primary"} iconName="arrow-previous" size={24} />
                </IconButton>
              ) : (
                <IconButton
                  aria-label="voltar"
                  onClick={prevSlide}
                  disabled={!props.nextButton || !backButton}
                >
                  <Icon color={"primary"} iconName="arrow-previous" size={24} />
                </IconButton>
              )}

              {props.onSlideFinish && !nextButton ? (
                <IconButton
                  className={Style.arrowButton}
                  aria-label="finalizar"
                  onClick={props.onSlideFinish}
                >
                  <Icon color={"primary"} iconName="ok" size={24} />
                </IconButton>
              ) : (
                <IconButton
                  className={Style.arrowButton}
                  aria-label="avançar"
                  onClick={nextSlide}
                  disabled={!props.nextButton || !nextButton}
                >
                  <Icon color={"primary"} iconName="arrow-next" size={24} />
                </IconButton>
              )}
            </Fragment>
          ) : (
            false
          )}
        </nav>
      ) : (
        false
      )}
    </div>
  );
}

SlideView.propTypes = {
  id: PropTypes.string.isRequired,
  nav: PropTypes.oneOf(["arrows", "dots"]),
  swipeable: PropTypes.bool,
  backButton: PropTypes.bool,
  nextButton: PropTypes.bool,
  area: PropTypes.oneOf(["content", "container"]),
  step: PropTypes.number,
};

SlideView.defaultProps = {
  swipeable: true,
  backButton: true,
  nextButton: true,
  area: "content",
  step: 0,
};

export default SlideView;

import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import noImage from "./thumb_no_image.gif";
import noImage2x from "./thumb_no_image@2x.gif";
import noImage3x from "./thumb_no_image@3x.gif";

import Style from "./ResponsiveImage.module.scss";
import { useEffect } from "react";

const ResponsiveImage = (props) => {
  const [imagesSource, setImagesSource] = useState([]);
  const [imagesSrcSet, setImagesSrcSet] = useState([]);

  const [hasError, setHasError] = useState(false);
  const [show, setShow] = useState(false);

  // Separara o que deve ser instanciado como source e srcset
  const filterImages = (pSource) => {
    let xImagesSource = [];
    let xImagesSrcSet = [];
    for (const xItem of pSource) {
      if (xItem.media || xItem.type) {
        xImagesSource.push(xItem);
      } else {
        xImagesSrcSet.push(xItem);
      }
    }

    setImagesSource(xImagesSource);
    setImagesSrcSet(xImagesSrcSet);
  };

  const handleLoad = (e) => {
    setShow(true);
    props.onLoad && props.onLoad(e);
  };

  // Em caso de erro no carregamento da imagem
  const handleError = (_pImage) => {
    if (!hasError) {
      setHasError(true);
      props.error && props.error(true);
    }
  };

  useEffect(() => {
    if (hasError) {
      const xErrorSet = [
        { srcSet: `${noImage} 1x, ${noImage2x} 2x, ${noImage3x} 3x` },
      ];
      const xSource = props.placeholder || xErrorSet;
      filterImages(xSource);
    }
  }, [hasError, props.placeholder]);

  useEffect(() => {
    filterImages(props.source);
  }, [props.source]);

  const xClassImage = classNames(props.className, Style.img, {
    [Style.show]: show,
  });

  return (
    <div className={Style.root}>
      <picture className={Style.picture}>
        {imagesSource.map((image, index) => {
          return (
            <source
              key={index}
              srcSet={image.srcSet}
              media={image.media}
              type={image.type}
            />
          );
        })}

        {imagesSrcSet[0] ? (
          <img
            id={props.id}
            className={xClassImage || Style.img}
            srcSet={imagesSrcSet[0].srcSet}
            src={imagesSrcSet[0].srcSet}
            alt={props.alt}
            type={props.type}
            onLoad={handleLoad}
            onError={handleError}
          />
        ) : null}
      </picture>
    </div>
  );
};

ResponsiveImage.propTypes = {
  source: PropTypes.array.isRequired,
  alt: PropTypes.string.isRequired,
  type: PropTypes.string,
  onLoad: PropTypes.func,
};

export default React.memo(ResponsiveImage);

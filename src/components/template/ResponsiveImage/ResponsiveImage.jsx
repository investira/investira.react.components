import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Box } from "../../";
import noImage from "./thumb_no_image.gif";
import noImage2x from "./thumb_no_image@2x.gif";
import noImage3x from "./thumb_no_image@3x.gif";

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
      const xSet = props.placeholder || xErrorSet;
      filterImages(xSet);
    } else {
      filterImages(props.source);
    }
  }, [hasError, props.placeholder, props.source]);

  return (
    <Box
      sx={{
        position: "relative",
        width: "inherit",
        height: "inherit",
        borderRadius: "inherit",
      }}
    >
      <Box
        component="picture"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: "inherit",
        }}
      >
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
          <Box
            component="img"
            id={props.id}
            sx={[
              {
                maxWidth: "100%",
                width: "inherit",
                height: "inherit",
                borderRadius: "inherit",
                opacity: 0,
              },
              show && {
                opacity: 1,
              },
            ]}
            srcSet={imagesSrcSet[0].srcSet}
            src={imagesSrcSet[0].srcSet}
            alt={props.alt}
            type={props.type}
            onLoad={handleLoad}
            onError={handleError}
          />
        ) : null}
      </Box>
    </Box>
  );
};

ResponsiveImage.propTypes = {
  source: PropTypes.array.isRequired,
  alt: PropTypes.string.isRequired,
  type: PropTypes.string,
  onLoad: PropTypes.func,
};

export default React.memo(ResponsiveImage);

import { memo, createElement } from "react";

const style = {
  display: "inline-block",
  stroke: "currentColor",
  fill: "currentColor",
};

const IconMoon = memo(
  ({ iconSet, icon, size, disableFill, removeStyle, ...props }) => {
    if (!iconSet || !icon) {
      console.warn('A propriedade "iconSet" e "icon" são obrigatórios.');
      return null;
    }

    const currentIcon = iconSet.icons.find(
      (item) => item.properties.name === icon
    );

    if (!currentIcon) {
      console.warn(`"${icon}" icon não encontrado.`);
      return null;
    }

    if (size) {
      style.width = size;
      style.height = size;
    }

    props.style = {
      ...(removeStyle ? {} : style),
      ...(props.style || {}),
    };

    const { width = "1024" } = currentIcon.icon;

    props.viewBox = `0 0 ${width} 1024`;

    const paths = currentIcon.icon.paths.map((path, index) =>
      createElement("path", {
        d: path,
        key: icon + index,
        ...(!disableFill ? currentIcon.icon.attrs[index] : {}),
      })
    );

    return createElement("svg", props, paths);
  }
);

export default IconMoon;

export const iconList = (iconSet) => {
  if (iconSet && Array.isArray(iconSet.icons)) {
    return iconSet.icons.map((icon) => icon.properties.name);
  }

  return null;
};

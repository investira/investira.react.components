import React from "react";
import styled from "@emotion/styled";
import { default as MuiBadge } from "@mui/material/Badge";

// const StyledBadge = styled(WBadge, {
//   shouldForwardProp: (prop) =>
//     !["specialAnchor", "sizeCustom"].includes(prop.toString()),
// })(({ theme, specialAnchor, sizeCustom }) => {
//   const base = {};

//   if (specialAnchor) {
//     base["& .MuiBadge-badge"] = {
//       ...(base["& .MuiBadge-badge"] || {}),
//       right: "40%",
//     };
//   }

//   if (sizeCustom === "XL") {
//     base["& .MuiBadge-badge"] = {
//       ...(base["& .MuiBadge-badge"] || {}),
//       width: theme.spacing(5),
//       height: theme.spacing(5),
//       borderRadius: theme.spacing(4),
//     };
//     base["& .MuiBadge-badge svg"] = {
//       width: "24px",
//       height: "24px",
//     };
//   }

//   if (sizeCustom === "large") {
//     base["& .MuiBadge-badge"] = {
//       ...(base["& .MuiBadge-badge"] || {}),
//       width: theme.spacing(4),
//       height: theme.spacing(4),
//       borderRadius: theme.spacing(3),
//     };
//     base["& .MuiBadge-badge svg"] = {
//       width: "21px",
//       height: "21px",
//     };
//   }

//   if (sizeCustom === "small") {
//     base["& .MuiBadge-badge"] = {
//       ...(base["& .MuiBadge-badge"] || {}),
//       width: theme.spacing(2),
//       height: theme.spacing(2),
//       borderRadius: theme.spacing(2),
//     };
//     base["& .MuiBadge-badge svg"] = {
//       width: "10px",
//       height: "10px",
//     };
//   }

//   return base;
// });

function Badge(props) {
  const { anchorOrigin, size, ...propsProps } = props;
  const specialAnchor = anchorOrigin?.special;

  return (
    <MuiBadge
      {...propsProps}
      anchorOrigin={anchorOrigin}
      //specialAnchor={specialAnchor}
      //sizeCustom={size}
    />
  );
}

export default Badge;

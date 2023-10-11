import React, { PureComponent } from "react";
import MuiMenuItem from "@mui/material/MenuItem";

// function MenuItem(props) {
//     return <WMenuItem {...props} />;
// }

class MenuItem extends PureComponent {
  render() {
    return <MuiMenuItem {...this.props} />;
  }
}

export default MenuItem;

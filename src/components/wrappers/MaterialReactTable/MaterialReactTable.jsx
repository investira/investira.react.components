import React from "react";
import { MaterialReactTable as MuiReactTable } from "material-react-table";
import { MRT_Localization_PT_BR } from "material-react-table/locales/pt-BR";

function MaterialReactTable(props) {
  return <MuiReactTable {...props} localization={MRT_Localization_PT_BR} />;
}

export default MaterialReactTable;

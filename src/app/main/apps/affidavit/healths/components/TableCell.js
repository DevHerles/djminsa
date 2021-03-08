import React from "react";

import { Icon, TableCell, } from '@material-ui/core';

const TableCellUI = props => {
  return (
    <TableCell component="th" scope="row" align="left">
      {props.field == 'SI' ?
        (
          <Icon className="text-green text-20">check</Icon>
        ) :
        (
          <Icon className="text-red text-20">block</Icon>
        )
      }
    </TableCell>);
};

export default React.memo(TableCellUI);

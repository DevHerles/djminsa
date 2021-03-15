import React from "react";

import {Icon, TableCell, } from '@material-ui/core';

const TableCellUI = props => {
    return (
    <TableCell component="th" scope="row" align="left">
        {props.field}
    </TableCell>);
};

export default React.memo(TableCellUI);

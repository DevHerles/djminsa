import React, { useEffect, useState } from 'react';
import { Icon, Table, TableBody, TableCell, TablePagination, TableRow, Checkbox } from '@material-ui/core';
import { FuseScrollbars } from '@fuse';
import { withRouter } from 'react-router-dom';
import clsx from 'clsx';
import _ from '@lodash';
import TableHeadView from './TableHeadView';
import * as Actions from '../store/actions';
import { useDispatch, useSelector } from 'react-redux';

import TableCellUI from './TableCell';

const API_PATH = 'healths'

function TableView(props) {
  const dispatch = useDispatch();
  const records = useSelector(({ affidavitHealthApp }) => affidavitHealthApp.records.data);
  const searchText = useSelector(({ affidavitHealthApp }) => affidavitHealthApp.records.searchText);

  const [selected, setSelected] = useState([]);
  const [data, setData] = useState(records);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState({
    direction: 'asc',
    id: null
  });

  useEffect(() => {
    dispatch(Actions.getAll(API_PATH));
  }, [dispatch]);

  useEffect(() => {
    setData(searchText.length === 0 ? records : _.filter(records, item => item.name.toLowerCase().includes(searchText.toLowerCase())))
  }, [records, searchText]);

  function handleRequestSort(event, property) {
    const id = property;
    let direction = 'desc';

    if (order.id === property && order.direction === 'desc') {
      direction = 'asc';
    }

    setOrder({
      direction,
      id
    });
  }

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      setSelected(data.map(n => n.id));
      return;
    }
    setSelected([]);
  }

  function handleClick(item) {
    props.history.push('/apps/affidavit/healths/' + item._id);
  }

  function handleCheck(event, id) {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    }
    else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    }
    else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    }
    else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  }

  function handleChangePage(event, page) {
    setPage(page);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }

  return (
    <div className="w-full flex flex-col">

      <FuseScrollbars className="flex-grow overflow-x-auto">

        <Table className="min-w-xl" aria-labelledby="tableTitle">

          <TableHeadView
            numSelected={selected.length}
            order={order}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={data.length}
          />

          <TableBody>
            {_.orderBy(data, [
              (o) => {
                switch (order.id) {
                  case 'categories':
                    {
                      return o.categories[0];
                    }
                  default:
                    {
                      return o[order.id];
                    }
                }
              }
            ], [order.direction])
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(record => {
                const isSelected = selected.indexOf(record.id) !== -1;
                return (
                  <TableRow
                    className="h-64 cursor-pointer"
                    hover
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={record.id}
                    selected={isSelected}
                    onClick={event => handleClick(record)}
                  >
                    <TableCell className="w-48 px-4 sm:px-12" padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onClick={event => event.stopPropagation()}
                        onChange={event => handleCheck(event, record.id)}
                      />
                    </TableCell>
                    <TableCellUI field={record.q13} />
                    <TableCell component="th" scope="row">
                      {record.partner_id}
                    </TableCell>
                    <TableCellUI field={record.q1} />
                    <TableCellUI field={record.q2} />
                    <TableCellUI field={record.q3} />
                    <TableCellUI field={record.q4} />
                    <TableCellUI field={record.q5} />
                    <TableCellUI field={record.q6} />
                    <TableCellUI field={record.q7} />
                    <TableCellUI field={record.q8} />
                    <TableCellUI field={record.q9} />
                    <TableCellUI field={record.q10} />
                    <TableCellUI field={record.q11} />
                    <TableCellUI field={record.q12} />
                    <TableCellUI field={record.q13} />
                    <TableCell component="th" scope="row" align="right">
                      {record.q13 ?
                        (
                          <Icon className="text-green text-20">check_circle</Icon>
                        ) :
                        (
                          <Icon className="text-red text-20">remove_circle</Icon>
                        )
                      }
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </FuseScrollbars>

      <TablePagination
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'Previous Page'
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page'
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default withRouter(TableView);

import React, {
  useEffect,
  useState
} from 'react';
import { Avatar, Button, Checkbox, Icon, IconButton, Typography } from '@material-ui/core';
import { DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import {
  FuseAnimate,
  FuseUtils
} from '@fuse';
import ReactTable from "react-table";
import {
  withRouter
} from 'react-router-dom';
import _ from '@lodash';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import MUIDataTable from "mui-datatables";
import * as Actions from '../store/actions';
import * as _DialogActions from 'app/store/actions';
import MultiSelectMenu from './MultiSelectMenu';

const API_PATH = 'users';

function TableView(props) {
  const dispatch = useDispatch();
  const records = useSelector(({
    usersApp
  }) => usersApp.records.data);

  const selectedIds = useSelector(({
    usersApp
  }) => usersApp.records.selectedIds);

  const searchText = useSelector(({
    usersApp
  }) => usersApp.records.searchText);

  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    dispatch(Actions.getAll(API_PATH));
  }, [dispatch]);

  useEffect(() => {
    function getFilteredArray(entities, searchText) {
      const arr = Object.keys(entities).map((id) => entities[id]);
      if (searchText.length === 0) {
        return arr;
      }
      return FuseUtils.filterArrayByString(arr, searchText);
    }
    if (records) {
      setFilteredData(getFilteredArray(records, searchText));
    }
  }, [records, searchText]);

  if (!filteredData) {
    return null;
  }

  if (filteredData.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
        <Typography color="textSecondary" variant="h5">
          No existen registros!
        </Typography>
      </div>
    );
  }

  const translations = {
    previousText: 'Anterior',
    nextText: 'Siguiente',
    loadingText: 'CARGANDO...',
    noDataText: 'No existen registros',
    pageText: 'Página',
    ofText: 'de',
    rowsText: 'filas',
    filters: { containsText: 'Contiene', },
  };

  return (
    <FuseAnimate animation="transition.slideUpIn" delay={300}>
      <ReactTable {...translations}
        className="-striped -highlight w-full h-full sm:rounded-16 overflow-hidden"
        getTrProps={(state, rowInfo) => {
          return {
            className: "cursor-pointer",
            onClick: () => {
              if (rowInfo) {
                props.history.push('/apps/users/' + rowInfo.original._id);
                //console.log('dispatch(Actions.openEditContactDialog(rowInfo.original));');
              }
            }
          }
        }}
        data={filteredData}
        columns={[
          {
            Header: "",
            accessor: "avatar",
            Cell: row => (
              <Avatar className="ml-8 mr-8" alt={row.original.name} src={row.value} />
            ),
            className: "justify-center",
            width: 64,
            sortable: false
          },
          {
            Header: "Usuario",
            accessor: "username",
            className: "font-bold"
          },
          {
            Header: "Email",
            accessor: "email",
            className: "font-bold"
          },
          {
            className: "justify-center",
            Header: "¿Activo?",
            accessor: "active",
            Cell: (row) => (
              <div className="flex items-center">
                <Icon>check_circle</Icon>
              </div>
            )
          },
          {
            Header: "",
            width: 128,
            Cell: (row) => (
              <div className="flex items-center">
                <IconButton
                  // onClick={(ev) => {
                  //   ev.stopPropagation();
                  //   dispatch(Actions.deleteById(API_PATH, row.original._id));
                  // }}
                  onClick={(ev) => {
                    ev.stopPropagation();
                    
                    dispatch(_DialogActions.openDialog({
                      children: (
                        <React.Fragment>
                          <DialogTitle id="alert-dialog-title">Eliminar usuario</DialogTitle>
                          <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                              <p>
                                ¿Seguro que desea eliminar?.
                              </p>
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={() => {
                              dispatch(Actions.deleteById(API_PATH, row.original._id));
                              dispatch(_DialogActions.closeDialog());
                            }} color="error">
                              SÍ
                            </Button>
                            <Button onClick={() => dispatch(_DialogActions.closeDialog())} color="primary" autoFocus>
                              NO
                            </Button>
                          </DialogActions>
                        </React.Fragment>
                      )
                    }))
                  }}
                >
                  <Icon>delete</Icon>
                </IconButton>
              </div>
            )
          }
        ]}
        defaultPageSize={10}
        noDataText="No records found"
      />
    </FuseAnimate>
  );
}

export default withRouter(TableView);
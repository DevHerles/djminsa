import React, {
  useEffect,
  useState
} from 'react';
import { Avatar, Button, Icon, IconButton, Typography } from '@material-ui/core';
import { DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import {
  FuseAnimate,
  FuseUtils
} from '@fuse';
import ReactTable from "react-table";
import _ from '@lodash';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import * as Actions from '../store/actions';
import * as _DialogActions from 'app/store/actions';
//import MultiSelectMenu from './MultiSelectMenu';

const API_PATH = 'healths';

function HealthsList(props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();
  const records = useSelector(({
    affidavitHealthApp
  }) => affidavitHealthApp.records.data);
  const originalRecords = useSelector(({
    affidavitHealthApp
  }) => affidavitHealthApp.records.originalData);


  const searchText = useSelector(({
    affidavitHealthApp
  }) => affidavitHealthApp.records.searchText);

  const [filteredData, setFilteredData] = useState(null);
  const [prevFilter, setPrevFilter] = useState('');

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

  useEffect(() => {
    const {filter} = props.match.params;
    if(originalRecords.length > 0 && prevFilter !== filter) {
      setPrevFilter(filter);
      dispatch(Actions.toggleInFit(filter));
    }
  }, [records, props.match.params]);

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
                //props.history.push('/apps/affidavit/healths/' + rowInfo.original._id);
                dispatch(Actions.openEditDialog(rowInfo.original));
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
            Header: "Nombres",
            accessor: "partner_id.name",
            className: "font-bold"
          },
          {
            Header: "Apellido Paterno",
            accessor: "partner_id.first_name",
            className: "font-bold"
          },
          {
            Header: "Apellido Materno",
            accessor: "partner_id.last_name",
          },
          {
            Header: "Tipo de documento",
            accessor: "partner_id.doc_type",
            className: "font-bold"
          },
          {
            Header: "Número de documento",
            accessor: "partner_id.doc_number",
            className: "font-bold"
          },
          {
            Header: "Tipo",
            accessor: "partner_id.type",
            className: "font-bold"
          },
          {
            Header: "Condición",
            accessor: "fit",
            className: "font-bold justify-center",
            Cell: (row) => (
              <div className="flex items-center">
                {
                  row.original.fit ? <Icon>check</Icon> : <Icon>clear</Icon>
                }
              </div>
            )
          },
          {
            className: "justify-center",
            Header: "¿Activo?",
            accessor: "active",
            Cell: () => (
              <div className="flex items-center">
                <Icon>how_to_reg</Icon>
              </div>
            )
          },
          {
            Header: "",
            width: 128,
            Cell: (row) => (
              <div className="flex items-center">
                <IconButton
                  onClick={(ev) => {
                    ev.stopPropagation();
                    dispatch(_DialogActions.openDialog({
                      children: (
                        <React.Fragment>
                          <DialogTitle id="alert-dialog-title">Eliminar declaración jurada de salud</DialogTitle>
                          <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                              <p>
                                ¿Seguro que desea eliminar la declaración jurada de salud de:
                              </p>
                              <p>
                                {row.original.partner_id.name} {row.original.partner_id.first_name} {row.original.partner_id.last_name}?
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
        defaultPageSize={ isMobile ? 5 : 10}
        noDataText="No records found"
      />
    </FuseAnimate>
  );
}

export default HealthsList;
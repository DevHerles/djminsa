import React, {
  useEffect,
  useState
} from 'react';
import { Avatar, Checkbox, Icon, IconButton, Typography } from '@material-ui/core';
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
    filters: {containsText: 'Contiene',},
  };

  const columns = ["Name", "Title", "Location"];

  const options = {
    filter: true,
    filterType: "dropdown",
    responsive: 'vertical',
    tableBodyHeight: '450px',
  };

  const data = [
    ["Gabby George", "Business Analyst", "Minneapolis"],
    [
      "Aiden Lloyd",
      "Business Consultant for an International Company and CEO of Tony's Burger Palace",
      "Dallas"
    ],
    ["Jaden Collins", "Attorney", "Santa Ana"],
    ["Franky Rees", "Business Analyst", "St. Petersburg"],
    ["Aaren Rose", null, "Toledo"],
    ["Johnny Jones", "Business Analyst", "St. Petersburg"],
    ["Jimmy Johns", "Business Analyst", "Baltimore"],
    ["Jack Jackson", "Business Analyst", "El Paso"],
    ["Joe Jones", "Computer Programmer", "El Paso"],
    ["Jacky Jackson", "Business Consultant", "Baltimore"],
    ["Jo Jo", "Software Developer", "Washington DC"],
    ["Donna Marie", "Business Manager", "Annapolis"]
  ];

  return (
    <FuseAnimate animation="transition.slideUpIn" delay={300}>
      {/* <MUIDataTable
        title={"ACME Employee list"}
        data={data}
        columns={columns}
        options={options}
      /> */}
      <ReactTable {...translations}
        className="-striped -highlight w-full h-full sm:rounded-16 overflow-hidden"
        getTrProps={(state, rowInfo) => {
          return {
            className: "cursor-pointer",
            onClick: () => {
              if (rowInfo) {
                console.log('dispatch(Actions.openEditContactDialog(rowInfo.original));');
              }
            }
          }
        }}
        data={filteredData}
        columns={[
          {
            Header: () => (
              <Checkbox
                onClick={(event) => {
                  event.stopPropagation();
                }}
                onChange={() => {
                  console.log('event.target.checked ? dispatch(Actions.selectAllContacts()) : dispatch(Actions.deSelectAllContacts());');
                }}
                checked={selectedIds.length === Object.keys(records).length && selectedIds.length > 0}
                indeterminate={selectedIds.length !== Object.keys(records).length && selectedIds.length > 0}
              />
            ),
            accessor: "",
            Cell: row => {
              return (<Checkbox
                onClick={(event) => {
                  event.stopPropagation();
                }}
                checked={selectedIds.includes(row.value._id)}
                onChange={() => dispatch(Actions.toggleInSelected(row.value._id))}
              />
              )
            },
            className: "justify-center",
            sortable: false,
            width: 64
          },
          {
            Header: () => (
              selectedIds.length > 0 && (
                <MultiSelectMenu />
              )
            ),
            accessor: "avatar",
            Cell: row => (
              <Avatar className="mr-8" alt={row.original.name} src={row.value} />
            ),
            className: "justify-center",
            width: 64,
            sortable: false
          },
          {
            Header: "User name",
            accessor: "username",
            filterable: true,
            className: "font-bold"
          },
          {
            Header: "Email",
            accessor: "email",
            filterable: true,
            className: "font-bold"
          },
          {
            Header: "Email",
            accessor: "email",
            filterable: true
          },
          {
            Header: "",
            width: 128,
            Cell: (row) => (
              <div className="flex items-center">
                <IconButton
                  onClick={(ev) => {
                    ev.stopPropagation();
                    dispatch(Actions.deleteById(API_PATH, row.original._id));
                  }}
                >
                  <Icon>delete</Icon>
                </IconButton>
              </div>
            )
          }
        ]}
        defaultPageSize={5}
        noDataText="No records found"
      />
    </FuseAnimate>
  );
}

export default withRouter(TableView);
import React from 'react';
import {FusePageCarded} from '@fuse';
import withReducer from 'app/store/withReducer';
import UsersTableView from './components/TableView';
import UsersHeaderView from './components/HeaderView';
import SidebarHeader from './components/SidebarHeader';
import SidebarContent from './components/SidebarContent';
import reducer from './store/reducers';

function Users() {
  return (
    <FusePageCarded 
      classes={{
        content: "flex",
        header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
      }}
      header={
        <UsersHeaderView/>
      }
      content={
        <UsersTableView/>
      }
      innerScroll
    />
  );
}

export default withReducer('usersApp', reducer)(Users);

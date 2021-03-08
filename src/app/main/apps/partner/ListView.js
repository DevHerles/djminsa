import React from 'react';
import {FusePageCarded} from '@fuse';
import withReducer from 'app/store/withReducer';
import PartnersTableView from './components/TableView';
import PartnersHeaderView from './components/HeaderView';
import SidebarHeader from './components/SidebarHeader';
import SidebarContent from './components/SidebarContent';
import reducer from './store/reducers';

function Partners() {
  return (
    <FusePageCarded
      classes={{
        content: "flex",
        header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
      }}
      header={
        <PartnersHeaderView/>
      }
      content={
        <PartnersTableView/>
      }
      leftSidebarHeader={
        <SidebarHeader/>
      }
      leftSidebarContent={
        <SidebarContent/>
      }
      innerScroll
    />
  );
}

export default withReducer('partnerApp', reducer)(Partners);

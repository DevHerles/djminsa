import React from 'react';
import {Tab, Tabs} from '@material-ui/core';

function FormContentToolBar (props) {
  const {tabs, selectedTab, handleTabChange} = props;

  return (
    <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        indicatorColor="secondary"
        textColor="secondary"
        variant="scrollable"
        scrollButtons="off"
        classes={{
            root: "h-64 w-full border-b-1"
        }}
    >
        {
            tabs.map((tab, index) => {
                return(<Tab
                    key={index}
                    classes={{
                        root: "h-64"
                    }}
                    label={tab.label}
                />
  )})
        }
    </Tabs>
    );
}

export default FormContentToolBar;
import React from 'react';
import {FusePageCarded} from '@fuse';
import withReducer from 'app/store/withReducer';
import HealthsTableView from './components/TableView';
import HealthsHeaderView from './components/HeaderView';
import reducer from './store/reducers';

function Healths()
{
    return (
        <FusePageCarded
            classes={{
                content: "flex",
                header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
            }}
            header={
                <HealthsHeaderView/>
            }
            content={
                <HealthsTableView/>
            }
            innerScroll
        />
    );
}

export default withReducer('affidavitHealthApp', reducer)(Healths);

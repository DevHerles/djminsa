import React from 'react';
import {FusePageCarded} from '@fuse';
import withReducer from 'app/store/withReducer';
import HealthsTableView from './components/TableView';
import HealthsHeaderView from './components/HeaderView';
import HealthsList from './components/HealthsList';

import reducer from './store/reducers';

function Healths()
{
    return (
      <React.Fragment>
      <FusePageSimple
            classes={{
                content: "flex",
                header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
            }}
            header={
                <HealthsHeaderView/>
            }
            content={
                <HealthsList/>
            }
            innerScroll
        />
        <FuseAnimate animation="transition.expandIn" delay={300}>
                <Fab
                    color="primary"
                    aria-label="add"
                    className={classes.addButton}
                    onClick={ev => dispatch(Actions.openNewContactDialog())}
                >
                    <Icon>person_add</Icon>
                </Fab>
            </FuseAnimate>
            <ContactDialog/>
        </React.Fragment>
    );
}

export default withReducer('affidavitHealthApp', reducer)(Healths);

import React, {} from 'react';
import {FusePageSimple} from '@fuse';
import _ from '@lodash';
import withReducer from 'app/store/withReducer';
import reducer from './store/reducers';

import FormContent from './components/FormContent';

function Partner(props)
{
  return (
    <FusePageSimple
      content={
        <FormContent props={props}/>
      }
    />
  );
}

export default withReducer('partnerApp', reducer)(Partner);
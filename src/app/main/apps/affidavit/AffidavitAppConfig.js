import React from 'react';
import {
  Redirect
} from 'react-router-dom';

import HealthForm from './healths/FormView';
import HealthsApp from './healths/HealthsApp';

export const AffidavitAppConfig = {
  settings: {
    layout: {}
  },
  routes: [
    // {
    //   path: '/apps/affidavit/healths/:id',
    //   component: React.lazy(() => import('./healths/FormView'))
    // },
    {
      path: '/apps/affidavit/healths/:filter',
      component: React.lazy(() => import('./healths/HealthsApp'))
    },
    // {
    //   path: '/apps/affidavit/healths/:id',
    //   component: ((props) => <HealthsApp {...props}/>),
    // },
    {
      path: '/apps/affidavit',
      component: () => < Redirect to = "/apps/affidavit/healths/all" / >
    }
  ]
};
import React from 'react';
import {
  Redirect
} from 'react-router-dom';

export const AffidavitAppConfig = {
  settings: {
    layout: {}
  },
  routes: [{
      path: '/apps/affidavit/healths/:id',
      component: React.lazy(() => import('./healths/FormView'))
    },
    {
      path: '/apps/affidavit/healths',
      component: React.lazy(() => import('./healths/ListView'))
    },
    {
      path: '/apps/affidavit',
      component: () => < Redirect to = "/apps/affidavit/healths" / >
    }
  ]
};
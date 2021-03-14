import React from 'react';
import {
  Redirect
} from 'react-router-dom';

export const AffidavitAppConfig = {
  settings: {
    layout: {}
  },
  routes: [
    {
      path: '/apps/affidavit/healths/:filter',
      component: React.lazy(() => import('./healths/HealthsApp'))
    },
    {
      path: '/apps/affidavit/healths',
      component: () => < Redirect to = "/apps/affidavit/healths/all" / >
    },
    {
      path: '/apps/affidavit/symptoms/:filter',
      component: React.lazy(() => import('./symptoms/SymptomsApp'))
    },
    {
      path: '/apps/affidavit/symptoms',
      component: () => < Redirect to = "/apps/affidavit/symptoms/all" / >
    }
  ]
};
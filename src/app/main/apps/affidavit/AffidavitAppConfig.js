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
      path: '/apps/affidavit',
      component: () => < Redirect to = "/apps/affidavit/healths/all" / >
    }
  ]
};
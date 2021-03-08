import React from 'react';

export const PartnerAppConfig = {
  settings: {
    layout: {}
  },
  routes: [
    {
      path: '/apps/partners/:id',
      component: React.lazy(() => import('./FormView')),
    },
    {
      path: '/apps/partners',
      component: React.lazy(() => import('./ListView')),
    }
  ]
};
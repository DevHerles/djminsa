import React from 'react';

export const UserAppConfig = {
  settings: {
    layout: {}
  },
  routes: [
    {
      path: '/apps/users/:id',
      component: React.lazy(() => import('./FormView')),
    },
    {
      path: '/apps/users',
      component: React.lazy(() => import('./ListView')),
    }
  ]
};
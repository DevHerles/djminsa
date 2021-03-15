import React from 'react';

export const ProfileAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/apps/profiles',
            component: React.lazy(() => import('./ProfilePage'))
        },
        {
            path     : '/apps/profiles/:id',
            component: React.lazy(() => import('./ProfilePage'))
        }
    ]
};

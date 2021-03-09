import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseUtils} from '@fuse';
import {ExampleConfig} from 'app/main/example/ExampleConfig';
import {appsConfig} from 'app/main/apps/appsConfig';
import {pagesConfig} from 'app/main/pages/pagesConfig';
import {LoginConfig} from 'app/main/login/LoginConfig';
// import {RegisterConfig} from 'app/main/register/RegisterConfig';
import {LogoutConfig} from 'app/main/logout/LogoutConfig';

const routeConfigs = [
    ...appsConfig,
    ...pagesConfig,
    ExampleConfig,
    LoginConfig,
    // RegisterConfig,
    LogoutConfig,
];

const routes = [
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
    {
        path: '/',
        exact: true,
        component: () => <Redirect to="/apps/profiles"/>
    },
    {
        component: () => <Redirect to="/pages/errors/error-404"/>
    }
];

export default routes;

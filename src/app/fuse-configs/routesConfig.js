import React from 'react';
import {
  Redirect
} from 'react-router-dom';
import {
  FuseUtils
} from '@fuse';
import {
  appsConfig
} from 'app/main/apps/appsConfig';
import {
  pagesConfig
} from 'app/main/pages/pagesConfig';
import {
  LoginConfig
} from 'app/main/login/LoginConfig';
import {
  LogoutConfig
} from 'app/main/logout/LogoutConfig';
import {
  authRoles
} from 'app/auth';
import _ from 'lodash';

function setAdminAuth(configs) {
  return configs.map(config => _.merge({}, config, {
    auth: authRoles.admin
  }))
}

const routeConfigs = [
  ...setAdminAuth([
    ...appsConfig,
    ...pagesConfig,
    LogoutConfig,
  ]),
  LoginConfig,
];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
  {
    path: '/',
    exact: true,
    component: () => < Redirect to = "/apps/profiles" / >
  },
  {
    component: () => < Redirect to = "/pages/errors/error-404" / >
  }
];

export default routes;
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import FormView from "./form";
import ListView from "./list";

const Health = ({ match }) => (
  <div className="dashboard-wrapper">
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/start`} />
      <Route path={`${match.url}/start`} component={ListView} />
      <Route path={`${ match.url}/new`} component={FormView} />
      <Redirect to="/error" />
    </Switch>
  </div>
);
export default Health;

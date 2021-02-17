import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import HealtForm from "./start";

const Health = ({match}) => (
    <div className="dashboard-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/start`}/>
            <Route path={`${match.url}/start`} component={HealtForm}/>
            <Redirect to="/error"/>
        </Switch>
    </div>
);
export default Health;
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import HealtForm from "./start";
import NewHealtForm from "./startNewForm";

const Health = ({match}) => (
    <div className="dashboard-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/start`}/>
            <Route path={`${match.url}/start`} component={HealtForm}/>
            <Route path={`${match.url}/new`} component={NewHealtForm}/>
            <Redirect to="/error"/>
        </Switch>
    </div>
);
export default Health;
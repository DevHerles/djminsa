import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import start from "./start";
import container from "./container";
//import Redux from "./basic";
import Redux from "./try";

const Health = ({match}) => (
    <div className="dashboard-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/start`}/>
            <Route path={`${match.url}/start`} defQ1="si" component={Redux}/>
            <Redirect to="/error"/>
        </Switch>
    </div>
);
export default Health;
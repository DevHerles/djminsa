import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import SymptomsForm from "./start";

const Symptoms = ({match}) => (
    <div className="dashboard-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/start`}/>
            <Route path={`${match.url}/start`} component={SymptomsForm}/>
            <Redirect to="/error"/>
        </Switch>
    </div>
);
export default Symptoms;
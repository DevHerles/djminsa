import React, { Component } from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import AppLayout from "../../layout/AppLayout";
import blankPage from "./blank-page";
import gogo from "./gogo";
import health from "./health";
import profile from "./profile";
import secondMenu from "./second-menu";
import symptoms from "./symptoms";
import partner from "./partner";
class App extends Component {
  render() {
    const { match } = this.props;

    return (
      <AppLayout>
        <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}/gogo`} />
          <Route path={`${match.url}/gogo`} component={gogo} />
          <Route path={`${match.url}/health`} component={health} />
          <Route path={`${match.url}/profile`} component={profile} />
          <Route path={`${match.url}/second-menu`} component={secondMenu} />
          <Route path={`${match.url}/symptoms`} component={symptoms} />
          <Route path={`${match.url}/partner`} component={partner} />
          <Route path={`${match.url}/blank-page`} component={blankPage} />
          <Redirect to="/error" />
        </Switch>
      </AppLayout>
    );
  }
}
const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(
  connect(
    mapStateToProps,
    { }
  )(App)
);

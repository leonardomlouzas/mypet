import { Redirect, Switch, Route as RouteNotFound } from "react-router-dom";

import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { Dashboard } from "../pages/Dashboard";
import { Pet } from "../pages/Pet";
import { Route } from "./Route";

export const Routes = () => (
  <Switch>
    <Route exact path="/" component={ Login } />
    <Route path="/register" component={ Register } />
    <Route path="/dashboard" component={ Dashboard } isPrivate />
    <Route path="/pet/:id" component={ Pet } isPrivate />
    <RouteNotFound render={ () => <Redirect to="/dashboard" />} />
  </Switch>
);

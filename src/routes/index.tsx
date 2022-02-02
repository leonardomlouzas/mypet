import { Switch } from "react-router-dom";

import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { Dashboard } from "../pages/Dashboard";
import { Route } from "./Route";
import { Description } from "../pages/Description";

export const Routes = () => (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route path="/register" component={Register} />
    <Route path="/dashboard" component={Dashboard} isPrivate />
    <Route path="/Description/:type" component={ Description } isPrivate />
  </Switch>
);

import { Switch } from "react-router-dom";

import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { Route } from "./Route";

export const Routes = () => (
  <Switch>
    <Route exact path="/" component={ Login } />
    <Route path="/register" component={ Register } />
  </Switch>
);

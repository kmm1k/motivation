import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./home/Home";
import NotFound from "./not-found/NotFound";
import Login from "./login/Login";
import AppliedRoute from "./main/components/AppliedRoute";
import Signup from "./signup/Signup";
import Main from "./main/containers/Main";

export default ({ childProps }) =>
    <Switch>
        <AppliedRoute path="/home" exact component={Home} props={childProps} />
        <AppliedRoute path="/" exact component={Main} props={childProps} />
        <AppliedRoute path="/login" exact component={Login} props={childProps} />
        <AppliedRoute path="/signup" exact component={Signup} props={childProps} />
        { /* Finally, catch all unmatched routes */ }
        <Route component={NotFound} />
    </Switch>;
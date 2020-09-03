import React from "react";
import { Switch, Route } from "react-router-dom";

//components
import Main from "./components/Main";
import Thanks from "./components/Thanks";


const Routes = () => (
    <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/thanks/:name" component={Thanks} />
    </Switch>
);

export default Routes;

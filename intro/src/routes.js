import React from "react";
import { Switch, Route } from "react-router-dom";

//components
import Main from "./components/Main";
import Thanks from "./components/Thanks";
import MainPage from "./components/MainPage";
import ProblemPage from "./components/ProblemPage";


const Routes = () => (
    <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/thanks/:name" component={Thanks} />
        <Route exact path="/compete" component={MainPage} />
        <Route exact path="/compete/:name" component={ProblemPage} />
    </Switch>
);

export default Routes;

import React from "react";
import { Switch, Route } from "react-router-dom";
import "./routes.css";
//components
import Main from "../components/Main";
import Thanks from "../components/Thanks";
import Login from "../components/Login/Login";
import Signup from "../components/Signup/Signup";
import MainPage from "../components/MainPage";
import ProblemPage from "../components/ProblemPage";

const Routes = () => (
  <>
    <Switch>
      <Route exact path="/" component={Main} />
      <Route exact path="/thanks/:name" component={Thanks} />
      <Route exact path="/compete" component={MainPage} />
      <Route exact path="/compete/:name" component={ProblemPage} />
      <div className="auth-wrapper mt-5">
        <div>
          <img
            className="coder-img "
            src={
              "https://ik.imagekit.io/xvvhd5ujib/working_with_computer_ZUd3PWcAb.svg"
            }
          />
        </div>
        <div className="auth-inner">
          <Route exact path="/user/login" component={Login} />
          <Route exact path="/user/signup" component={Signup} />
        </div>
      </div>
    </Switch>
  </>
);

export default Routes;

import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import "./routes.css";
//components
import Main from "../components/Main";
import Thanks from "../components/Thanks";
import Login from "../components/Login/Login";
import Signup from "../components/Signup/Signup";
import MainPage from "../components/MainPage";
import ProblemPage from "../components/ProblemPage";
import Form from "../components/AddQuestion/Form";
import Codingpage from "../components/Codingpage//Codingpage";
import Instructions from "../components/Codingpage/Instructions/Instructions";
import Solution from "../components/Codingpage/Solution/Solution";
const Routes = () => (
  <>
    <Switch>
      <Route exact path="/" component={Main} />
      <Route exact path="/thanks/:name" component={Thanks} />
      <Route exact path="/compete" component={MainPage} />
      <Route exact path="/compete/:name" component={ProblemPage} />
      <Route exact path="/add" component={Form} />

      <Route exact path="/codingpage/:id" component={Codingpage} />

      {/* <Route exact path="/codingpage/instruction" component={Instructions} />
      <Route exact path="/codingpage/solution" component={Solution} /> */}
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

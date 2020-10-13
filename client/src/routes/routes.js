import React, { Component } from "react";
import {
  Switch,
  Route
} from "react-router-dom";

import "./routes.css";
//components
import Main from "../components/Main";
import Thanks from "../components/Thanks";

import QuestionPage from "../components/QuestionPage/QuestionPage";
import Form from "../components/AddQuestion/Form";
import Codingpage from "../components/Codingpage//Codingpage";
import Profile from "../components/UserProfile/profile";
import Errorpage from '../components/Errorpage/Errorpage'
export default class Routes extends Component {
  render() {
    return (
      <>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/thanks/:name" component={Thanks} />
          <Route exact path="/compete" component={QuestionPage} />
          <Route exact path="/add" component={Form} />
          <Route exact path="/codingpage/:id" component={Codingpage} />
          <Route exact path="/profile/:id" component={Profile} />
          <Route path="*" component={Errorpage} />
        </Switch>
      </>
    );
  }
}

import React, { Component } from "react";
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";

import "./routes.css";
//components
import Main from "../components/Main";
import Thanks from "../components/Thanks";

import QuestionPage from "../components/QuestionPage/QuestionPage";
import ProblemPage from "../components/ProblemPage";
import Form from "../components/AddQuestion/Form";
import Codingpage from "../components/Codingpage//Codingpage";
import Profile from "../components/UserProfile/profile";

export default class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      error: null,
      authenticated: false,
      fetch: false,
    };
  }
  checkAuth = () => {
    fetch("http://localhost:5000/auth/login/success", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error("failed to authenticate user");
      })
      .then((responseJson) => {
        this.setState({
          authenticated: true,
          user: responseJson.user,
          fetch: true,
        });
        console.log(this.state);
      })
      .catch((error) => {
        this.setState({
          authenticated: false,
          error: "Failed to authenticate user",
          fetch: true,
        });
        console.log(this.state);
      });
  };
  componentWillMount() {
    this.checkAuth();
  }
  componentDidMount() {
    this.checkAuth();
  }
  render() {
    const { authenticated } = this.state;
    const { user } = this.state;
    console.log(this.state, "ROutes FOlder");
    if (fetch) {
      return (
        <>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/thanks/:name" component={Thanks} />
            <Route exact path="/compete" component={QuestionPage} />
            <Route exact path="/compete/:name" component={ProblemPage} />
            <Route exact path="/add" component={Form} />

            <Route exact path="/codingpage/:id" component={Codingpage} />

            {authenticated ? (
              <>
                <Route exact path="/profile" component={Profile} user={user} />
              </>
            ) : (
              <Redirect to="/" />
            )}
          </Switch>
        </>
      );
    } else {
      return "";
    }
  }
}

import React, { Component, useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Routes from "./routes/routes";
import "./App.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      error: null,
      authenticated: false,
    };
  }
  componentDidMount() {
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
        });
        console.log(this.state);
      })
      .catch((error) => {
        this.setState({
          authenticated: false,
          error: "Failed to authenticate user",
        });
        console.log(this.state);
      });
  }
  _handleNotAuthenticated = () => {
    this.setState({ authenticated: false });
  };
  render() {
    console.log(this.state);
    const { authenticated } = this.state;
    const { user } = this.state;
    return (
      <>
        <div className="App">
          <Navbar
            authenticated={authenticated}
            user={user}
            handleNotAuthenticated={this._handleNotAuthenticated}
          />
          <div className="container">
            <Routes
              authenticated={authenticated}
              handleNotAuthenticated={this._handleNotAuthenticated}
            />
          </div>
        </div>
      </>
    );
  }
}

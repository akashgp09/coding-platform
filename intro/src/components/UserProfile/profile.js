import React, { Component } from "react";
import { Redirect } from "react-router";

import "./profile.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: false,
    };
  }

  componentDidMount() {
    this.renderMyData();
  }
  componentWillMount() {
    this.renderMyData();
  }

  renderMyData = async () => {
    const { match } = this.props;
    console.log(match.params.id);
    try {
      const response = await fetch(
        `http://localhost:5000/profile/:?id=${match.params.id}`
      );

      let jsonResponse = await response.json();
      console.log(jsonResponse);
      this.setState({ user: jsonResponse });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    if (this.state.user) {
      return (
        <>
          <div class="center-div">
            <img class="photo" src={this.state.user[0].photo} alt="" />
            <div className="profile-text">
              <br />
              <i className="fas fa-user-circle fa-fw fa-md"></i>User:
              {this.state.user[0].username}
            </div>
            <div className="profile-text">
              <i className="fas fa-envelope fa-fw fa-md"></i>Email:{" "}
              {this.state.user[0].email}
            </div>
          </div>
        </>
      );
    } else {
      return "";
    }
  }
}

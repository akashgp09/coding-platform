import React, { Component } from "react";

import "./profile.css";

export default class App extends Component {
  render() {
    console.log(this.props);
    const { user } = this.props.location.query;

    return (
      <>
        <div class="center-div">
          <img class="photo" src={user.photo} alt="" />
          <div className="profile-text">
            <br />
            <i className="fas fa-user-circle fa-fw fa-md"></i>User:
            {user.username}
          </div>
          <div className="profile-text">
            <i className="fas fa-envelope fa-fw fa-md"></i>Email: {user.email}
          </div>
        </div>
      </>
    );
  }
}

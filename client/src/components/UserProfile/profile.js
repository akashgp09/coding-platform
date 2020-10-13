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

 
   componentWillMount=async()=> {
     await this.renderMyData();
   }
 

  renderMyData = async () => {
    const { match } = this.props;
    try {
      const response = await fetch(process.env.NODE_ENV === 'production'?`${process.env.REACT_APP_WEBSITE_URL}/profile/:?id=${match.params.id}` :
        `http://localhost:5000/profile/:?id=${match.params.id}`
      );

      let jsonResponse = await response.json();
   
    await this.setState({ user: jsonResponse });
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
      const { match } = this.props;
      return <>
      {match.params.id.length===24?( <></>):(<Redirect to="/404"/>)}   
      </>;
    }
  }
}

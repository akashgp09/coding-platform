import React, { Component } from "react";
import Instructions from "./Instructions/Instructions";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./Codingpage.css";
import Solution from "./Solution/Solution";

export default class Codingpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }
  handleClick = () => {
    this.setState({ count: 1 });
  };
  render() {
    let instruction = this.props.location.query.instruction;
    let solution = this.props.location.query.solution;
    let count = 0;

    return (
      <>
        <Router>
          {console.log(instruction)}
          <div className="container-fluid">
            <nav className="navbar navbar-light bg-light ">
              <a className="navbar-brand mx-5" href="">
                <Link
                  to={{
                    pathname: "/codingpage/instruction",
                    query: {
                      instruction: instruction,
                      solution: solution,
                    },
                  }}
                  onClick={this.handleClick}
                >
                  {/* <a className="navbar-brand mx-5" href="#"> */}
                  Instructions
                  {/* </a> */}
                </Link>
              </a>
              <a className="navbar-brand mx-5" href="#">
                Code
              </a>
              <a className="navbar-brand mx-5" href="">
                <Link
                  to={{
                    pathname: "/codingpage/solution",
                    query: {
                      instruction: instruction,
                      solution: solution,
                    },
                  }}
                  onClick={this.handleClick}
                >
                  {/* <a className="navbar-brand mx-5" href="#"> */}
                  Solutions
                  {/* </a> */}
                </Link>
              </a>
            </nav>
          </div>
          {console.log(count)}

          {this.state.count == 0 ? (
            <Instructions instruction={instruction} />
          ) : (
            ""
          )}

          <Switch>
            {/* <Route exact path="/codingpage" component={Codingpage} /> */}
            <Route
              exact
              path="/codingpage/instruction"
              component={Instructions}
            />
            <Route exact path="/codingpage/solution" component={Solution} />
          </Switch>
        </Router>
      </>
    );
  }
}

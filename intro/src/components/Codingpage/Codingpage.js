import React, { Component } from "react";
import Instructions from "./Instructions/Instructions";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./Codingpage.css";
import Solution from "./Solution/Solution";
import Compiler from "./Compiler/Compiler";
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
          <div className="container">
            <nav className="navbar-light bg-light" id="sec-navbar">
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
                <Link
                  to={{
                    pathname: "/codingpage/code",
                    // query: {
                    //   instruction: instruction,
                    //   solution: solution,
                    //   code:code,
                    // },
                  }}
                  onClick={this.handleClick}
                >
                  Code
                </Link>
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
            <Route exact path="/codingpage/code" component={Compiler} />
          </Switch>
        </Router>
      </>
    );
  }
}

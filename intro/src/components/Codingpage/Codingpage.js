import React, { Component } from "react";
import Instructions from "./Instructions/Instructions";
import "./Codingpage.css";
import Solution from "./Solution/Solution";
import Compiler from "./Compiler/Compiler";

export default class Codingpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      question: undefined,
      component: "instructions",
    };
  }
  handleClick = () => {
    this.setState({ count: 1 });
  };

  componentDidMount() {
    this.renderMyData();
  }
  handleInstructions = (e) => {
    e.preventDefault();
    this.setState({ component: "instructions" });
  };
  handleCode = (e) => {
    e.preventDefault();
    this.setState({ component: "code" });
  };
  handleSolutions = (e) => {
    e.preventDefault();
    this.setState({ component: "solutions" });
  };
  renderMyData = async () => {
    const { match } = this.props;
    console.log(match.params.id);
    try {
      const response = await fetch(
        `http://localhost:5000/question/id/:?id=${match.params.id}`
      );

      let jsonResponse = await response.json();
      console.log(jsonResponse);
      this.setState({ question: jsonResponse });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    let count = 0;
    if (this.state.question) {
      let instruction = this.state.question[0].instruction;

      let solution = this.state.question[0].solution;

      let testCases = this.state.question[0].testCases;
      let id = this.state.question[0]._id;
      return (
        <>
          <div className="container">
            <nav className="navbar-light bg-light" id="sec-navbar">
              <a href="" onClick={this.handleInstructions}>
                Instructions
              </a>
              <a href="" onClick={this.handleCode}>
                Code
              </a>
              <a href="" onClick={this.handleSolutions}>
                Solutions
              </a>
            </nav>
          </div>
          {this.state.component == "instructions" ? (
            <Instructions instruction={instruction} />
          ) : this.state.component == "solutions" ? (
            <Solution solution={solution} />
          ) : (
            <Compiler testCases={testCases} />
          )}
        </>
      );
    } else {
      return <></>;
    }
  }
}

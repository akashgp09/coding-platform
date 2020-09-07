import React, { Component } from "react";
const ReactMarkdown = require("react-markdown");
export default class Solution extends Component {
  render() {
    {
      console.log(this.props);
    }
    if (this.props.solution) {
      let solution = this.props.solution;
      return (
        <>
          <ReactMarkdown source={solution} />
        </>
      );
    } else {
      {
        console.log(this.props);
      }
      let solution = this.props.location.query.solution;
      return (
        <>
          <ReactMarkdown source={solution} />
        </>
      );
    }
  }
}

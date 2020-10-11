import React, { Component } from "react";
const ReactMarkdown = require("react-markdown");
export default class Solution extends Component {
  render() {
    return (
      <>
        <ReactMarkdown source={this.props.solution} />
      </>
    );
  }
}

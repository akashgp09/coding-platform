import React, { Component } from "react";
const ReactMarkdown = require("react-markdown");
export default class Instructions extends Component {
  render() {
    return (
      <>
        <ReactMarkdown source={this.props.instruction} />
      </>
    );
  }
}

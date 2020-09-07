import React, { Component } from "react";
const ReactMarkdown = require("react-markdown");
export default class Instructions extends Component {
  render() {
    if (this.props.instruction) {
      let instruction = this.props.instruction;
      return (
        <>
          {console.log(this.props, "Instruction")}
          <ReactMarkdown source={instruction} />
        </>
      );
    } else {
      {
        console.log(this.props);
      }
      let instruction = this.props.location.query.instruction;
      return (
        <>
          {console.log(this.props, "Instruction")}
          <ReactMarkdown source={instruction} />
        </>
      );
    }
  }
}

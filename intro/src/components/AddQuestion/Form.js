import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tag: `array`,
      title: ``,
      description: ``,
      instruction: ``,
      language: `cpp`,
      medium: `easy`,
      solution: ``,
    };
  }
  tag = (event) => {
    this.setState({ tag: event.target.value });
  };
  solution = (event) => {
    this.setState({ solution: event.target.value });
  };
  medium = (event) => {
    this.setState({ medium: event.target.value });
  };
  language = (event) => {
    this.setState({ language: event.target.value });
  };
  description = (event) => {
    this.setState({ description: event.target.value });
  };
  instruction = (event) => {
    this.setState({ instruction: event.target.value });
  };

  title = (event) => {
    this.setState({ title: event.target.value });
  };

  submit = async (e) => {
    e.preventDefault();
    console.log(this.state);
    try {
      const response = await fetch("http://localhost:5000/question/add", {
        method: "POST",
        headers: {
          Accept: "application/json",

          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language: this.state.language,
          tag: this.state.tag,
          description: this.state.description,
          solution: this.state.solution,
          title: this.state.title,
          medium: this.state.medium,
          instruction: this.state.instruction,
        }),
      });
      console.log(await response.json());
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    {
      console.log(this.state);
    }
    return (
      <>
        <div className="row">
          <a href="" className="btn btn-info  ml-5 my-3">
            Add Questions
          </a>

          <form className="container col-12" onSubmit={this.submit}>
            <form>
              <label for="tags">Language:</label>
              <select
                value={this.state.language}
                onChange={this.language}
                id="tags"
                className="form-control form-inline mb-2"
              >
                <option value="cpp">C++</option>
                <option value="c">C</option>
                <option value="java">Java</option>
                <option value="python">Python</option>
              </select>
              <label for="tags">Topic Tags:</label>
              <select
                value={this.state.tag}
                onChange={this.tag}
                id="tags"
                className="form-control form-inline"
              >
                <option value="array">Array</option>
                <option value="string">string</option>
                <option value="algorithms">Algorithms</option>
                <option value="none">None</option>
              </select>
              <br />
              <label for="difficulty">Difficulty:</label>
              <select
                value={this.state.medium}
                onChange={this.medium}
                id="difficulty"
                className="form-control form-inline"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </form>

            <div className="form-group" className="my-2">
              <label for="title">Title</label>
              <input
                required
                type="text"
                name="title"
                id="title"
                onChange={this.title}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label for="description">Description</label>
              <textarea
                name="description"
                id="description"
                onChange={this.description}
                className="form-control"
              ></textarea>
            </div>
            <div className="form-group">
              <label for="instruction">Instruction</label>
              <textarea
                required
                name="instruction"
                id="instruction"
                onChange={this.instruction}
                className="form-control"
              ></textarea>
            </div>
            <div className="form-group">
              <label for="solution">Solution</label>
              <textarea
                required
                name="solution"
                id="solution"
                onChange={this.solution}
                className="form-control"
              ></textarea>
            </div>

            <Link to="/compete">
              <a href="" className="btn btn-secondary mr-2">
                Cancel
              </a>
            </Link>
            <button type="submit" className="btn btn-primary ml-2">
              Save
            </button>
          </form>
        </div>
      </>
    );
  }
}

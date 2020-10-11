import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FaIgloo } from "react-icons/fa";
import "./QuestionPage.css";
const ReactMarkdown = require("react-markdown");

export default class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tag: sessionStorage.getItem("tag") || `none`,
      loading: `initial`,
      language: localStorage.getItem("language") || `cpp`,
      medium: sessionStorage.getItem("medium") || `easy`,
    };
  }
  tag = async (event) => {
    // event.preventDefault();
    sessionStorage.setItem("tag", event.target.value);
    await this.setState({ tag: event.target.value });
    this.handleFilter();
  };
  medium = async (event) => {
    // event.preventDefault();
    sessionStorage.setItem("medium", event.target.value);
    await this.setState({ medium: event.target.value });
    this.handleFilter();
  };
  language = async (event) => {
    // event.preventDefault();
    localStorage.setItem("language", event.target.value);
    await this.setState({ language: event.target.value });

    this.handleFilter();
  };
  componentDidMount() {
    this.handleFilter();
  }
  handleFilter = async () => {
    try {
      
      const response = await fetch(process.env.NODE_ENV === 'production'?
        `${process.env.REACT_APP_WEBSITE_URL}/question/:?language=${this.state.language}&tag=${this.state.tag}&medium=${this.state.medium}` :
        `http://localhost:5000/question/:?language=${this.state.language}&tag=${this.state.tag}&medium=${this.state.medium}`
      );
  
      let jsonResponse = await response.json();
    

      this.setState({ info: jsonResponse, loading: "loaded" });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    if (this.state.loading == "initial") {
      return <></>;
    }
    if (this.state.loading == "loaded") {
      return (
        <>
          <div className="container">
            <br />
            <div className="row">
              <div className="col-lg-10 ">
                <hr />
                <Link to="/add">
                  <a href="" className="btn btn-info  mx-2">
                    Add Questions
                  </a>
                </Link>
                {this.state.info.map((question) => {
                  return (
                    <>
                      <Link
                        to={{
                          pathname: `/codingpage/${question._id}`,
                          query: {
                            instruction: question.instruction,
                            solution: question.solution,
                            testCases: question.testCases,
                            id: question._id,
                          },
                        }}
                        className="card-link"
                        instruction={question.instruction}
                      >
                        <div className="card mt-2 container col-8 ">
                          <div className="card-body px-1 py-1 ">
                            <h4 className="card-title">
                              <ReactMarkdown source={question.title} />
                            </h4>

                            <div className="card-text text-secondary">
                              <ReactMarkdown source={question.description} />
                            </div>

                            <a
                              href=""
                              className="btn btn-primary mx-2 float-right py-1"
                            >
                              {question.tag}
                            </a>

                            <form
                              action=""
                              method="POST"
                              className="d-inline  mx-2"
                            >
                              <button
                                type="submit"
                                className="btn btn-danger float-right py-1"
                              >
                                {question.medium}
                              </button>
                            </form>
                          </div>
                        </div>
                      </Link>
                    </>
                  );
                })}
              </div>

              <div className="col-lg-2">
                <hr />
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
              </div>
            </div>
          </div>
        </>
      );
    }
  }
}

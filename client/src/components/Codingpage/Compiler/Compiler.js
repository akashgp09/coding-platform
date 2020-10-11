import React, { Component } from "react";
import CodeMirror from "@uiw/react-codemirror";
import "codemirror/addon/display/autorefresh";
import "codemirror/addon/comment/comment";
import "codemirror/addon/edit/matchbrackets";
import "codemirror/keymap/sublime";
import "codemirror/theme/monokai.css";
import "codemirror/theme/cobalt.css";
import "codemirror/theme/material-ocean.css";
import "codemirror/theme/neo.css";
import "codemirror/theme/paraiso-light.css";
import "./Compiler.css";

let checkErr;
let code = "";
export default class Compiler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: sessionStorage.getItem("sourceCode") || "",
      output: ``,
      language_id: localStorage.getItem("languageId") || 2,
      user_input: ``,
      theme: localStorage.getItem("theme") || `material-ocean`,
      checkedBox: true,
    };
  }

  input = (event) => {
    event.preventDefault();
    this.setState({ input: event.target.value });
  };
  userInput = (event) => {
    event.preventDefault();
    this.setState({ user_input: event.target.value });
  };

  language = (event) => {
    event.preventDefault();
    this.setState({ language_id: event.target.value });
    localStorage.setItem("languageId", event.target.value);
  };
  theme = (event) => {
    event.preventDefault();
    this.setState({ theme: event.target.value });
    localStorage.setItem("theme", event.target.value);
  };
  updateCode = (editor, value) => {
    this.setState({ input: editor.getValue() });
    sessionStorage.setItem("sourceCode", editor.getValue());
  };
  handleCheckbox = () => {
    this.setState({ checkedBox: !this.state.checkedBox });
  };
  submit = async (e) => {
    e.preventDefault();

    if (this.state.checkedBox) {
      let sampleInput = `<b>Input(stdin)</b><br />`;
      let sampleOutput = `<b>Expected Output</b><br />`;
      let actualOutput = `<b>Your Output</b><br />`;
      let testPassed = 0;
      checkErr = false;
      let testCases = this.props.testCases;
      for (let i = 0; i < testCases.length; i++) {
        sampleOutput =
          sampleOutput +
          `<span class="numbers">Output${i + 1}</span>\n<code>${
            testCases[i].output
          }</code><br />`;
        sampleInput =
          sampleInput +
          `<span class="numbers">Input ${i + 1}</span>\n<code>${
            testCases[i].input
          }</code><br />`;
        let outputText = document.getElementById("output");
        if (i == 0) {
          outputText.innerHTML = "";
          outputText.innerHTML += "Creating Submission ...<br />";
        }
        const response = await fetch(
          "https://judge0-extra.p.rapidapi.com/submissions",
          {
            method: "POST",
            headers: {
              "x-rapidapi-host": "judge0-extra.p.rapidapi.com",
              "x-rapidapi-key":
                "62b1b5f315msh8d88d96b1858063p1af457jsn93a9017310e7",
              "content-type": "application/json",
              accept: "application/json",
            },
            body: JSON.stringify({
              source_code: this.state.input,
              stdin: testCases[i].input,
              language_id: this.state.language_id,
            }),
          }
        );
        if (i == 0) {
          outputText.innerHTML += "Submission Created ...<br />";
        }

        const jsonResponse = await response.json();
     

        let jsonGetSolution = {
          status: { description: "Queue" },
          stderr: null,
          compile_output: null,
        };

        while (
          jsonGetSolution.status.description !== "Accepted" &&
          jsonGetSolution.stderr == null &&
          jsonGetSolution.compile_output == null
        ) {
          if (i > 0) {
            outputText.innerHTML = `Creating Submission ... <br />Submission Created ...<br />Checking Submission Status<br />status : ${jsonGetSolution.status.description}`;
          }
          if (jsonResponse.token) {
            let url = `https://judge0-extra.p.rapidapi.com/submissions/${jsonResponse.token}?base64_encoded=true`;

            const getSolution = await fetch(url, {
              method: "GET",
              headers: {
                "x-rapidapi-host": "judge0-extra.p.rapidapi.com",
                "x-rapidapi-key": process.env.REACT_APP_JUDGE0_KEY,
                "content-type": "application/json",
              },
            });

            jsonGetSolution = await getSolution.json();
        
          }
        }
        if (jsonGetSolution.stdout) {
          const output = atob(jsonGetSolution.stdout);
          if (output == testCases[i].output) {
            testPassed++;
          }
          actualOutput =
            actualOutput +
            `<span class="numbers">Output ${
              i + 1
            }</span>\n<code>${output}</code><br />`;

          if (i === testCases.length - 1) {
            outputText.innerHTML = "";
            outputText.innerHTML += `<div class="execution-info">Execution Time : <code>${jsonGetSolution.time} Secs</code><br />Memory used : <code>${jsonGetSolution.memory} bytes</code></div>`;
          }
        } else if (jsonGetSolution.stderr) {
          checkErr = true;
          const error = atob(jsonGetSolution.stderr);

          if (i === testCases.length - 1) {
            outputText.innerHTML = "";
            checkErr = true;
            outputText.innerHTML += `Error :${error}`;
          }
        } else {
          checkErr = true;
          const compilation_error = atob(jsonGetSolution.compile_output);

          if (i === testCases.length - 1) {
            outputText.innerHTML = "";

            outputText.innerHTML += ` Error :${compilation_error}`;
          }
        }
        // });
      }
      if (testPassed == testCases.length) {
        if (!checkErr) {
          let appenOutput = document.getElementById("output");

          appenOutput.innerHTML += `<span class="passed-test">All Tests Passed, Congratulations</span><div class="stdin">${sampleInput}</div><div class="expected-output">${sampleOutput}</div><div class="your-output">${actualOutput}</div>`;
        }
      } else {
        if (!checkErr) {
          let appenOutput = document.getElementById("output");

          appenOutput.innerHTML += `<span class="failed-test">${
            testCases.length - testPassed
          } Test Failed :(</span><div class="stdin">${sampleInput}</div><div class="expected-output">${sampleOutput}</div><div class="your-output">${actualOutput}</div>`;
        }
      }
    } else {
      let outputText = document.getElementById("output");
      outputText.innerHTML = "";
      outputText.innerHTML += "Creating Submission ...\n";
      const response = await fetch(
        "https://judge0-extra.p.rapidapi.com/submissions",
        {
          method: "POST",
          headers: {
            "x-rapidapi-host": "judge0-extra.p.rapidapi.com",
            "x-rapidapi-key": process.env.REACT_APP_JUDGE0_KEY,
            "content-type": "application/json",
            accept: "application/json",
          },
          body: JSON.stringify({
            source_code: this.state.input,
            stdin: this.state.user_input,
            language_id: this.state.language_id,
          }),
        }
      );
      outputText.innerHTML += "Submission Created ...\n";
      const jsonResponse = await response.json();

      let jsonGetSolution = {
        status: { description: "Queue" },
        stderr: null,
        compile_output: null,
      };

      while (
        jsonGetSolution.status.description !== "Accepted" &&
        jsonGetSolution.stderr == null &&
        jsonGetSolution.compile_output == null
      ) {
        outputText.innerHTML = `Creating Submission ... \nSubmission Created ...\nChecking Submission Status\nstatus : ${jsonGetSolution.status.description}`;
        if (jsonResponse.token) {
          let url = `https://judge0-extra.p.rapidapi.com/submissions/${jsonResponse.token}?base64_encoded=true`;

          const getSolution = await fetch(url, {
            method: "GET",
            headers: {
              "x-rapidapi-host": "judge0-extra.p.rapidapi.com",
              "x-rapidapi-key": process.env.REACT_APP_JUDGE0_KEY,
              "content-type": "application/json",
            },
          });

          jsonGetSolution = await getSolution.json();
        }
      }
      if (jsonGetSolution.stdout) {
        const output = atob(jsonGetSolution.stdout);

        outputText.innerHTML = "";

        outputText.innerHTML += `Results :\n ${output}\nExecution Time : ${jsonGetSolution.time} Secs\nMemory used : ${jsonGetSolution.memory} bytes`;
      } else if (jsonGetSolution.stderr) {
        const error = atob(jsonGetSolution.stderr);

        outputText.innerHTML = "";

        outputText.innerHTML += `\n Error :${error}`;
      } else {
        const compilation_error = atob(jsonGetSolution.compile_output);

        outputText.innerHTML = "";

        outputText.innerHTML += `\n Error :${compilation_error}`;
      }
    }
  };
  render() {
    return (
      <>
        <div className="row container-fluid">
          <div className="col-6 ml-4 ">
            <label for="tags" className="mr-1">
              <b className="heading">Theme</b>
            </label>
            <select
              value={this.state.theme}
              onChange={this.theme}
              id="tags"
              className="form-control form-inline mb-2 language"
            >
              <option value="monokai">monokai</option>
              <option value="cobalt">cobalt</option>
              <option value="material-ocean">material-ocean</option>
              <option value="neo">neo</option>
              <option value="paraiso-light">paraiso-light</option>
            </select>

            <div className="ide-size">
              <CodeMirror
                value={this.state.input}
                options={{
                  theme: this.state.theme,
                  tabSize: 2,
                  keyMap: "sublime",
                  mode: "C",
                }}
                onChange={this.updateCode}
              />
            </div>

            <button
              type="submit"
              className="btn btn-danger ml-2 mr-2 "
              onClick={this.submit}
            >
              <i class="fas fa-cog fa-fw"></i> Run
            </button>

            <label for="tags" className="mr-1">
              <b className="heading">Language:</b>
            </label>

            <select
              value={this.state.language_id}
              onChange={this.language}
              id="tags"
              className="form-control form-inline mb-2 language"
            >
              <option value="2">C++</option>
              <option value="1">C</option>
              <option value="4">Java</option>
              <option value="10">Python</option>
            </select>
          </div>
          <div className="col-5 ">
            <span className="badge badge-info heading my-2 ">
              <i className="fas fa-exclamation fa-fw fa-md"></i> Output
            </span>
            <div className="output-section">
              <div id="output"></div>
            </div>
          </div>
        </div>

        <label>
          <span class="custom-checkbox inline">
            <input
              type="checkbox"
              class="custom-input-checkbox"
              id="myCheck"
              onChange={this.handleCheckbox}
            />
          </span>
          <span>&nbsp;&nbsp;Test against custom input</span>
        </label>
        <br />
        {!this.state.checkedBox ? (
          <textarea id="input" onChange={this.userInput}></textarea>
        ) : (
          ""
        )}
      </>
    );
  }
}

// import React, { Component } from "react";

// import "./Compiler.css";
// export default class Compiler extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       input: ``,
//       output: ``,
//       language_id: 2,
//       user_input: ``,
//     };
//   }
//   input = (event) => {
//     event.preventDefault();
//     this.setState({ input: event.target.value });
//   };
//   userInput = (event) => {
//     event.preventDefault();
//     this.setState({ user_input: event.target.value });
//   };
//   language = (event) => {
//     event.preventDefault();
//     this.setState({ language_id: event.target.value });
//   };

//   submit = async (e) => {
//     e.preventDefault();

//     let outputText = document.getElementById("output");
//     outputText.innerHTML = "";
//     outputText.innerHTML += "Creating Submission ...\n";
//     const response = await fetch(
//       "https://judge0-extra.p.rapidapi.com/submissions",
//       {
//         method: "POST",
//         headers: {
//           "x-rapidapi-host": "judge0-extra.p.rapidapi.com",
//           "x-rapidapi-key":
//             "62b1b5f315msh8d88d96b1858063p1af457jsn93a9017310e7",
//           "content-type": "application/json",
//           accept: "application/json",
//         },
//         body: JSON.stringify({
//           source_code: this.state.input,
//           stdin: this.state.user_input,
//           language_id: this.state.language_id,
//         }),
//       }
//     );
//     outputText.innerHTML += "Submission Created ...\n";
//     const jsonResponse = await response.json();

//     let jsonGetSolution = {
//       status: { description: "Queue" },
//       stderr: null,
//       compile_output: null,
//     };

//     while (
//       jsonGetSolution.status.description !== "Accepted" &&
//       jsonGetSolution.stderr == null &&
//       jsonGetSolution.compile_output == null
//     ) {
//       outputText.innerHTML = `Creating Submission ... \nSubmission Created ...\nChecking Submission Status\nstatus : ${jsonGetSolution.status.description}`;
//       if (jsonResponse.token) {
//         let url = `https://judge0-extra.p.rapidapi.com/submissions/${jsonResponse.token}?base64_encoded=true`;

//         const getSolution = await fetch(url, {
//           method: "GET",
//           headers: {
//             "x-rapidapi-host": "judge0-extra.p.rapidapi.com",
//             "x-rapidapi-key":
//               "62b1b5f315msh8d88d96b1858063p1af457jsn93a9017310e7",
//             "content-type": "application/json",
//           },
//         });

//         jsonGetSolution = await getSolution.json();
//       }
//     }
//     if (jsonGetSolution.stdout) {
//       const output = atob(jsonGetSolution.stdout);

//       outputText.innerHTML = "";

//       outputText.innerHTML += `Results : ${output}\nExecution Time : ${jsonGetSolution.time} Secs\nMemory used : ${jsonGetSolution.memory} bytes`;
//     } else if (jsonGetSolution.stderr) {
//       const error = atob(jsonGetSolution.stderr);

//       outputText.innerHTML = "";

//       outputText.innerHTML += `\n Error :${error}`;
//     } else {
//       const compilation_error = atob(jsonGetSolution.compile_output);

//       outputText.innerHTML = "";

//       outputText.innerHTML += `\n Error :${compilation_error}`;
//     }
//   };

//   render() {
//     {
//       console.log(this.props.location.query.testCases);
//     }
//     return (
//       <>
//         {/* <center> */}
//         <div className="row container-fluid">
//           <div className="col-6 ml-4 ">
//             {/* <div className="form-group"> */}
//             <label for="solution ">
//               <span className="badge badge-info heading mt-2 ">
//                 <i className="fas fa-code fa-fw fa-lg"></i> Code Here
//               </span>
//             </label>
//             <textarea
//               required
//               name="solution"
//               id="source"
//               onChange={this.input}
//               className=" source"
//             ></textarea>
//             {/* </div> */}

//             <button
//               type="submit"
//               className="btn btn-danger ml-2 mr-2 "
//               onClick={this.submit}
//             >
//               <i class="fas fa-cog fa-fw"></i> Run
//             </button>

//             <label for="tags" className="mr-1">
//               <b className="heading">Language:</b>
//             </label>
//             <select
//               value={this.state.language}
//               onChange={this.language}
//               id="tags"
//               className="form-control form-inline  language"
//             >
//               <option value="2">C++</option>
//               <option value="1">C</option>
//               <option value="4">Java</option>
//               <option value="10">Python</option>
//             </select>
//           </div>
//           <div className="col-5">
//             <div>
//               <span className="badge badge-info heading my-2 ">
//                 <i className="fas fa-exclamation fa-fw fa-md"></i> Output
//               </span>
//               <br />
//               <textarea id="output"></textarea>
//             </div>
//           </div>
//         </div>

//         <div className=" ml-5">
//           <span className="badge badge-primary heading my-2 ">
//             <i className="fas fa-user fa-fw fa-md"></i> User Input
//           </span>
//           <br />
//           <textarea id="input" onChange={this.userInput}></textarea>
//         </div>
//       </>
//     );
//   }
// }
import React, { Component } from "react";

import "./Compiler.css";

// let sampleInput = `Input(stdin)\n`;
// let sampleOutput = `Expected Output\n`;
// let actualOutput = `Your Output\n`;
let checkErr;
export default class Compiler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ``,
      output: ``,
      language_id: 2,
      user_input: ``,
    };
  }

  // let sampleResult =""
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
  };

  submit = async (e) => {
    e.preventDefault();
    // sample.forEach(async (sample) => {
    //   console.log(testCases.input);
    let sampleInput = `<b>Input(stdin)</b><br />`;
    let sampleOutput = `<b>Expected Output</b><br />`;
    let actualOutput = `<b>Your Output</b><br />`;
    let testPassed = 0;
    checkErr = false;
    let testCases = this.props.location.query.testCases;
    for (let i = 0; i < testCases.length; i++) {
      // let sampleInput = `Input(stdin)<br />`;

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
              "62b1b5f315msh8d88d96b1858063p1af457jsn93a9017310e7", // Get yours for free at https://rapidapi.com/hermanzdosilovic/api/judge0
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
      console.log(jsonResponse);

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
              "x-rapidapi-key":
                "62b1b5f315msh8d88d96b1858063p1af457jsn93a9017310e7", // Get yours for free at https://rapidapi.com/hermanzdosilovic/api/judge0
              "content-type": "application/json",
            },
          });

          jsonGetSolution = await getSolution.json();
          console.log(jsonGetSolution);
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
        // outputText.innerHTML = "";
        // Results : ${output}<br />
        if (i === testCases.length - 1) {
          outputText.innerHTML = "";
          outputText.innerHTML += `<div class="execution-info">Execution Time : <code>${jsonGetSolution.time} Secs</code><br />Memory used : <code>${jsonGetSolution.memory} bytes</code></div>`;
        }
      } else if (jsonGetSolution.stderr) {
        checkErr = true;
        const error = atob(jsonGetSolution.stderr);

        // outputText.innerHTML = "";
        if (i === testCases.length - 1) {
          outputText.innerHTML = "";
          checkErr = true;
          outputText.innerHTML += `Error :${error}`;
        }
      } else {
        checkErr = true;
        const compilation_error = atob(jsonGetSolution.compile_output);

        // outputText.innerHTML = "";
        if (i === testCases.length - 1) {
          outputText.innerHTML = "";

          outputText.innerHTML += ` Error :${compilation_error}`;
        }
      }
      // });
    }
    if (testPassed == testCases.length) {
      console.log(testPassed, "if block");
      if (!checkErr) {
        let appenOutput = document.getElementById("output");

        appenOutput.innerHTML += `<span class="passed-test">All Tests Passed, Congratulations</span><div class="stdin">${sampleInput}</div><div class="expected-output">${sampleOutput}</div><div class="your-output">${actualOutput}</div>`;
      }
    } else {
      console.log(testPassed, "else block");
      if (!checkErr) {
        let appenOutput = document.getElementById("output");

        appenOutput.innerHTML += `<span class="failed-test">${
          testCases.length - testPassed
        } Test Failed :(</span><div class="stdin">${sampleInput}</div><div class="expected-output">${sampleOutput}</div><div class="your-output">${actualOutput}</div>`;
      }
    }

    console.log(sampleInput);
    console.log(sampleOutput);
    console.log(actualOutput);
  };
  render() {
    return (
      <>
        <div className="row container-fluid">
          <div className="col-6 ml-4 ">
            <label for="solution ">
              <span className="badge badge-info heading mt-2 ">
                <i className="fas fa-code fa-fw fa-lg"></i> Code Here
              </span>
            </label>
            <textarea
              required
              name="solution"
              id="source"
              onChange={this.input}
              className=" source"
            ></textarea>

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
              value={this.state.language}
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

        {/* <div className="mt-2 ml-5">
          <span className="badge badge-primary heading my-2 ">
            <i className="fas fa-user fa-fw fa-md"></i> User Input
          </span>
          <br />
          <textarea id="input" onChange={this.userInput}></textarea>
        </div> */}
      </>
    );
  }
}
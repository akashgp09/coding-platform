// import React, { Component } from "react";

// export default class SignUp extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       username: "",
//       email: "",
//       password: "",
//     };
//   }
//   username = (event) => {
//     this.setState({ username: event.target.value });
//   };
//   email = (event) => {
//     this.setState({ email: event.target.value });
//   };
//   password = (event) => {
//     this.setState({ password: event.target.value });
//   };
//   submit = async (e) => {
//     e.preventDefault();
//     // const { history } = this.props;
//     try {
//       const response = await fetch(`${process.env.REACT_APP_WEBSITE_URL}/user/signup`||"http://localhost:5000/user/signup", {
//         method: "POST",
//         headers: {
//           Accept: "application/json",

//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           username: this.state.username,
//           email: this.state.email,
//           password: this.state.password,
//         }),
//       });
//       if (response.ok) {
//         const jsonResponse = await response.json();
//         const token = jsonResponse.token;

//         const userResponse = await fetch(`${process.env.REACT_APP_WEBSITE_URL}/user/me`||"http://localhost:5000/user/me", {
//           method: "GET",
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//             token: token,
//           },
//         });

//         if (userResponse.ok) {
//           const user = await userResponse.json();
//           // history.push("/dashboard");
//           alert("Welcome");
//         }
//       } else {
//         const jsonResponse = await response.json();

//         this.setState({ err: jsonResponse.message });
//       }
//     } catch (error) {}
//   };
//   render() {
//     return (
//       <>
//         <form onSubmit={this.submit}>
//           <h3>Sign Up</h3>

//           <div className="form-group form-group-signup">
//             <label>Username</label>
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Full Name"
//               onChange={this.username}
//               required
//             />
//           </div>

//           <div className="form-group form-group-signup">
//             <label>Email address</label>
//             <input
//               type="email"
//               className="form-control"
//               placeholder="Enter email"
//               onChange={this.email}
//               required
//             />
//           </div>

//           <div className="form-group form-group-signup">
//             <label>Password</label>
//             <input
//               type="password"
//               minLength="6"
//               className="form-control"
//               placeholder="Enter password"
//               onChange={this.password}
//               required
//             />
//           </div>

//           <button type="submit" className="btn btn-primary btn-block">
//             Sign Up
//           </button>
//           <p className="forgot-password text-right">
//             {this.state.err}
//             {/* Already registered <a href="#">sign in?</a> */}
//           </p>
//         </form>
//       </>
//     );
//   }
// }

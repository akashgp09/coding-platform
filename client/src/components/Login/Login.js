// import React, { Component } from "react";

// export default class Login extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       email: "",
//       err: "",
//       password: "",
//     };
//   }
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
//       const response = await fetch(`${process.env.REACT_APP_WEBSITE_URL}/user/login` || "http://localhost:5000/user/login", {
//         method: "POST",
//         headers: {
//           Accept: "application/json",

//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email: this.state.email,
//           password: this.state.password,
//         }),
//       });
//       if (response.ok) {
//         const jsonResponse = await response.json();
//         const token = jsonResponse.token;
//         console.log(token);
//         const userResponse = await fetch(`${process.env.REACT_APP_WEBSITE_URL}/user/me` || "http://localhost:5000/user/me", {
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
//         } else {
//           // this.setState({ err: response.message });
//           console.log(userResponse);
//         }
//       } else {
//         const jsonResponse = await response.json();
//         this.setState({ err: jsonResponse.message });
//       }
//     } catch (error) {
//       this.setState({ err: error.message });
//     }
//   };
//   render() {
//     return (
//       <form onSubmit={this.submit}>
//         <h3>Sign In</h3>

//         <div className="form-group">
//           <label>Email address</label>
//           <input
//             type="email"
//             className="form-control"
//             placeholder="Enter email"
//             onChange={this.email}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label>Password</label>
//           <input
//             type="password"
//             className="form-control"
//             placeholder="Enter password"
//             minLength="6"
//             onChange={this.password}
//             required
//           />
//         </div>

//         <button type="submit" className="btn btn-primary btn-block">
//           Submit
//         </button>
//         <p className="forgot-password text-right">{this.state.err}</p>
//       </form>
//     );
//   }
// }

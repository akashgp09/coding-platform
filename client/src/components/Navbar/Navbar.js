import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaSadCry, FaTimes } from "react-icons/fa";
import { Button } from "./Button";
import "./Navbar.css";
import { IconContext } from "react-icons/lib";
import { Modal } from "react-bootstrap";
import {
  GoogleLoginButton,
  // GithubLoginButton,
} from "react-social-login-buttons";
import PropTypes from "prop-types";
const logo = require("../../Logo/dsckiit_logo_colour.svg");

export default class Navbar extends Component {
  static propTypes = {
    authenticated: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      click: false,
      button: true,
      show: false,
    };
  }

  handleShow = () => {
    this.setState({ show: true });
  };
  handleClose = () => {
    this.setState({ show: false });
  };
  handleClick = (e) => {
    // e.preventDefault();
    this.setState({ click: !this.state.click });
  };
  closeMobileMenu = (e) => {
    // e.preventDefault();
    this.setState({ click: false });
  };
  showButton = () => {
    if (window.innerWidth <= 960) {
      // setButton(false);
      this.setState({ button: false });
    } else {
      this.setState({ button: true });
    }
  };
  componentDidMount() {
    this.showButton();
  }
  _handleSignInClick = () => {
    // Authenticate using via passport api in the backend
    // Open Google login page
    window.open(process.env.NODE_ENV === 'production'?`/auth/google`:"http://localhost:5000/auth/google", "_self");
  };

  _handleLogoutClick = () => {
    // Logout using Google passport api
    // Set authenticated state to false in the HomePage component
    window.open(process.env.NODE_ENV === 'production'?`/auth/logout`:"http://localhost:5000/auth/logout", "_self");
    this.props.handleNotAuthenticated();
  };
  render() {
    const { authenticated } = this.props;
    const { user } = this.props;

    window.addEventListener("resize", this.showButton);
    return (
      <>
        <IconContext.Provider value={{ color: "#fff" }}>
          <div className="navbar">
            <div className="navbar-container container">
              <Link
                to="/"
                className="navbar-logo"
                onClick={this.closeMobileMenu}
              >
                <img src={logo} alt="dsc" />
              </Link>
              <div className="menu-icon" onClick={this.handleClick}>
                {this.state.click ? <FaTimes /> : <FaBars />}
              </div>
              <ul className={this.state.click ? "nav-menu active" : "nav-menu"}>
                <li className="nav-item">
                  <Link
                    to="/"
                    className="nav-links dec"
                    onClick={this.closeMobileMenu}
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/compete"
                    className="nav-links dec"
                    onClick={this.closeMobileMenu}
                  >
                    Compete/Practice
                  </Link>
                </li>
                {!authenticated ? (
                  <li className="nav-btn">
                    {this.state.button ? (
                      <>
                        <Button variant="primary" onClick={this.handleShow}>
                          LOGIN
                        </Button>

                        <Modal
                          show={this.state.show}
                          className=" fade"
                          onHide={this.handleClose}
                        >
                          <Modal.Header closeButton>
                            <h3 className="px-5">
                              Sign in To Get Started&nbsp;
                              <img
                                src="https://dev-to-uploads.s3.amazonaws.com/uploads/organization/profile_image/2086/859e9317-d715-4a2b-b88e-61cdfd379039.png"
                                width="50"
                              ></img>
                            </h3>
                          </Modal.Header>
                          <Modal.Body>
                            <GoogleLoginButton
                              onClick={this._handleSignInClick}
                            />
                            {/* <GithubLoginButton /> */}
                          </Modal.Body>
                        </Modal>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="primary"
                          onClick={() => {
                            this.handleShow();
                            this.closeMobileMenu();
                          }}
                        >
                          LOGIN
                        </Button>
                        <Modal
                          show={this.state.show}
                          className=" fade"
                          onHide={this.handleClose}
                        >
                          <Modal.Header closeButton>
                            <h3 className="px-5">
                              Sign in to Get Started&nbsp;
                              <img
                                src="https://dev-to-uploads.s3.amazonaws.com/uploads/organization/profile_image/2086/859e9317-d715-4a2b-b88e-61cdfd379039.png"
                                width="50"
                              ></img>
                            </h3>
                          </Modal.Header>
                          <Modal.Body>
                            <GoogleLoginButton
                              onClick={this._handleSignInClick}
                            />
                            {/* <GithubLoginButton /> */}
                          </Modal.Body>
                        </Modal>
                      </>
                    )}
                  </li>
                ) : (
                  <li className="nav-btn">
                    {this.state.button ? (
                      <>
                        <Link
                          className="btn-link dec"
                          onClick={this._handleLogoutClick}
                        >
                          <Button
                            buttonStyle="btn--outline"
                            className="btn-link dec"
                          >
                            LOGOUT
                          </Button>
                        </Link>
                      </>
                    ) : (
                      <Link
                        to="/user/signup"
                        className="btn-link"
                        onClick={() => {
                          this._handleLogoutClick();
                          this.closeMobileMenu();
                        }}
                      >
                        <Button
                          buttonStyle="btn--outline"
                          buttonSize="btn--mobile"
                        >
                          LOGOUT
                        </Button>
                      </Link>
                    )}
                  </li>
                )}
                <li>
                  {authenticated ? (
                    <Link
                      to={{
                        pathname: `/profile/${user._id}`,
                        query: {
                          user: user,
                        },
                      }}
                      className="btn-link dec"
                    >
                      <span class="profile-text">
                        <img src={user.photo} className="profile-img" />
                      </span>
                    </Link>
                  ) : (
                    ""
                  )}
                </li>
              </ul>
            </div>
          </div>
        </IconContext.Provider>
      </>
    );
  }
}

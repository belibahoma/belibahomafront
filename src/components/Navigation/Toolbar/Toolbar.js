import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo.jpg";

import { Navbar, NavItem, Nav, Dropdown, Button } from "react-bootstrap";
import UserContext from "../../../contexts/UserContext";
import UserProvider from "./../../../contexts/UserProvider";
import Auth from "../../../containers/Auth/Auth";

export default class Toolbar extends Component {
  state = {
    id: "",
    user: "",
    isLoggedIn: false,
    isLoggingIn: false,
    fname: "",
    lname: "",
    type: ""
  };

  handleLoggingClicked = () => {
    this.setState({ isLoggingIn: true });
    console.log("logging open clicked");
  };

  handleLoggingCanceled = () => {
    console.log("logging cancel clicked");
    this.setState({ isLoggingIn: !this.state.isLoggingIn }, () => {
      console.log("after changing state", this.state.isLoggingIn);
    });
  };

  signInOutBtn = () => {
    if (this.state.isLoggedIn) {
    } else {
      return (
        <Nav className="mr-auto">
          <NavItem as={Link} to="/register" className="btn btn-success m-2">
            הרשם
          </NavItem>
          <Button
            onClick={() => {
              this.handleLoggingClicked();
            }}
            type="button"
            className="btn btn-primary m-2"
          >
            התחבר
            <Auth
              loginModalShow={this.state.isLoggingIn}
              onModalClosed={this.handleLoggingCanceled}
            />
          </Button>
        </Nav>
      );
    }
  };

  render() {
    if (!this.state.isLoggingIn) console.log("logged in false");

    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {this.signInOutBtn()}
        <Navbar.Collapse id="basic-navbar-navyar" className="mr-auto" />
        <Navbar.Brand as={Link} to="/">
          בליבה חומה
        </Navbar.Brand>
        <Navbar.Brand as={Link} to="/">
          <img
            src={logo}
            width="50"
            height="50"
            className="d-inline-block align-top"
            alt="Beliba Homa logo"
          />
        </Navbar.Brand>
      </Navbar>
    );
  }
}

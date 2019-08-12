import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo.jpg";

import { Navbar, Nav, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import Auth from "../../../containers/Auth/Auth";
import AdminToolbar from "./AdminToolbar";

class Toolbar extends Component {
  state = {
    isLoggedIn: false,
    isLoggingIn: false,
    fname: "",
    lname: "",
    userType: null,
    isButtonDisabled: false
  };

  componentDidMount() {
    const userToken = localStorage.getItem("beliba-homa-auth-token");
    let userData = localStorage.getItem("beliba-homa-user");
    if (userToken && userData && !this.state.isLoggedIn) {
      userData = JSON.parse(userData);
      this.setState({
        user: userData,
        isLoggedIn: true,
        fname: userData.fname,
        lname: userData.lname,
        userType: userData.userType
      });
    }
  }

  componentWillUpdate() {
    const userToken = localStorage.getItem("beliba-homa-auth-token");
    let userData = localStorage.getItem("beliba-homa-user");
    if (userToken && userData && !this.state.isLoggedIn) {
      userData = JSON.parse(userData);
      this.setState({
        user: userData,
        isLoggedIn: true,
        fname: userData.fname,
        lname: userData.lname,
        userType: userData.userType
      });
    } else {
      if (this.state.isButtonDisabled)
        this.setState({ isButtonDisabled: false });
    }
  }

  menuItems = () => {
    if (this.state.userType && this.state.userType === "admin") {
      return (
        <Nav className="text-left ml-auto">
          <AdminToolbar />
        </Nav>
      );
    } else return null;
  };

  handleRegisterClicked = () => {
    this.setState({ isButtonDisabled: true });
    this.props.history.push("/register");
  };

  handleAuthenticated = data => {
    console.log("Authenticated:", data.user);
    this.setState({
      isLoggedIn: true,
      isLoggingIn: false
    });
  };

  handleLoggingClicked = () => {
    this.setState({ isLoggingIn: true });
  };

  handleLoggingCanceled = () => {
    localStorage.removeItem("beliba-homa-auth-token");
    localStorage.removeItem("beliba-homa-user");
    this.setState({
      isLoggedIn: false,
      isLoggingIn: false,
      fname: "",
      lname: "",
      userType: null
    });
  };

  handleLoggingOut = () => {
    localStorage.removeItem("beliba-homa-auth-token");
    localStorage.removeItem("beliba-homa-user");
    this.setState({ isLoggedIn: false, fname: "", lname: "", userType: null });
    this.props.history.push("/");
  };

  signInOutBtn = () => {
    if (this.state.isLoggedIn) {
      return (
        <Nav className="text-left">
          <Button
            onClick={this.handleLoggingOut}
            className="btn btn-danger m-2"
          >
            התנתק
          </Button>
          <Navbar.Text className="text-center align-content-center mt-1 font-weight-bold">
            {" שלום " + this.state.fname + " " + this.state.lname}
          </Navbar.Text>
        </Nav>
      );
    } else {
      return (
        <Nav className="justify-content-center">
          <Button
            onClick={this.handleRegisterClicked}
            className="btn btn-success m-2"
            disabled={this.state.isButtonDisabled ? "disabled" : ""}
          >
            הרשם
          </Button>
          <Button
            onClick={this.handleLoggingClicked}
            type="button"
            className="btn btn-primary m-2"
            disabled={this.state.isButtonDisabled ? "disabled" : ""}
          >
            התחבר
          </Button>
        </Nav>
      );
    }
  };

  render() {
    return (
      <React.Fragment>
        <Navbar bg="light" expand="lg" className="text-right">
          <Navbar.Toggle aria-controls="basic-navbar-nav align-content-top" />
          <Navbar.Collapse
            id="basic-navbar-navyar"
            className="justify-content-start"
          >
            {this.signInOutBtn()}
            {this.menuItems()}
            <Nav className="mr-auto" />
          </Navbar.Collapse>
          <Navbar.Brand as={Link} to="/" className="mt-1">
            בליבה חומה
          </Navbar.Brand>
          <Navbar.Brand
            as={Link}
            to="/"
            className="text-center align-content-center"
          >
            <img
              src={logo}
              width="50"
              height="50"
              className="d-inline-block align-top"
              alt="Beliba Homa logo"
            />
          </Navbar.Brand>
        </Navbar>
        <Auth
          onAuthenticated={this.handleAuthenticated}
          loginModalShow={this.state.isLoggingIn}
          onModalCanceled={this.handleLoggingCanceled}
        />
      </React.Fragment>
    );
  }
}

export default withRouter(Toolbar);

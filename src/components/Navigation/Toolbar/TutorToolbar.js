import React, { Component } from "react";
import { Nav } from "react-bootstrap";
import { withRouter, Link } from "react-router-dom";

class TutorToolbar extends Component {
  componentDidMount() {
    const userToken = localStorage.getItem("beliba-homa-auth-token");
    let userData = localStorage.getItem("beliba-homa-user");
    if (userToken && userData) {
      userData = JSON.parse(userData);
      this.setState({ user: userData });
    }
  }

  render() {
    return (
      <Nav className="text-right m-auto">
        <Nav.Link
          as={Link}
          to={
            this.state.user.userType === "tutor" ? "/reports" : "/ReportTrainee"
          }
        >
          קשרי חניכה
        </Nav.Link>
        <Nav.Link as={Link} to={"/details"}>
          פרטים
        </Nav.Link>
      </Nav>
    );
  }
}

export default withRouter(TutorToolbar);

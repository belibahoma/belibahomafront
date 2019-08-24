import React, { Component } from "react";
import { Nav } from "react-bootstrap";
import { withRouter, Link } from "react-router-dom";

class TutorToolbar extends Component {
  render() {
    return (
      <Nav className="text-right m-auto">
        <Nav.Link as={Link} to={"/reports"}>
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

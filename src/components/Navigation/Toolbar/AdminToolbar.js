import React, { Component } from "react";
import { NavDropdown, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class AdminToolbar extends Component {
  render() {
    return (
      <Nav className="text-right m-auto">
        <NavDropdown alignRight title="ניהול התראות" id="basic-nav-dropdown">
          <NavDropdown.Item as={Link} to="/alerts" className="text-right">
            לוח התראות
          </NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2" className="text-right">
            ארכיון התראות
          </NavDropdown.Item>
        </NavDropdown>
        <NavDropdown
          alignRight
          title="ניהול קשרי חונכות"
          id="basic-nav-dropdown"
          className="mr-3"
        >
          <NavDropdown.Item as={Link} to="/relations" className="text-right">
            רשימת קשרי חונכות
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/addRelation" className="text-right">
            ציוות ידני
          </NavDropdown.Item>
        </NavDropdown>
        <NavDropdown
          alignRight
          title="ניהול ישויות עזר"
          id="basic-nav-dropdown"
          className="mr-3"
        >
          <NavDropdown.Item
            as={Link}
            to="/ActivityAreas"
            className="text-right"
          >
            איזורי פעילות
          </NavDropdown.Item>
          <NavDropdown.Item
            as={Link}
            to="/AcademicInstitutions"
            className="text-right"
          >
            מוסדות אקדמאים
          </NavDropdown.Item>
          <NavDropdown.Item
            as={Link}
            to="/EducationPrograms"
            className="text-right"
          >
            מסלולי לימוד
          </NavDropdown.Item>
        </NavDropdown>
        <NavDropdown alignRight title="ניהול משתמשים" id="basic-nav-dropdown" className="mr-3">
          <NavDropdown.Item href="AdminsAndCoordinators" className="text-right">
            משתמשי אדמין ורכזים
          </NavDropdown.Item>
          <NavDropdown.Item href="Trainees" className="text-right">
            חניכים
          </NavDropdown.Item>
          <NavDropdown.Item href="Tutors" className="text-right">
            חונכים
          </NavDropdown.Item>
          <NavDropdown.Item href="#action/3.4" className="text-right">
            אתחול שנה
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>
    );
  }
}

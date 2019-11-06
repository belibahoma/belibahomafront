import React, { Component } from "react";
import { NavDropdown, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
// import NavLink from "react-bootstrap/NavLink";

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
        <NavDropdown alignRight title="חיתוכים/גזירת מידע" id="basic-nav-dropdown">
          <NavDropdown.Item as={Link} to="/filters/general/trainees" className="text-right">
            חיתוך של חניכים
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/filters/general/tutors" className="text-right">
            חיתוך של חונכים
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/filters/active-years/trainees" className="text-right">
            חיתוך חניכים לפי שנות פעילות
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/filters/active-years/tutors" className="text-right">
            חיתוך חונכים לפי שנות פעילות
            </NavDropdown.Item>
        </NavDropdown>
        <NavDropdown
          alignRight
          title="ניהול קשרי למידה משותפת"
          id="basic-nav-dropdown"
          className="mr-3"
        >
          <NavDropdown.Item as={Link} to="/relations" className="text-right">
            רשימת קשרי למידה משותפת
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
        <NavDropdown
          alignRight
          title="ניהול משתמשים"
          id="basic-nav-dropdown"
          className="mr-3"
        >
          <NavDropdown.Item
            as={Link}
            to="/AdminsAndCoordinators"
            className="text-right"
          >
            משתמשי אדמין ורכזים
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/Trainees" className="text-right">
            סטודנטים חרדים
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/Tutors" className="text-right">
            מתגברים
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>
    );
  }
}

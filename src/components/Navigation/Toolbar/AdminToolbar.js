import React, { Component } from "react";
import { NavDropdown, Nav } from "react-bootstrap";

export default class AdminToolbar extends Component {
  render() {
    return (
      <Nav className="text-right ">
        <NavDropdown alignRight title="ניהול התראות" id="basic-nav-dropdown" className="mr-3">
          <NavDropdown.Item href="#action/3.1" className="text-right">
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
          <NavDropdown.Item href="#action/3.1" className="text-right">
            רשימת קשרי חונכות
          </NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2" className="text-right">
            ציוות ידני
          </NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2" className="text-right">
            ציוות אוטומטי
          </NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2" className="text-right">
            המלצת המערכת לקשרי חונכות
          </NavDropdown.Item>
        </NavDropdown>
        <NavDropdown
          alignRight
          title="ניהול ישויות עזר"
          id="basic-nav-dropdown"
          className="mr-3"
        >
          <NavDropdown.Item href="ActivityAreas" className="text-right">
            איזורי פעילות
          </NavDropdown.Item>
          <NavDropdown.Item href="AcademicInstitutions" className="text-right">
            מוסדות אקדמאים
          </NavDropdown.Item>
          <NavDropdown.Item href="EducationPrograms" className="text-right">
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

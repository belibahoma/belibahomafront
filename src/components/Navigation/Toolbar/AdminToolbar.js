import React, { Component } from "react";
import { NavDropdown, Nav } from "react-bootstrap";

export default class AdminToolbar extends Component {
  render() {
    return (
      <Nav className="text-right m-auto">
        <NavDropdown alignRight title="ניהול התראות" id="basic-nav-dropdown">
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
        >
          <NavDropdown.Item href="#action/3.1" className="text-right">
            איזורי פעילות
          </NavDropdown.Item>
          <NavDropdown.Item href="#action/3.1" className="text-right">
            מוסדות אקדמאים
          </NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2" className="text-right">
            מסלולי לימוד
          </NavDropdown.Item>
        </NavDropdown>
        <NavDropdown alignRight title="ניהול משתמשים" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1" className="text-right">
            משתמשי אדמין ורכזים
          </NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2" className="text-right">
            חניכים
          </NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3" className="text-right">
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

import React, { Component } from "react";
import { Modal, ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import { Form, Button, Container } from "react-bootstrap";
import { ValidatorForm } from "react-form-validator-core";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class Register extends Component {
  state = {
    date: this.props.date,
    location: "",
    studyTime: 0,
    chavrutaTime: 0,
    casingTime: 0
  };

  handleUserTypeChange = val => {
    console.log(val);
  };

  render() {
    if (localStorage.getItem("beliba-homa-auth-token")) {
      alert("Access Denied");
      this.props.history.push("/");
    }
    return (
      <React.Fragment>
        <Container className="text-center mt-2">
          <ToggleButtonGroup
            type="radio"
            name="options"
            defaultValue={1}
            onChange={this.handleUserTypeChange}
          >
            <ToggleButton value={1}>אני חונך</ToggleButton>
            <ToggleButton value={2}>אני חניך</ToggleButton>
          </ToggleButtonGroup>
        </Container>
      </React.Fragment>
    );
  }
}

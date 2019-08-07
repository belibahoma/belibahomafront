import React, { Component } from "react";
import { Modal, ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import { Form, Button, Container } from "react-bootstrap";
import { ValidatorForm } from "react-form-validator-core";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TutorRegisterForm from "./TutorRegisterForm/TutorRegisterForm";
import TraineeRegisterForm from "./TraineeRegisterForm/TraineeRegisterForm";

export default class Register extends Component {
  state = {
    date: this.props.date,
    registerType: 2
  };

  handleUserTypeChange = val => {
    console.log(val);
    this.setState({ registerType: val });
  };

  chooseRegisterType = () => {
    return this.state.registerType == 1 ? (
      <TutorRegisterForm
        onSubmit={this.handleTutorSubmit}
        onCanceled={this.handleTutorCanceled}
      />
    ) : (
      <TraineeRegisterForm
        onSubmit={this.handleTraineeSubmit}
        onCanceled={this.handleTraineeCanceled}
      />
    );
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
            <ToggleButton value={1}>אני מתגבר</ToggleButton>
            <ToggleButton value={2}>אני סטודנט חרדי</ToggleButton>
          </ToggleButtonGroup>
          {this.chooseRegisterType()}
        </Container>
      </React.Fragment>
    );
  }
}

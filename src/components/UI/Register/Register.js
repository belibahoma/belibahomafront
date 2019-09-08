import React, { Component } from "react";
import { ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import { Container } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import TutorRegisterForm from "./TutorRegisterForm/TutorRegisterForm";
import TraineeRegisterForm from "./TraineeRegisterForm/TraineeRegisterForm";

export default class Register extends Component {
  state = {
    date: this.props.date,
    registerType: 0
  };

  handleUserTypeChange = val => {
    // console.log(val);
    this.setState({ registerType: val });
  };

  chooseRegisterType = () => {
    if (this.state.registerType === 1) {
      return (
        <TutorRegisterForm
          onSubmit={this.handleTutorSubmit}
          onCanceled={this.handleTutorCanceled}
        />
      );
    } else if (this.state.registerType === 2) {
      return (
        <TraineeRegisterForm
          onSubmit={this.handleTraineeSubmit}
          onCanceled={this.handleTraineeCanceled}
        />
      );
    } else return null;
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
            defaultValue={0}
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

import React, { Component } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { ValidatorForm } from "react-form-validator-core";
import DatePicker from "react-datepicker";
import TextValidator from "./../../../../Validators/TextValidator/TextValidator";
import "react-datepicker/dist/react-datepicker.css";

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export default class NormalAppointment extends Component {
  state = {
    date: this.props.date,
    location: "",
    studyTime: 0,
    chavrutaTime: 0,
    casingTime: 0
  };

  handleTimeChanged = newDate => {
    this.setState({ date: newDate });
  };
  handleLocationChange = event => {
    this.setState({ location: event.target.value });
  };
  handleStudyTimeChange = event => {
    this.setState({ studyTime: event.target.value });
  };
  handleChavrutaTimeChange = event => {
    this.setState({ chavrutaTime: event.target.value });
  };
  handleCasingTimeChange = event => {
    this.setState({ casingTime: event.target.value });
  };
  handleSubmit = val => {
    console.log("Submitted", val);
  };
  handleError = obj => {
    console.log(obj);
  };

  render() {
    console.log(this.state.date);
    return (
      <React.Fragment>
        <Container className="text-right">
          <Form
            as={ValidatorForm}
            onError={this.handleError}
            ref="form"
            onSubmit={this.handleSubmit}
          >
            <Form.Label>תאריך</Form.Label>
            <br />
            <DatePicker
              selected={this.state.date}
              onChange={this.handleTimeChanged}
              maxDate={addDays(this.state.date, 7)}
              minDate={this.state.date}
              showDisabledMonthNavigation
              onClickOutside
            />
            <br />
            <Form.Label>מקום מפגש</Form.Label>
            <Form.Control
              type="text"
              as={TextValidator}
              onChange={this.handleLocationChange}
              name="location"
              value={this.state.location}
              validators={[
                "required",
                "matchRegexp:[A-Za-z\u0590-\u05FF 0-9]{4,}"
              ]}
              errorMessages={[
                "שדה זה הינו חובה",
                "המקום חייב להכיל לפחות 4 תווים"
              ]}
            />
            <Form.Label>מספר שעות לימוד - כולל חברותא</Form.Label>
            <Form.Control
              type="text"
              as={TextValidator}
              onChange={this.handleStudyTimeChange}
              name="studyTime"
              value={this.state.studyTime}
              validators={["required", "matchRegexp:^([0-3](.[0-9])?|4)$"]}
              errorMessages={[
                "שדה זה הינו חובה",
                "לא ניתן לדווח על יותר מ4 שעות במפגש"
              ]}
            />
            <Form.Label>מספר שעות חברותא</Form.Label>
            <Form.Control
              type="text"
              as={TextValidator}
              onChange={this.handleChavrutaTimeChange}
              name="chavrutaTime"
              value={this.state.chavrutaTime}
              validators={["required", "matchRegexp:^((0.[1-9])?|1)$"]}
              errorMessages={[
                "שדה זה הינו חובה",
                "לא ניתן לדווח על יותר משעת חברותא במפגש"
              ]}
            />
            <Form.Label>שעות מעטפת</Form.Label>
            <Form.Control
              type="text"
              as={TextValidator}
              onChange={this.handleCasingTimeChange}
              name="casingTime"
              value={this.state.casingTime}
              validators={["isNumber"]}
            />
            <Form.Text className="text-muted">
              מילוי שדה זה מותנה באישור רכז
            </Form.Text>
            <Button className="mt-2" type="submit">
              submit
            </Button>
          </Form>
        </Container>
      </React.Fragment>
    );
  }
}

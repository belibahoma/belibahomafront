import React, { Component } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { ValidatorForm } from "react-form-validator-core";
import DatePicker from "react-date-picker";
import TextValidator from "./../../../../Validators/TextValidator/TextValidator";
import "react-datepicker/dist/react-datepicker.css";
import _ from "lodash";

export default class NormalAppointment extends Component {
  state = {
    isUpdate: this.props.isUpdate,
    date: this.props.date,
    location: "",
    reportTime: 0,
    description: ""
  };
  componentDidMount() {
    if (this.state.isUpdate) {
      this.setState({ ...this.props.formValues });
    }
  }
  handleDescriptionChanged = event => {
    this.setState({ description: event.target.value });
  };
  handleTimeChanged = newDate => {
    this.setState({ date: newDate });
  };
  handleLocationChanged = event => {
    this.setState({ location: event.target.value });
  };
  handleReportTimeChanged = event => {
    this.setState({ reportTime: event.target.value });
  };

  handleCancel = () => {
    this.props.onCancel();
  };

  render() {
    return (
      <React.Fragment>
        <Container className="text-right">
          <Form
            as={ValidatorForm}
            onError={this.props.onError}
            ref="form"
            onSubmit={() => {
              this.props.onSubmit(
                _.pick(this.state, [
                  "date",
                  "location",
                  "reportTime",
                  "description"
                ])
              );
            }}
          >
            <Form.Label dir="rtl">איך היה במפגש?</Form.Label>
            <Form.Control
              disabled={this.props.readOnly}
              dir="rtl"
              type="text"
              as={TextValidator}
              onChange={this.handleDescriptionChanged}
              name="description"
              value={this.state.description}
              validators={["required"]}
              errorMessages={["שדה זה הינו חובה"]}
            />
            <Form.Label>תאריך</Form.Label>
            <br />
            <DatePicker
              disabled={this.props.readOnly}
              value={new Date(this.state.date)}
              onChange={this.handleTimeChanged}
              format="dd/MM/yyyy"
              required
            />
            <br />
            <Form.Label dir="rtl">מקום מפגש</Form.Label>
            <Form.Control
              disabled={this.props.readOnly}
              dir="rtl"
              type="text"
              as={TextValidator}
              onChange={this.handleLocationChanged}
              name="location"
              value={this.state.location}
              validators={["required"]}
              errorMessages={["שדה זה הינו חובה"]}
            />
            <Form.Label dir="rtl">מספר שעות מפגש</Form.Label>
            <Form.Control
              disabled={this.props.readOnly}
              dir="rtl"
              type="text"
              as={TextValidator}
              onChange={this.handleReportTimeChanged}
              name="reportTime"
              value={this.state.reportTime}
              validators={["required"]}
              errorMessages={["שדה זה הינו חובה"]}
            />
            {!this.props.readOnly ? (
              <Button className="m-2" type="submit">
                {!this.props.isUpdate ? "הוסף מפגש" : "עדכן מפגש"}
              </Button>
            ) : null}
            <Button
              className="m-2 btn btn-danger"
              onClick={this.handleCancel}
              type="button"
            >
              {!this.props.readOnly ? "ביטול" : "סגור"}
            </Button>
          </Form>
        </Container>
      </React.Fragment>
    );
  }
}

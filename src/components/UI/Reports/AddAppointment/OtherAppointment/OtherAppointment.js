import React, { Component } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { ValidatorForm } from "react-form-validator-core";
import DatePicker from "react-date-picker";
import TextValidator from "./../../../../Validators/TextValidator/TextValidator";
import "react-datepicker/dist/react-datepicker.css";
import _ from "lodash";

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export default class OtherAppointment extends Component {
  state = {
    isUpdate: this.props.isUpdate,
    date: this.props.date,
    location: "",
    reportTime: 0,
    description: "",
    spacialMissions: false,
    isNotHappened: false,
    isHappened: true,
    isServe: false,
    isBirth: false,
    isMarriage: false,
    isDeathOfFirstDegree: false,
    serveTime: { start: Date.now(), end: Date.now() }
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

  handleServeEndChanged = value => {
    console.log(value);

    this.setState({
      serveTime: {
        start: new Date(this.state.serveTime.start),
        end: new Date(value)
      }
    });
  };
  handleServeStartChanged = value => {
    console.log(value);

    this.setState({
      serveTime: {
        end: new Date(this.state.serveTime.end),
        start: new Date(value)
      }
    });
  };

  handleCancel = () => {
    this.props.onCancel();
  };

  showImpactValues = () => {
    if (this.props.isImpact || true) {
      return (
        <React.Fragment>
          <Form.Group className="align-content-center" dir="ltr">
            <Form.Check
              label="?מילואים"
              onChange={() => {
                this.setState({
                  isServe: !this.state.isServe
                });
              }}
              value={this.state.isServe}
            />
          </Form.Group>
          {this.state.isServe ? (
            <React.Fragment>
              <Form.Label dir="rtl">תאריך התחלה</Form.Label>
              <br />
              <DatePicker
                value={new Date(this.state.serveTime.start)}
                onChange={this.handleServeStartChanged}
                format="dd/MM/yyyy"
                required
              />
              <br />
              <Form.Label dir="rtl">תאריך סיום</Form.Label>
              <br />
              <DatePicker
                value={new Date(this.state.serveTime.end)}
                onChange={this.handleServeEndChanged}
                format="dd/MM/yyyy"
                required
              />
              <br />
            </React.Fragment>
          ) : null}
          <Form.Group className="align-content-center" dir="ltr">
            <Form.Check
              label="?לידת ילד"
              onChange={() => {
                this.setState({
                  isBirth: !this.state.isBirth
                });
              }}
              value={this.state.isBirth}
            />
          </Form.Group>
          <Form.Group className="align-content-center" dir="ltr">
            <Form.Check
              label="?חתונה"
              onChange={() => {
                this.setState({
                  isMarriage: !this.state.isMarriage
                });
              }}
              value={this.state.isMarriage}
            />
          </Form.Group>
          <Form.Group className="align-content-center" dir="ltr">
            <Form.Check
              label="?פטירת קרוב מדרגה ראשונה"
              onChange={() => {
                this.setState({
                  isDeathOfFirstDegree: !this.state.isDeathOfFirstDegree
                });
              }}
              value={this.state.isDeathOfFirstDegree}
            />
          </Form.Group>
        </React.Fragment>
      );
    }
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
                _.omit(this.state, ["isNotHappened", "isUpdate"])
              );
            }}
          >
            <Form.Text>
              עבור מילוי של כל אחד מהסעיפים הבאים חובה לקבל אישור מרכז
            </Form.Text>
            <Form.Label>תאריך</Form.Label>
            <br />
            <DatePicker
              value={new Date(this.state.date)}
              onChange={this.handleTimeChanged}
              format="dd/MM/yyyy"
              required
            />
            <br />
            {!(
              this.state.isServe ||
              this.state.isBirth ||
              this.state.isMarriage ||
              this.state.isDeathOfFirstDegree
            ) ? (
              <React.Fragment>
                <Form.Group className="align-content-center" dir="ltr">
                  <Form.Check
                    label="?משימה מיוחדת מהרכז"
                    onChange={() => {
                      this.setState({
                        spacialMissions: !this.state.spacialMissions
                      });
                    }}
                    value={this.state.spacialMissions}
                  />
                </Form.Group>
                {this.state.spacialMissions ? (
                  <React.Fragment>
                    <Form.Label dir="rtl">הסבר</Form.Label>
                    <Form.Control
                      dir="rtl"
                      type="text"
                      as={TextValidator}
                      onChange={this.handleDescriptionChanged}
                      name="description"
                      value={this.state.description}
                      validators={["required"]}
                      errorMessages={["שדה זה הינו חובה"]}
                    />
                  </React.Fragment>
                ) : null}
                <Form.Group className="align-content-center" dir="ltr">
                  <Form.Check
                    label="?מפגש שלא התקיים"
                    onChange={() => {
                      this.setState({
                        isNotHappened: !this.state.isNotHappened,
                        isHappened: !this.state.isHappened
                      });
                    }}
                    value={this.state.isNotHappened}
                  />
                </Form.Group>
                <Form.Label dir="rtl">מספר שעות</Form.Label>
                <Form.Control
                  dir="rtl"
                  type="text"
                  as={TextValidator}
                  onChange={this.handleReportTimeChanged}
                  name="reportTime"
                  value={this.state.reportTime}
                  validators={["required"]}
                  errorMessages={["שדה זה הינו חובה"]}
                />
              </React.Fragment>
            ) : null}
            {this.showImpactValues()}
            <Button className="m-2" type="submit">
              הוסף מפגש
            </Button>
            <Button
              className="m-2 btn btn-danger"
              onClick={this.handleCancel}
              type="button"
            >
              ביטול
            </Button>
          </Form>
        </Container>
      </React.Fragment>
    );
  }
}

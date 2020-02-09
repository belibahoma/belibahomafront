import React, { Component } from "react";
import { Form, Button, Container, Row } from "react-bootstrap";
import { ValidatorForm } from "react-form-validator-core";
import DatePicker from "react-date-picker";
import TextValidator from "./../../../../Validators/TextValidator/TextValidator";
import TimePicker from 'react-time-picker';
import "react-datepicker/dist/react-datepicker.css";
import _ from "lodash";

export default class NormalAppointment extends Component {
  state = {
    isUpdate: this.props.isUpdate,
    date: this.props.date,
    from: '',
    to: '',
    location: "",
    studyTime: 0,
    chavrutaTime: 0,
    casingTime: 0,
    description: "",
    knowledgeRank: 1,
    connectionRank: 1,
    isNeedAdmin: false,
    isHappened: false
  };
  componentDidMount() {
    if (this.state.isUpdate) {
      this.setState({ ...this.props.formValues });
    }
  }
  handleDescriptionChanged = event => {
    this.setState({ description: event.target.value });
  };
  handleKnowledgeRankChanged = event => {
    this.setState({ knowledgeRank: event.target.value });
  };
  handleConnectionRankChanged = event => {
    this.setState({ connectionRank: event.target.value });
  };
  handleIsNeedAdminChanged = event => {
    this.setState({ isNeedAdmin: !this.state.isNeedAdmin });
  };
  handleIsHappenedChanged = event => {
    this.setState({ isHappened: !this.state.isNeedAdmin });
  };
  handleTimeChanged = newDate => {
    this.setState({ date: newDate });
  };
  handleLocationChanged = event => {
    this.setState({ location: event.target.value });
  };
  handleStudyTimeChanged = event => {
    this.setState({ studyTime: event.target.value });
  };
  handleChavrutaTimeChanged = event => {
    this.setState({ chavrutaTime: event.target.value });
  };
  handleCasingTimeChanged = event => {
    this.setState({ casingTime: event.target.value });
  };
  handleFromTime = from => {
    this.setState({ from })
  };
  handleToTime = to => {
    this.setState({ to })
  };
  handleSubmit = val => {
    // console.log("Submitted", val);
  };
  handleError = obj => {
    console.log(obj);
  };
  handleCancel = () => {
    this.props.onCancel();
  };

  addOptions = () => {
    let options = [];
    for (let index = 1; index < 11; index++) {
      options.push(
        <option key={index} value={index}>
          {index}
        </option>
      );
    }

    return options;
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
                  "from",
                  "to",
                  "location",
                  "studyTime",
                  "chavrutaTime",
                  "casingTime",
                  "description",
                  "knowledgeRank",
                  "connectionRank",
                  "isNeedAdmin",
                  "isHappened"
                ])
              );
            }}
          >
            <Form.Label dir="rtl">איך היה בקשר הלמידה?</Form.Label>
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
            <Form.Check
              disabled={this.props.readOnly}
              dir="ltr"
              className="my-2"
              type="checkbox"
              label="?האם המפגש התקיים כסדרו"
              onChange={this.handleIsHappenedChanged}
              checked={this.state.isHappened}
            />
            <Form.Label dir="rtl">
              עד כמה אני מרגיש שאני יודע לענות על צרכיו של הסטודנט?
            </Form.Label>
            <Form.Control
              disabled={this.props.readOnly}
              as="select"
              className="mb-2"
              dir="rtl"
              onChange={this.handleKnowledgeRankChanged}
              name="knowledgeRank"
              value={this.state.knowledgeRank}
            >
              {this.addOptions()}
            </Form.Control>
            <Form.Label dir="rtl">כמה טוב הקשר ביני לבין הסטודנט?</Form.Label>
            <Form.Control
              disabled={this.props.readOnly}
              as="select"
              className="mb-2"
              dir="rtl"
              onChange={this.handleConnectionRankChanged}
              name="connectionRank"
              value={this.state.connectionRank}
            >
              {this.addOptions()}
            </Form.Control>
            <Form.Check
              disabled={this.props.readOnly}
              dir="ltr"
              className="my-2"
              type="checkbox"
              label="?צריך התערבות מנהל"
              onChange={this.handleIsNeedAdminChanged}
              checked={this.state.isNeedAdmin}
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
            <Form.Label dir="rtl">מספר שעות סיוע אקדמי</Form.Label>
            <Form.Control
              disabled={this.props.readOnly}
              dir="rtl"
              type="text"
              as={TextValidator}
              onChange={this.handleStudyTimeChanged}
              name="studyTime"
              value={this.state.studyTime}
              validators={["required"]}
              errorMessages={["שדה זה הינו חובה"]}
            />
            <Row  dir="rtl">משעה:<Form.Label></Form.Label></Row>
            <br />
            <TimePicker onChange={this.handleFromTime} value={this.state.from} maxDetail="minute" locale="he" required/>
            <br />
            <Row  dir="rtl">עד שעה:<Form.Label></Form.Label></Row>
            <br />
            <TimePicker onChange={this.handleToTime} value={this.state.to} maxDetail="minute" locale="he"required/>
            <br />

            <Form.Label dir="rtl">מספר שעות חברותא</Form.Label>
            <Form.Control
              disabled={this.props.readOnly}
              dir="rtl"
              type="text"
              as={TextValidator}
              onChange={this.handleChavrutaTimeChanged}
              name="chavrutaTime"
              value={this.state.chavrutaTime}
              validators={["required"]}
              errorMessages={["שדה זה הינו חובה"]}
            />
            <Form.Label dir="rtl">שעות מעטפת</Form.Label>
            <Form.Control
              disabled={this.props.readOnly}
              dir="rtl"
              type="text"
              as={TextValidator}
              onChange={this.handleCasingTimeChanged}
              name="casingTime"
              value={this.state.casingTime}
              validators={["isNumber"]}
            />
            <Form.Text className="text-muted">
              מילוי שדה זה מותנה באישור רכז
            </Form.Text>
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

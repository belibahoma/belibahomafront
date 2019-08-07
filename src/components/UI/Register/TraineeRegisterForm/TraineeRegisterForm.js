import React, { Component } from "react";
import { Form, Button, Container, Spinner, Col } from "react-bootstrap";
import TextValidator from "../../../Validators/TextValidator/TextValidator";
import { ValidatorForm } from "react-form-validator-core";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DynamicSelectBox from "./../../../../containers/DynamicSelectBox/DynamicSelectBox";
import config from "react-global-configuration";

export default class TraineeRegisterForm extends Component {
  state = {
    isAdditionalStudyPath: false,
    id: "",
    fname: "",
    lname: "",
    email: "",
    password: "",
    phoneA: "",
    phoneB: "",
    birthDate: Date.now(),
    gender: "",
    maritalStatus: "",
    activityArea: "",
    institute: "",
    mainStudy: "",
    secondaryStudy: "",
    academicPlan: "",
    studyYear: "",
    bankAccount: {
      bankName: "",
      branchNumber: "",
      accountNumber: ""
    },
    realAddress: {
      street: "",
      city: "",
      neighborhood: ""
    },
    currentAddress: {
      street: "",
      city: "",
      neighborhood: ""
    },
    religiousStatus: "",
    religiousText: "",
    unavailableTimes: [{ day: 0, Time: { start: Date, end: Date } }],
    notes: "",
    stuffNotes: "",
    isNeedAdditionalRelation: false,
    activeStatus: "",
    isFinnishPreparatory: false,
    isGraduated: false,
    isFoundJob: false,
    isJobInStudyFelid: false,
    // until here is the common part
    isInMagid: false,
    isLiveInSelectedCities: false,
    isRegisteredToKivun: false,
    needsHelpIn: "",
    workStatus: "",
    workTitle: "",
    isLearnedInYeshiva: false,
    yeshivaTimes: "",
    isHaveAnotherProfessionalTraining: false,
    previousProfession: "",
    isHaveAnotherDegree: false,
    previousDegree: "",
    WantDetailsAbout: {
      personalTraining: false,
      jobSeeking: false,
      professionalTraining: false,
      englishCourse: false,
      computerCourse: false,
      studyDiagnostics: false,
      selfAdvanceProgram: false,
      entrepreneurship: false,
      shortTermPreparatory: false
    },
    isServed: false,
    mathLevel: 0,
    englishLevel: 0,
    physicsLevel: 0,
    additionalTopics: "",
    isActive: false,
    leavingReason: "",
    isDropped: false
  };

  handleIdChanged = event => {};
  handleFnameChanged = event => {};
  handleLnameChanged = event => {};
  handleEmailChanged = event => {};
  handlePasswordChanged = event => {};
  handlePhoneAChanged = event => {};
  handlePhoneBChanged = event => {};
  handleBirthDateChanged = event => {};
  handleGenderChanged = event => {};
  handleMaritalStatusChanged = event => {};
  handleActivityAreaChanged = event => {};
  handleInstituteChanged = event => {};
  handleMainStudyChanged = event => {};
  handleSecondaryStudyChanged = event => {};
  handleAcademicPlanChanged = event => {};
  handleStudyYearChanged = event => {};
  handleBankAccountChanged = event => {};
  handleBankNameChanged = event => {};
  handleBranchNumberChanged = event => {};
  handleAccountNumberChanged = event => {};
  handleRealAddressChanged = event => {};
  handleStreetChanged = event => {};
  handleCityChanged = event => {};
  handleNeighborhoodChanged = event => {};
  handleCurrentAddressChanged = event => {};
  handleStreetChanged = event => {};
  handleCityChanged = event => {};
  handleNeighborhoodChanged = event => {};
  handleReligiousStatusChanged = event => {};
  handleReligiousTextChanged = event => {};
  handleUnavailableTimesChanged = event => {};
  handleNotesChanged = event => {};
  handleStuffNotesChanged = event => {};
  handleIsNeedAdditionalRelationChanged = event => {};
  handleActiveStatusChanged = event => {};
  handleIsFinnishPreparatoryChanged = event => {};
  handleIsGraduatedChanged = event => {};
  handleIsFoundJobChanged = event => {};
  handleIsJobInStudyFelidChanged = event => {};
  handleIsInMagidChanged = event => {};
  handleIsLiveInSelectedCitiesChanged = event => {};
  handleIsRegisteredToKivunChanged = event => {};
  handleNeedsHelpInChanged = event => {};
  handleWorkStatusChanged = event => {};
  handleWorkTitleChanged = event => {};
  handleIsLearnedInYeshivaChanged = event => {};
  handleYeshivaTimesChanged = event => {};
  handleIsHaveAnotherProfessionalTrainingChanged = event => {};
  handlePreviousProfessionChanged = event => {};
  handleIsHaveAnotherDegreeChanged = event => {};
  handlePreviousDegreeChanged = event => {};
  handleWantDetailsAboutChanged = event => {};
  handlePersonalTrainingChanged = event => {};
  handleJobSeekingChanged = event => {};
  handleProfessionalTrainingChanged = event => {};
  handleEnglishCourseChanged = event => {};
  handleComputerCourseChanged = event => {};
  handleStudyDiagnosticsChanged = event => {};
  handleSelfAdvanceProgramChanged = event => {};
  handleEntrepreneurshipChanged = event => {};
  handleShortTermPreparatoryChanged = event => {};
  handleIsServedChanged = event => {};
  handleMathLevelChanged = event => {};
  handleEnglishLevelChanged = event => {};
  handlePhysicsLevelChanged = event => {};
  handleAdditionalTopicsChanged = event => {};
  handleIsActiveChanged = event => {};
  handleLeavingReasonChanged = event => {};
  handleIsDroppedChanged = event => {};

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
        <Container className="text-right m-2">
          <Form
            as={ValidatorForm}
            onError={this.handleError}
            ref="form"
            onSubmit={this.handleSubmit}
          >
            <Form.Label>
              מספר תעודת זהות כולל אפסים - ישמש כשם המשתמש בכניסות הבאות לאתר
            </Form.Label>
            <Form.Control
              className="mb-2"
              type="text"
              as={TextValidator}
              onChange={this.handleIdChanged}
              name="id"
              value={this.state.id}
              validators={["required", "matchRegexp:[d]{9}"]}
              errorMessages={["שדה זה הינו חובה", " חייב להכיל 9 מספרים"]}
            />
            <Form.Label>שם פרטי</Form.Label>
            <Form.Control
              type="text"
              as={TextValidator}
              className="mb-2"
              onChange={this.handleLnameChanged}
              name="lname"
              value={this.state.lname}
              validators={["required"]}
              errorMessages={["שדה זה הינו חובה"]}
            />
            <Form.Label>שם משפחה</Form.Label>
            <Form.Control
              type="text"
              as={TextValidator}
              className="mb-2"
              onChange={this.handleFnameChanged}
              name="fname"
              value={this.state.fname}
              validators={["required"]}
              errorMessages={["שדה זה הינו חובה"]}
            />
            <Form.Label>סיסמא</Form.Label>
            <Form.Control
              type="password"
              as={TextValidator}
              className="mb-2"
              onChange={this.handlePasswordChanged}
              name="password"
              value={this.state.password}
              validators={["required"]}
              errorMessages={["שדה זה הינו חובה"]}
            />
            <Form.Label>מספר טלפון ראשי</Form.Label>
            <Form.Control
              type="text"
              as={TextValidator}
              className="mb-2"
              onChange={this.handlePhoneAChanged}
              name="phoneA"
              value={this.state.phoneA}
              validators={["required", "matchRegexp:[d]{9,0}"]}
              errorMessages={["שדה זה הינו חובה", "נא להכניס ספרות בלבד"]}
            />
            <Form.Label>מספר טלפון משני</Form.Label>
            <Form.Control
              type="text"
              as={TextValidator}
              className="mb-2"
              onChange={this.handlePhoneBChanged}
              name="phoneB"
              value={this.state.phoneB}
            />
            <Form.Label>כתובת אימייל</Form.Label>
            <Form.Control
              type="email"
              as={TextValidator}
              className="mb-2"
              onChange={this.handleEmailChanged}
              name="email"
              value={this.state.email}
              validators={["required", "isEmail"]}
              errorMessages={["שדה זה הינו חובה", "נא הכנס כתובת מייל תקנית"]}
            />
            <Form.Label>תאריך לידה</Form.Label>
            <br />
            <DatePicker
              selected={this.state.date}
              onChange={this.handleBirthDateChanged}
            />
            <br />
            <Form.Label>מגדר</Form.Label>
            <Form.Control
              as="select"
              className="mb-2"
              dir="rtl"
              onChange={event => {
                alert(event.target.value);
                this.handleGenderChanged(event);
              }}
              name="gender"
              value={this.state.gender}
            >
              <option value="זכר">זכר</option>
              <option value="נקבה">נקבה</option>
            </Form.Control>
            <Form.Label>מצב משפחתי</Form.Label>
            <Form.Control
              as="select"
              className="mb-2"
              dir="rtl"
              onChange={this.handleMaritalStatusChanged}
              name="maritalStatus"
              value={this.state.maritalStatus}
            >
              <option value="נשוי">נשוי</option>
              <option value="רווק">רווק</option>
              <option value="גרוש">גרוש</option>
              <option value="אלמן">אלמן</option>
              <option value="אחר">אחר</option>
            </Form.Control>
            <Form.Label>איזור פעילות</Form.Label>
            <Form.Control
              as={DynamicSelectBox}
              className="mb-2"
              dir="rtl"
              onChange={this.handleActivityAreaChanged}
              name="activityArea"
              fetchLink={`${config.get("serverAddress")}/api/areas`}
            />
            <Form.Label>מוסד לימודים</Form.Label>
            <Form.Control
              as={DynamicSelectBox}
              className="mb-2"
              dir="rtl"
              onChange={this.handleInstituteChanged}
              name="institute"
              fetchLink={`${config.get("serverAddress")}/api/institutes`}
            />
            <Form.Label>מסלול לימודים ראשי</Form.Label>
            <Form.Control
              as={DynamicSelectBox}
              className="mb-2"
              dir="rtl"
              onChange={this.handleMainStudyChanged}
              name="mainStudy"
              fetchLink={`${config.get("serverAddress")}/api/academicDetails`}
            />
            <Form.Check
              className="my-2"
              type="checkbox"
              label="?קיים מסלול לימודים נוסף"
              onChange={() => {
                this.setState({
                  isAdditionalStudyPath: !this.state.isAdditionalStudyPath
                });
              }}
            />
            {this.state.isAdditionalStudyPath ? (
              <React.Fragment>
                <Form.Label>מסלול לימודים משני</Form.Label>
                <Form.Control
                  as={DynamicSelectBox}
                  className="mb-2"
                  dir="rtl"
                  onChange={this.handleSecondaryStudyChanged}
                  name="secondaryStudy"
                  fetchLink={`${config.get(
                    "serverAddress"
                  )}/api/academicDetails`}
                />
              </React.Fragment>
            ) : null}
            <Form.Label>מספר שעות לימוד - כולל חברותא</Form.Label>
            <Form.Control
              type="text"
              as={TextValidator}
              onChange={this.handleStudyTimeChange}
              className="mb-2"
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

import React, { Component } from "react";
import {
  Form,
  Button,
  Container,
  Spinner,
  Col,
  Jumbotron,
  Modal
} from "react-bootstrap";
import TextValidator from "../../../Validators/TextValidator/TextValidator";
import { ValidatorForm } from "react-form-validator-core";
import TimePicker from "react-time-picker";
import DatePicker from "react-date-picker";
import DynamicSelectBox from "./../../../../containers/DynamicSelectBox/DynamicSelectBox";
import config from "react-global-configuration";
import _ from "lodash";
import axios from "axios";
import { withRouter } from "react-router-dom";

class TutorRegisterForm extends Component {
  state = {
    isAdditionalStudyPath: false,
    isLoading: false,
    spinnerColor: "primary",
    id: "",
    fname: "",
    lname: "",
    email: "",
    password: "",
    phoneA: "",
    phoneB: "",
    birthDate: Date.now(),
    gender: "N/A",
    maritalStatus: "N/A",
    activityArea: "N/A",
    institute: "N/A",
    mainStudy: "N/A",
    secondaryStudy: "",
    academicPlan: "N/A",
    studyYear: "1",
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
    religiousStatus: "N/A",
    religiousText: "",
    unavailableTimes: [
      { day: 1, Time: { start: Date.now(), end: Date.now() } }
    ],
    notes: "",
    stuffNotes: "",
    isNeedAdditionalRelation: false,
    activeStatus: "active",
    isFinnishPreparatory: false,
    isGraduated: false,
    isFoundJob: false,
    isJobInStudyFelid: false,
    // until here is the common part
    isImpact: false,
    isShachak: false,
    isForAcademicPoints: false,
    isCityScholarship: false,
    mathLevel: "N/A",
    englishLevel: "N/A",
    physicsLevel: "N/A",
    additionalTopics: "",
    isActive: false
  };

  componentDidMount() {
    let colors = [
      "primary",
      "secondary",
      "success",
      "danger",
      "warning",
      "info",
      "dark"
    ];
    let i = 1;
    setInterval(() => {
      this.setState({ spinnerColor: colors[i++ % 7] });
    }, 1000);
  }

  check = () => {
    // console.log(JSON.stringify(_.omit({ ...this.state }, ["isLoading"])));
  };

  handleSubmit = val => {
    if (
      [
        "activityArea",
        "institute",
        "mainStudy",
        "gender",
        "maritalStatus",
        "academicPlan",
        "religiousStatus",
        "workStatus",
        "mathLevel",
        "physicsLevel",
        "englishLevel"
      ].filter(val => {
        return (
          this.state[val] === "N/A" ||
          this.state[val] === "loading" ||
          this.state[val] === "error"
        );
      }).length >= 1
    ) {
      alert("נא למלא את כל השדות");
    } else {
      this.showLoadingModal();
      let dataToPost = _.omit({ ...this.state }, [
        "isAdditionalStudyPath",
        "isLoading",
        "spinnerColor"
      ]);
      //   dataToPost = JSON.stringify(dataToPost);
      console.log(dataToPost);
      axios
        .post(`${config.get("serverAddress")}/api/tutors`, dataToPost)
        .then(res => {
          clearInterval();
          alert("המידע נשלח בהצלחה, אנא המתן לאישור מנהל. תודה");
          this.setState({ isLoading: false });
          this.props.history.push("/");
        })
        .catch(err => {
          alert(`${err.message} +"  "+ ${err.response.data}`);
          this.setState({ isLoading: false });
        });
    }
  };

  showLoadingModal = () => {
    this.setState({ isLoading: true });
  };

  getModal = () => {
    return (
      <Modal onHide={() => {}} show={this.state.isLoading}>
        <Modal.Body className="text-center">
          <h4 dir="rtl">טוען...</h4>
          <Spinner
            animation="border"
            size="lg"
            variant={this.state.spinnerColor}
          />
        </Modal.Body>
      </Modal>
    );
  };

  handleError = obj => {
    console.log(obj);
  };

  handleIdChanged = event => {
    this.setState({ id: event.target.value });
  };
  handleFnameChanged = event => {
    this.setState({ fname: event.target.value });
  };
  handleLnameChanged = event => {
    this.setState({ lname: event.target.value });
  };
  handleEmailChanged = event => {
    this.setState({ email: event.target.value });
  };
  handlePasswordChanged = event => {
    this.setState({ password: event.target.value });
  };
  handlePhoneAChanged = event => {
    this.setState({ phoneA: event.target.value });
  };
  handlePhoneBChanged = event => {
    this.setState({ phoneB: event.target.value });
  };
  handleBirthDateChanged = value => {
    this.setState({ birthDate: value });
  };
  handleGenderChanged = event => {
    this.setState({ gender: event.target.value });
  };

  handleMaritalStatusChanged = event => {
    this.setState({ maritalStatus: event.target.value });
  };
  handleActivityAreaChanged = event => {
    this.setState({ activityArea: event.target.value });
  };
  handleInstituteChanged = event => {
    this.setState({ institute: event.target.value });
  };
  handleMainStudyChanged = event => {
    this.setState({ mainStudy: event.target.value });
  };
  handleSecondaryStudyChanged = event => {
    this.setState({ secondaryStudy: event.target.value });
  };
  handleAcademicPlanChanged = event => {
    this.setState({ academicPlan: event.target.value });
  };
  handleStudyYearChanged = event => {
    this.setState({ studyYear: event.target.value });
  };
  handleBankAccountChanged = (event, str) => {
    let tmpAccount = _.cloneDeep(this.state.bankAccount);
    tmpAccount[str] = event.target.value;
    this.setState({ bankAccount: tmpAccount });
  };
  handleBankNameChanged = event => {
    this.setState({ bankName: event.target.value });
  };
  handleBranchNumberChanged = event => {
    this.setState({ branchNumber: event.target.value });
  };
  handleAccountNumberChanged = event => {
    this.setState({ accountNumber: event.target.value });
  };
  handleRealAddressChanged = (event, str) => {
    let tmpAddress = _.cloneDeep(this.state.realAddress);
    tmpAddress[str] = event.target.value;
    this.setState({ realAddress: tmpAddress });
  };

  handleCurrentAddressChanged = (event, str) => {
    let tmpAddress = _.cloneDeep(this.state.currentAddress);
    tmpAddress[str] = event.target.value;
    this.setState({ currentAddress: tmpAddress });
  };
  handleReligiousStatusChanged = event => {
    this.setState({ religiousStatus: event.target.value });
  };
  handleReligiousTextChanged = event => {
    this.setState({ religiousText: event.target.value });
  };

  addUnavailableTime = () => {
    let tmpArr = _.cloneDeep(this.state.unavailableTimes);
    tmpArr.push({ day: 1, Time: { start: Date.now(), end: Date.now() } });
    this.setState({ unavailableTimes: tmpArr });
  };

  handleUnavailableTimesChanged = (event, index, type) => {
    let tmpUnavailableTimes = _.cloneDeep(this.state.unavailableTimes);
    let valueToChange = tmpUnavailableTimes[index];
    const newVal = event;
    switch (type) {
      case "day":
        valueToChange = {
          day: newVal.target.value,
          Time: valueToChange.Time
        };
        tmpUnavailableTimes[index] = valueToChange;
        break;
      case "start":
        valueToChange = {
          Time: {
            start: new Date("01/01/2007 " + newVal),
            end: valueToChange.Time.end
          },
          day: valueToChange.day
        };
        tmpUnavailableTimes[index] = valueToChange;
        break;
      case "end":
        valueToChange = {
          Time: {
            start: valueToChange.Time.start,
            end: new Date("01/01/2007 " + newVal)
          },
          day: valueToChange.day
        };
        tmpUnavailableTimes[index] = valueToChange;
        break;
      case "remove":
        tmpUnavailableTimes = tmpUnavailableTimes.filter((val, i) => {
          return i !== index;
        });
        break;
      default:
        break;
    }
    this.setState({ unavailableTimes: tmpUnavailableTimes });
  };
  handleNotesChanged = event => {
    this.setState({ notes: event.target.value });
  };
  handleStuffNotesChanged = event => {
    this.setState({ stuffNotes: event.target.value });
  };
  handleIsNeedAdditionalRelationChanged = event => {
    this.setState({ isNeedAdditionalRelation: event.target.value });
  };
  handleActiveStatusChanged = event => {
    this.setState({ activeStatus: event.target.value });
  };
  handleIsFinnishPreparatoryChanged = event => {
    this.setState({ isFinnishPreparatory: event.target.value });
  };
  handleIsGraduatedChanged = event => {
    this.setState({ isGraduated: event.target.value });
  };
  handleIsFoundJobChanged = event => {
    this.setState({ isFoundJob: event.target.value });
  };
  handleIsJobInStudyFelidChanged = event => {
    this.setState({ isJobInStudyFelid: event.target.value });
  };
  handleIsImpactChanged = event => {
    this.setState({ isImpact: !this.state.isImpact });
  };
  handleIsShachakChanged = event => {
    this.setState({ isShachak: !this.state.isShachak });
  };
  handleIsForAcademicPointsChanged = event => {
    this.setState({ isForAcademicPoints: !this.state.isForAcademicPoints });
  };
  handleIsCityScholarshipChanged = event => {
    this.setState({ isCityScholarship: !this.state.isCityScholarship });
  };
  handleAdditionalTopicsChanged = event => {
    this.setState({ additionalTopics: event.target.value });
  };
  handleIsActiveChanged = event => {
    this.setState({ isActive: !this.state.isActive });
  };
  handleMathLevelChanged = event => {
    this.setState({ mathLevel: event.target.value });
  };
  handleEnglishLevelChanged = event => {
    this.setState({ englishLevel: event.target.value });
  };
  handlePhysicsLevelChanged = event => {
    this.setState({ physicsLevel: event.target.value });
  };

  unavailableTimesForm = () => {
    return this.state.unavailableTimes.map((obj, index) => {
      return (
        <React.Fragment key={index}>
          <Form.Row dir="rtl">
            <Form.Group as={Col}>
              <Form.Label>אנא בחר יום</Form.Label>
              <Form.Control
                as="select"
                className="mb-2"
                dir="rtl"
                onChange={event => {
                  this.handleUnavailableTimesChanged(event, index, "day");
                }}
                name={"unavailableTimes" + index}
                value={this.state.unavailableTimes[index].day}
              >
                <option value="1">ראשון</option>
                <option value="2">שני</option>
                <option value="3">שלישי</option>
                <option value="4">רביעי</option>
                <option value="5">חמישי</option>
                <option value="6">שישי</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} className="mx-2  text-center" dir="ltr">
              <Form.Label>אנא בחר שעת התחלה</Form.Label>
              <br />
              <TimePicker
                className="mt-1"
                name={`start${index}`}
                selected={this.state.unavailableTimes[index].Time.start}
                onChange={event => {
                  this.handleUnavailableTimesChanged(event, index, "start");
                }}
                disableClock={true}
              />
              <br />
            </Form.Group>
            <Form.Group as={Col} className="mx-2 text-center" dir="ltr">
              <Form.Label>אנא בחר שעת סיום</Form.Label>
              <br />
              <TimePicker
                name={`end${index}`}
                className="mt-1"
                selected={this.state.unavailableTimes[index].Time.end}
                onChange={event => {
                  this.handleUnavailableTimesChanged(event, index, "end");
                }}
                disableClock={true}
              />
              <br />
            </Form.Group>
          </Form.Row>
          <Form.Group as={Col} className="text-right align-content-center">
            <Button
              className="btn btn-danger"
              onClick={() =>
                this.handleUnavailableTimesChanged(null, index, "remove")
              }
            >
              מחק זמן
            </Button>
          </Form.Group>
        </React.Fragment>
      );
    });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.isLoading ? this.getModal() : null}
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
              dir="rtl"
              className="mb-2"
              type="text"
              as={TextValidator}
              onChange={this.handleIdChanged}
              name="id"
              value={this.state.id}
              validators={[
                "required",
                "isNumber",
                "minStringLength:9",
                "maxStringLength:9"
              ]}
              errorMessages={[
                "שדה זה הינו חובה",
                "מכיל מספרים בלבד",
                "צריך להכיל לפחות 9 ספרות",
                "צריך להכיל לכל היותר 9 ספרות"
              ]}
            />
            <Form.Label>שם פרטי</Form.Label>
            <Form.Control
              dir="rtl"
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
              dir="rtl"
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
              dir="rtl"
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
              dir="rtl"
              type="text"
              as={TextValidator}
              className="mb-2"
              onChange={this.handlePhoneAChanged}
              name="phoneA"
              value={this.state.phoneA}
              validators={[
                "required",
                "isNumber",
                "minStringLength:9",
                "maxStringLength:10"
              ]}
              errorMessages={[
                "שדה זה הינו חובה",
                "נא להכניס ספרות בלבד",
                "צריך להכיל לפחות 9 ספרות",
                "צריך להכיל מקסימום 10 ספרות"
              ]}
            />
            <Form.Label>מספר טלפון משני</Form.Label>
            <Form.Control
              dir="rtl"
              type="text"
              as={TextValidator}
              className="mb-2"
              onChange={this.handlePhoneBChanged}
              name="phoneB"
              value={this.state.phoneB}
            />
            <Form.Label>כתובת אימייל</Form.Label>
            <Form.Control
              dir="rtl"
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
              value={new Date(this.state.birthDate)}
              onChange={this.handleBirthDateChanged}
              required
            />
            <br />
            <Form.Label>מגדר</Form.Label>
            <Form.Control
              as="select"
              className="mb-2"
              dir="rtl"
              onChange={this.handleGenderChanged}
              name="gender"
              value={this.state.gender}
            >
              <option value="N/A">N/A</option>
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
              <option value="N/A">N/A</option>
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
              value={this.state.activityArea}
              onChange={this.handleActivityAreaChanged}
              name="activityArea"
              fetchLink={`${config.get("serverAddress")}/api/areas`}
            />
            <Form.Label>מוסד לימודים</Form.Label>
            <Form.Control
              as={DynamicSelectBox}
              className="mb-2"
              dir="rtl"
              value={this.state.institute}
              onChange={this.handleInstituteChanged}
              name="institute"
              fetchLink={`${config.get("serverAddress")}/api/institutes`}
            />
            <Form.Label>מסלול לימודים ראשי</Form.Label>
            <Form.Control
              as={DynamicSelectBox}
              className="mb-2"
              value={this.state.mainStudy}
              dir="rtl"
              onChange={this.handleMainStudyChanged}
              name="mainStudy"
              fetchLink={`${config.get("serverAddress")}/api/academicDetails`}
            />
            <Form.Check
              className="my-2"
              type="checkbox"
              label="קיים מסלול לימודים נוסף?"
              onChange={() => {
                this.setState({
                  isAdditionalStudyPath: !this.state.isAdditionalStudyPath
                });
                if (this.state.isAdditionalStudyPath) {
                  this.setState({ secondaryStudy: "" });
                }
              }}
            />
            {this.state.isAdditionalStudyPath ? (
              <React.Fragment>
                <Form.Label>מסלול לימודים משני</Form.Label>
                <Form.Control
                  as={DynamicSelectBox}
                  className="mb-2"
                  dir="rtl"
                  value={this.state.secondaryStudy}
                  onChange={this.handleSecondaryStudyChanged}
                  name="secondaryStudy"
                  fetchLink={`${config.get(
                    "serverAddress"
                  )}/api/academicDetails`}
                />
              </React.Fragment>
            ) : null}
            <Form.Label>מסלול אקדמי</Form.Label>
            <Form.Control
              as="select"
              className="mb-2"
              dir="rtl"
              onChange={this.handleAcademicPlanChanged}
              name="academicPlan"
              value={this.state.academicPlan}
            >
              <option value="N/A">N/A</option>
              <option value="מכינה/בגרויות">מכינה/בגרויות</option>
              <option value="תואר ראשון">תואר ראשון</option>
              <option value="תואר מתקדם">תואר מתקדם</option>
            </Form.Control>
            {this.state.academicPlan === "תואר ראשון" ? (
              <React.Fragment>
                <Form.Label>שנת לימודים</Form.Label>
                <Form.Control
                  as="select"
                  className="mb-2"
                  dir="rtl"
                  onChange={this.handleStudyYearChanged}
                  name="studyYear"
                  value={this.state.studyYear}
                >
                  <option value="1">א</option>
                  <option value="2">ב</option>
                  <option value="3">ג</option>
                  <option value="4">ד</option>
                  <option value="5">ה</option>
                  <option value="6">ו</option>
                  <option value="7">ז</option>
                  <option value="8">ח</option>
                </Form.Control>
              </React.Fragment>
            ) : null}
            <Form.Label>
              <b>:פרטי בנק</b>
            </Form.Label>
            <br />
            <Form.Row dir="rtl">
              <Form.Group className="m-2">
                <Form.Label>שם בנק</Form.Label>
                <Form.Control
                  type="text"
                  as={TextValidator}
                  className="mb-2"
                  onChange={event => {
                    this.handleBankAccountChanged(event, "bankName");
                  }}
                  name="bankName"
                  value={this.state.bankAccount.bankName}
                  validators={["required"]}
                  errorMessages={["שדה זה הינו חובה"]}
                />
              </Form.Group>
              <Form.Group className="m-2">
                <Form.Label>מספר סניף</Form.Label>
                <Form.Control
                  type="text"
                  as={TextValidator}
                  className="mb-2"
                  onChange={event => {
                    this.handleBankAccountChanged(event, "branchNumber");
                  }}
                  name="branchNumber"
                  value={this.state.bankAccount.branchNumber}
                  validators={["required", "isNumber"]}
                  errorMessages={["שדה זה הינו חובה", "שדה זה מכיל ספרות בלבד"]}
                />
              </Form.Group>
              <Form.Group className="m-2">
                <Form.Label>מספר חשבון</Form.Label>
                <Form.Control
                  type="text"
                  as={TextValidator}
                  className="mb-2"
                  onChange={event => {
                    this.handleBankAccountChanged(event, "accountNumber");
                  }}
                  name="accountNumber"
                  value={this.state.bankAccount.accountNumber}
                  validators={["required", "isNumber"]}
                  errorMessages={["שדה זה הינו חובה", "שדה זה מכיל ספרות בלבד"]}
                />
              </Form.Group>
            </Form.Row>
            <Form.Label dir="rtl">
              <b>כתובת כפי שמצוין בת.ז.</b>
            </Form.Label>
            <br />
            <Form.Row dir="rtl">
              <Form.Group className="m-2" as={Col}>
                <Form.Label>רחוב ומספר</Form.Label>
                <Form.Control
                  type="text"
                  as={TextValidator}
                  className="mb-2"
                  onChange={event => {
                    this.handleRealAddressChanged(event, "street");
                  }}
                  name="realAddress.street"
                  value={this.state.realAddress.street}
                  validators={["required"]}
                  errorMessages={["שדה זה הינו חובה"]}
                />
              </Form.Group>
              <Form.Group className="m-2" as={Col}>
                <Form.Label dir="rtl">עיר/יישוב</Form.Label>
                <Form.Control
                  type="text"
                  as={TextValidator}
                  className="mb-2"
                  onChange={event => {
                    this.handleRealAddressChanged(event, "city");
                  }}
                  name="realAddress.city"
                  value={this.state.realAddress.city}
                  validators={["required"]}
                  errorMessages={["שדה זה הינו חובה"]}
                />
              </Form.Group>
              <Form.Group className="m-2" as={Col}>
                <Form.Label dir="rtl">שכונה</Form.Label>
                <Form.Control
                  type="text"
                  as={TextValidator}
                  className="mb-2"
                  onChange={event => {
                    this.handleRealAddressChanged(event, "neighborhood");
                  }}
                  name="realAddress.neighborhood"
                  value={this.state.realAddress.neighborhood}
                  validators={["required"]}
                  errorMessages={["שדה זה הינו חובה"]}
                />
              </Form.Group>
            </Form.Row>
            <Form.Label dir="rtl">
              <b>כתובת מגורים בפועל</b>
            </Form.Label>
            <br />
            <Form.Row dir="rtl">
              <Form.Group className="m-2" as={Col}>
                <Form.Label>רחוב ומספר</Form.Label>
                <Form.Control
                  type="text"
                  as={TextValidator}
                  className="mb-2"
                  onChange={event => {
                    this.handleCurrentAddressChanged(event, "street");
                  }}
                  name="currentAddress.street"
                  value={this.state.currentAddress.street}
                  validators={["required"]}
                  errorMessages={["שדה זה הינו חובה"]}
                />
              </Form.Group>
              <Form.Group className="m-2" as={Col}>
                <Form.Label dir="rtl">עיר/יישוב</Form.Label>
                <Form.Control
                  type="text"
                  as={TextValidator}
                  className="mb-2"
                  onChange={event => {
                    this.handleCurrentAddressChanged(event, "city");
                  }}
                  name="currentAddress.city"
                  value={this.state.currentAddress.city}
                  validators={["required"]}
                  errorMessages={["שדה זה הינו חובה"]}
                />
              </Form.Group>
              <Form.Group className="m-2" as={Col}>
                <Form.Label dir="rtl">שכונה</Form.Label>
                <Form.Control
                  type="text"
                  as={TextValidator}
                  className="mb-2"
                  onChange={event => {
                    this.handleCurrentAddressChanged(event, "neighborhood");
                  }}
                  name="currentAddress.neighborhood"
                  value={this.state.currentAddress.neighborhood}
                  validators={["required"]}
                  errorMessages={["שדה זה הינו חובה"]}
                />
              </Form.Group>
            </Form.Row>
            <Form.Label>הגדרה דתית</Form.Label>
            <Form.Control
              as="select"
              className="mb-2"
              dir="rtl"
              onChange={this.handleReligiousStatusChanged}
              name="religiousStatus"
              value={this.state.religiousStatus}
            >
              <option value="N/A">N/A</option>
              <option value="חילוני">חילוני</option>
              <option value="מסורתי">מסורתי</option>
              <option value="דתי">דתי</option>
              <option value="חרדי">חרדי</option>
              <option value="דתי לשעבר">דתי לשעבר</option>
              <option value="חרדי לשעבר">חרדי לשעבר</option>
              <option value="אחר">אחר/לא מגדיר</option>
            </Form.Control>
            {this.state.religiousStatus === "אחר" ? (
              <React.Fragment>
                <Form.Label>פרט</Form.Label>
                <Form.Control
                  as="textarea"
                  className="mb-2"
                  dir="rtl"
                  onChange={this.handleReligiousTextChanged}
                  name="religiousText"
                  value={this.state.religiousText}
                />
              </React.Fragment>
            ) : null}
            <Button
              className="btn btn-success my-2"
              onClick={this.addUnavailableTime}
            >
              הוסף זמן בלתי אפשרי לפעילות
            </Button>
            <br />
            {this.unavailableTimesForm()}
            <Form.Label dir="rtl">הערות/בקשות נוספות</Form.Label>
            <Form.Control
              type="text"
              dir="rtl"
              as="textarea"
              className="mb-2"
              onChange={this.handleNotesChanged}
              name="notes"
              value={this.state.notes}
            />
            {/* until here is the common part */}
            <Form.Group className="align-content-center" dir="ltr">
              <Form.Check
                label="?האם אתה סטודנט באימפקט"
                onChange={this.handleIsImpactChanged}
                value={this.state.isImpact}
              />
            </Form.Group>
            <Form.Group className="align-content-center" dir="ltr">
              <Form.Check
                label="?האם אתה סטודנט בשחק"
                onChange={this.handleIsShachakChanged}
                value={this.state.isShachak}
              />
            </Form.Group>

            <Form.Group className="align-content-center" dir="ltr">
              <Form.Check
                label="?האם אתה מקבל נקודות זכות על הפעילות"
                onChange={this.handleForAcademicPointsChanged}
                value={this.state.isForAcademicPoints}
              />
            </Form.Group>
            <Form.Group className="align-content-center" dir="ltr">
              <Form.Check
                label="?האם הפעילות היא חלק ממלגה עירונית"
                onChange={this.handleForAcademicPointsChanged}
                value={this.state.isForAcademicPoints}
              />
            </Form.Group>
            {/**************************************************************************/}
            <Jumbotron>
              <Form.Group>
                <Form.Label dir="rtl" className="h5 font-weight-bold">
                  יכול לתת עזרה בתחומים הבאים:
                </Form.Label>
                <Form.Row dir="rtl">
                  <Form.Group as={Col}>
                    <Form.Label>מתמטיקה</Form.Label>
                    <Form.Control
                      as="select"
                      className="mb-2"
                      dir="rtl"
                      onChange={this.handleMathLevelChanged}
                      name="mathLevel"
                      value={this.state.mathLevel}
                    >
                      <option value="N/A">N/A</option>
                      <option value="0">לא רלוונטי</option>
                      <option value="3">3 יחידות</option>
                      <option value="4">4 יחידות</option>
                      <option value="5">5 יחידות</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>אנגלית</Form.Label>
                    <Form.Control
                      as="select"
                      className="mb-2"
                      dir="rtl"
                      onChange={this.handleEnglishLevelChanged}
                      name="englishLevel"
                      value={this.state.englishLevel}
                    >
                      <option value="N/A">N/A</option>
                      <option value="0">לא רלוונטי</option>
                      <option value="3">3 יחידות</option>
                      <option value="4">4 יחידות</option>
                      <option value="5">5 יחידות</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>פיזיקה</Form.Label>
                    <Form.Control
                      as="select"
                      className="mb-2"
                      dir="rtl"
                      onChange={this.handlePhysicsLevelChanged}
                      name="physicsLevel"
                      value={this.state.physicsLevel}
                    >
                      <option value="N/A">N/A</option>
                      <option value="0">לא רלוונטי</option>
                      <option value="3">3 יחידות</option>
                      <option value="4">4 יחידות</option>
                      <option value="5">5 יחידות</option>
                    </Form.Control>
                  </Form.Group>
                </Form.Row>
              </Form.Group>
            </Jumbotron>
            <Button
              className="m-2 btn btn-danger"
              type="button"
              disabled={this.state.isLoading ? "disabled" : null}
            >
              ביטול
            </Button>
            <Button
              className="m-2 "
              type="submit"
              disabled={this.state.isLoading ? "disabled" : null}
            >
              הרשם
            </Button>
          </Form>
        </Container>
      </React.Fragment>
    );
  }
}

export default withRouter(TutorRegisterForm);

import  '../../../../App.css';
import Section from "../section.tsx"
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

const SIMPLE_AGREE = " אני מאשר/ת "
const CUSTOM_AGREE = " במידה והסעיף רלוונטי, אני מאשר/ת "

class TutorRegisterForm extends Component {
  state = {
    ok: false,
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
    isActive: false,
    checkedArray: [],
    disabledAck: true
    
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
      // console.log(dataToPost);
      axios
        .post(`${config.get("serverAddress")}/api/tutors`, dataToPost)
        .then(res => {
          clearInterval();
          alert("המידע נשלח בהצלחה, אנא המתן לאישור מנהל. תודה");
          this.setState({ isLoading: false });
          this.props.history.push("/");
        })
        .catch(err => {
          alert(
            `${err.message}${err.response ? ": " + err.response.data : ""}`
          );
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
  handleCheckedOnPolicy = event => {
    const name = event.target.name;
    this.state.checkedArray.includes(name) ? this.state.checkedArray.splice(this.state.checkedArray.indexOf(name), 1) : this.state.checkedArray.push(name);
    this.state.checkedArray.length > 22 ? this.setState({disabledAck: false}) : this.setState({disabledAck: true})
  }

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
              format="dd/MM/yyyy"
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
              checked={this.state.isAdditionalStudyPath}
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
                onChange={() => {
                  this.setState({ isImpact: !this.state.isImpact });
                }}
                checked={this.state.isImpact}
              />
            </Form.Group>
            <Form.Group className="align-content-center" dir="ltr">
              <Form.Check
                label="?האם אתה סטודנט בשחק"
                onChange={() => {
                  this.setState({ isShachak: !this.state.isShachak });
                }}
                checked={this.state.isShachak}
              />
            </Form.Group>

            <Form.Group className="align-content-center" dir="ltr">
              <Form.Check
                label="?האם אתה מקבל נקודות זכות על הפעילות"
                onChange={() => {
                  this.setState({
                    isForAcademicPoints: !this.state.isForAcademicPoints
                  });
                }}
                checked={this.state.isForAcademicPoints}
              />
            </Form.Group>
            <Form.Group className="align-content-center" dir="ltr">
              <Form.Check
                label="?האם הפעילות היא חלק ממלגה עירונית"
                onChange={() => {
                  this.setState({
                    isCityScholarship: !this.state.isCityScholarship
                  });
                }}
                checked={this.state.isCityScholarship}
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
            <Form.Group>
              {/* <div>
                <iframe
                  src="https://drive.google.com/file/d/160RwurpO9f_St9TyAnRnr2UmKdcyE7sH/preview"
                  width="750px"
                  height="500px"
                ></iframe>
              </div> */}

              <div className="terms" dir="rtl">
              <h2>נהלי התוכנית</h2>
                <p>
                שוברים את הסטיגמות ויוצרים גשר בין אוכלוסיות סטודנטים במדינת ישראל! פרויקט בליבה חומה יוצר גשר בין סטודנטים מהחברה החרדית לסטודנטים מכלל החברה הישראלית, ומסייע לחרדים שבחרו לפנות ללימודים אקדמיים להצליח בלימודים.
                </p>
                <p>
                פרוייקט בליבה חומה הינו תוכנית חונכות אקדמית הדדית בה סטודנטים חרדים וסטודנטים חילונים או דתיים לאומיים נפגשים ל3-4 שעות שבועיות של לימוד משותף. שני שלישים מהזמן מוקדשים לתגבור עבור הסטודנט החרדי במקצועות בהם הוא נזקק לסיוע; שליש הזמן הנותר מוקדש ללימוד חברותא - לימוד משותף מתוך ארון הספרים היהודי כפתח להחלפת דעות, הכרות עומק וחברות.
                </p>
                <p>
                התוכנית נולדה מתוך ההבנה כי לסטודנטים חרדים יש קושי מובנה להשתלב במסגרת ההשכלה גבוהה בישראל, מה שגורם לאחוזי נשירה גבוהים ביותר בקרב הסטודנטים החרדים (כ-60 אחוזי נשירה בקרב גברים חרדים). בנוסף לסיוע האקדמאי ההכרות האישית במסגרת הפרויקט תורמת להכרות בלתי אמצעית בין צעירים ממגזרים שונים ולהסרת גבולות וסטיגמות שליליות, ואף מייצרת חברויות ושיתופי פעולה.  

                </p>
                <p>
                הפרויקט פועל בהצלחה רבה מאז שנת 2011, ומוכיח הצלחה רבה הן בסיוע אקדמאי לסטודנטים החרדים והורדה דרמטית של אחוזי הנשירה והן ביצירת חיבורים אישיים משמעותיים בין חרדים דתיים וחילוניים. למעלה מ1300 בוגרי התוכנית מהווים הוכחה שאפשר ליצור שיח אחר בחברה הישראלית.
                </p>
                <p>
                להלן נהלי הפרויקט:
                </p>
                <p>
                  <b>עבור כל המתגברים:</b>
                </p>
                <ul>
                  <li><Section name="agree0" agree={SIMPLE_AGREE} onChange={this.handleCheckedOnPolicy} text="הפעילות הינה 3 או 4 שעות שבועיות, לפי מה שסוכם איתך בהתאם למסלול המלגה שלך"></Section></li>
                  <li><Section name="agree1" agree={SIMPLE_AGREE} onChange={this.handleCheckedOnPolicy} text="שליש מזמן הפעילות מוקדש לחברותא – לימוד מתוך ארוך הספרים היהודי, דיון והכרות. זמן החברותא הוא חלק בלתי נפרד מהפעילות. אם יש צורך מסיבה נקודתית לוותר על שעת החברותא, יש לאשר זאת פרטנית מול הרכז"></Section></li>
                  <li><Section name="agree2" agree={SIMPLE_AGREE} onChange={this.handleCheckedOnPolicy} text="הפעילות הינה לאורך כל שנת הלימודים, כולל בעת הצורך חופשת הסמסטר ותקופת המבחנים של מועדי א' בקיץ"></Section></li>
                  <li><Section name="agree3" agree={SIMPLE_AGREE} onChange={this.handleCheckedOnPolicy} text="את הפעילות יש לקיים באופן רציף מידי שבוע, ולא לדחוס אותה לתקופות קצרות."></Section></li>
                  <li><Section name="agree4" agree={SIMPLE_AGREE} onChange={this.handleCheckedOnPolicy} text="מיקום הפגישות נקבע בין הסטודנט המתגבר לסטודנט החרדי, מתוך התחשבות הדדית"></Section></li>
                  <li><Section name="agree5" agree={SIMPLE_AGREE} onChange={this.handleCheckedOnPolicy} text="מידי שבועיים יש לדווח על הפעילות במערכת הדיווחים המקוונת. דיווח באיחור של חודש ומעלה עלול לגרום לביטול קבלת המלגה"></Section></li>
                  <li><Section name="agree6" agree={SIMPLE_AGREE} onChange={this.handleCheckedOnPolicy} text="שיחת משוב עם הרכז בין 1-3 בשנה הינה חובתו של הסטודנט המתגבר"></Section></li>
                  <li><Section name="agree7" agree={SIMPLE_AGREE} onChange={this.handleCheckedOnPolicy} text="יש להשיב לשיחות, הודעות ומיילים לכל המאוחר תוך 3 ימי עבודה. במקרה של נסיעה לחול/מילואים/סיבה אחרת לאי זמינות ממושכת, יש לעדכן מראש את הרכז."></Section></li>
                  <li><Section name="agree8" agree={SIMPLE_AGREE} onChange={this.handleCheckedOnPolicy} text="במהלך השנה יתקיימו שני מפגשים קבוצתיים בשעות הערב, בתאריכים שיינתנו לך מספר שבועות מראש. מפגשים אלה הינם חובתך, ואי הגעה אליהם עלולה לפגוע בקבלת המלגה ו/או בהשתתפות בפרויקט. יש בעת הצורך אף לפספס קורס אקדמי למטרת ההגעה למפגשים. במקרה של היעדרות/סימן שאלה על ההגעה, יש ליצור קשר בהקדם האפשרי עם הרכז"></Section></li>
                  <li><Section name="agree9" agree={SIMPLE_AGREE} onChange={this.handleCheckedOnPolicy} text="דיווח כוזב מהווה עבירה פלילית ומוסרית ויגרור שלילת הזכאות למלגה או לכל תמורה אחרת מבליבה חומה"></Section></li>
                  <li><Section name="agree10" agree={SIMPLE_AGREE} onChange={this.handleCheckedOnPolicy} text="בכל מקרה בו תופסק פעילותך שלא באחריותך, ולאחר התייעצות כנדרש ובהסכמת מינהלת 'בליבה חומה', תעמיד לך המינהלת סטודנט או פעילות חלופית בהתאם למקובל. סירובך להיענות להמשך פעילות שתוצע לך, בהתאם לאפשרות, תפקיע את מחויבותה של מינהלת 'בליבה חומה',לתשלום יתרת המלגה"></Section></li>
                  <li><Section name="agree11" agree={SIMPLE_AGREE} onChange={this.handleCheckedOnPolicy} text="מינהלת 'בליבה חומה', רשאית, בכל עת, מטעמים ענייניים, להפסיק פעילותך או להחליט שלא להעניק לך את המלגה כלל, או להקטינה, או לדחות את הענקתה או לא לשלם חלק כלשהו של המלגה שטרם שולם לך במועד כלשהו, בכל אחד או יותר מן המקרים הבאים: א. אם יתברר כי לא מילאת את כל המטלות המפורטות במסמך זה, או לא מילאת את כולן במלואן, לפי התנאים המפורטים לעיל; ב. אם הפסקת את פעילותך, באופן חלקי או מלא, ללא אישור. ג. אם פעילותך הופסקה ע''י מינהלת 'בליבה חומה', משום שלדעתה לא עמדת במטלות כמפורט לעיל או נמצאת בלתי מתאים לפעילות בפרוייקט. אם הפסקת השתתפותך בפרוייקט מסיבה שאינה נתונה בשליטתך, כגון מחלה, יועבר אליך החלק היחסי במלגה, ובתנאי שמילאת לפחות 3 חודשי השתתפות בפרוייקט"></Section></li>
                  <li><Section name="agree12" agree={SIMPLE_AGREE} onChange={this.handleCheckedOnPolicy} text="בינך ובין 'בליבה חומה' לא מתקיימים יחסי עובד מעביד, לא במפורש ולא במשתמע. פעילותך מזכה אותך לכל היותר בקבלת מלגה - לפי התנאים המפורטים במסמך זה, ואינה מזכה אותך בתשלומים אחרים כלשהם"></Section></li>
                  <li><Section name="agree13" agree={SIMPLE_AGREE} onChange={this.handleCheckedOnPolicy} text="פרטי הזיהוי שלך לרבות שם ומספר תעודת זהות, ועובדת פעילותך במסגרת 'בליבה חומה' ו/או מספר השעות שבצעת כסטודנט, עשויים להיות מועברים למוסד הלימודים שלך ו/או לכל גורם ציבורי ו/או אחר שמעורב במימון מלגתך. כמו כן, הינך מסכים לכך שהגורם המממן יעביר נתוני מידע אודותיך למינהלת 'בליבה חומה', לפי קריטריונים של הגורם המממן, לצורך מתן המלגה/ההטבה. מובהר כי פרטיך האישיים ונתוני המידע כאמור לעיל, יועברו בין מינהלת 'בליבה חומה', לבין הגורם המממן אך ורק לצורך המוזכר לעיל"></Section></li>
                  <li><Section name="agree14" agree={SIMPLE_AGREE} onChange={this.handleCheckedOnPolicy} text="בתום שנת הפעילות, תתבקש למלא סקר משוב קצר, שמשכו כ-10 דקות. מילוי הסקר קריטי לצוות התוכנית כדי ללמוד מההצלחות והטעויות. מילוי הסקר הינו חובה והכרחי עבור קבלת המלגה.יודגש כי גם סטודנטים שמכל סיבה עזבו את הפעילות במהלך השנה, מחוייבים במילוי הסקר"></Section></li>
                </ul>
                <p>
                  <b>עבור מלגאי אימפקט:</b><br></br>
                  <Section name="agree15" agree={CUSTOM_AGREE} onChange={this.handleCheckedOnPolicy} text="כחלק מהשתתפותך בפרוייקט 'בליבה חומה', ועמידה בתנאים המפורטים לעיל, תדווח 'בליבה חומה' על עמידתך במחוייבויות שלך ל'אימפקט'. בהתאם לכך, 'אימפקט' תעניק לך מלגה.  כל עוד עמדת במלוא המטלות המוטלות עליך, בהתאם להוראות מינהלת 'בליבה חומה' ובהתאם לשיקול דעתה, יועבר ל'אימפקט' דיווח מלא בהתאם. מובהר כי המלגה שלך תשולם ישירות על ידי 'אימפקט', בכפוף לקריטריונים של 'אימפקט' ולעמידתך בכל המחויבויות שלך כלפיהם."></Section>
                </p>
                <p>
                <b>עבור מלגאי שח"ק:</b><br></br>
                <Section name="agree16" agree={CUSTOM_AGREE} onChange={this.handleCheckedOnPolicy} text="כחלק מהשתתפותך בפרוייקט 'בליבה חומה', ועמידה בתנאים המפורטים לעיל, תדווח 'בליבה חומה' על עמידתך במחוייבויות שלך לשח''ק. בהתאם לכך, שח''ק תעניק לך מלגה.  כל עוד עמדת במלוא המטלות המוטלות עליך, בהתאם להוראות מינהלת 'בליבה חומה' ובהתאם לשיקול דעתה, יועבר לשח''ק  דיווח מלא בהתאם. מובהר כי המלגה שלך תשולם ישירות על ידי שח''ק, בכפוף לקריטריונים של שח''ק ולעמידתך בכל המחויבויות שלך כלפיהם."></Section>

                </p>
                <p>
                 <b>פעילים בתמורה לנקודות זכות אקדמיות:</b><br></br>
                 </p>
                 <ul>
                   <li><Section name="agree17" agree={CUSTOM_AGREE} onChange={this.handleCheckedOnPolicy} text="	עבור שעות ההתנדבות עבורן אני מעוניין לקבל נקודות זכות אקדמיות, יש לדווח לא רק במערכת הדיווחים של 'בליבה חומה' מידי שבועיים, אלא גם במערכת דיווחים שמוסד הלימודים שלי יבקש, בתדירות שתיקבע על ידו. ללא דיווח כפול, אין לנו יכולת להתחייב שנקודות הזכות יינתנו"></Section></li>
                  <li><Section name="agree18" agree={CUSTOM_AGREE} onChange={this.handleCheckedOnPolicy} text="	הגעה ל-2 אירועי החובה של בליבה חומה, איננה נכללת במניין השעות עבור הדיווח למוסד האקדמי"></Section></li>
                  <li><Section name="agree19" agree={CUSTOM_AGREE} onChange={this.handleCheckedOnPolicy} text="בעבור 40 השעות (שעה = 60 דקות) הראשונות של פעילותך בפרוייקט, ובכפוף לעמידתך בנהלי התוכנית המפורטים במסמך זה, נודיע למוסד האקדמי שלך כי עמדת במכסת השעות הנדרשות, במסגרת פרוייקט קבלת נ''ז בגין מעורבות חברתית. יש להדגיש כי נושא הרישום לקורס במוסד האקדמי, בירור הנושאים האקדמיים כגון השתלבות הנ''ז במסלול התואר שלך וכו - הינם באחריותך."></Section></li>
                  <li><Section name="agree20" agree={CUSTOM_AGREE} onChange={this.handleCheckedOnPolicy} text="	אם תבצע במסגרת התוכנית שעות נוספות מעבר ל40 השעות המוגדרות לצרכי נ''ז, תוכל לקבל על שעות אלה מלגה. מלגה זו תחושב בתעריף של 42 ש''ח לשעה. כל עוד עמדת במלוא המטלות המוטלות עליך, בהתאם להוראות מינהלת 'בליבה חומה' ובהתאם לשיקול דעתה, תהיה זכאי לקבל את מלוא המלגה האמורה בכפוף להוראות מסמך זה. המלגה תועבר אליך ע''י מינהלת 'בליבה חומה' או ע''י גופים אחרים עימם 'בליבה חומה' קשורה, במועד סיום תקופת המלגה ובשיעור יחסי התואם את מספר המפגשים שבוצעו בפועל עד מועד זה"></Section></li>
                </ul> 
                
                <p>
                  <b>עבור מתגברים שאינם מאף אחד מהמסגרות הקודמות, ומקבלים מלגה ישירות מבליבה חומה:</b><br></br>
                  </p>
                  <ul>
                    <li><Section name="agree21" agree={CUSTOM_AGREE} onChange={this.handleCheckedOnPolicy} text="כחלק מהשתתפותך בפרוייקט בליבה חומה, ועמידה בתנאים המפורטים לעיל, תוענק מלגת עידוד בסך עד 5,000 ₪ בכפוף להחלטה של מנהל הפרוייקט והגופים התורמים לפרוייקט, ולזמני העברת הכספים ל'בליבה חומה' על ידם. המלגה תוענק עבור 120 שעות פעילות.  כל עוד עמדת במלוא המטלות המוטלות עליך, בהתאם להוראות מינהלת 'בליבה חומה' ובהתאם לשיקול דעתה, תהיה זכאי לקבל את מלוא המלגה האמורה בכפוף להוראות מסמך זה. המלגה תועבר אליך ע''י מינהלת 'בליבה חומה' או ע''י גופים אחרים עימם 'בליבה חומה' קשורה, במועד סיום תקופת המלגה ובשיעור יחסי התואם את מספר המפגשים שבוצעו בפועל עד מועד זה."></Section></li>
                    <li><Section name="agree22" agree={CUSTOM_AGREE} onChange={this.handleCheckedOnPolicy} text="סכום המלגה עלול להתחייב בתשלום מס הכנסה, אולם מינהלת 'בליבה חומה', לא  תנכה מס זה במקור. הסכום המתקבל כמלגה נכלל בקטגורית הסכומים העלולים להתחייב במס, וסטודנט המשתכר ממקור נוסף חייב לדווח לשלטונות המס גם על סכום זה."></Section></li>
                  </ul>
              </div>
              
              <Section name="agreeFinal" disabled={this.state.disabledAck} onChange={() => {
                  this.setState({ ok: !this.state.ok });
                }} 
                agree="הנני מצהיר כי קראתי את הנהלים, והם מקובלים עלי. ידוע לי כי אי עמידה בנהלים עלולה לגרום להדחה מהתוכנית ולאי קבלת המלגה/התמורה"></Section>

            </Form.Group>
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
              disabled={
                this.state.isLoading || !this.state.ok ? "disabled" : null
              }
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

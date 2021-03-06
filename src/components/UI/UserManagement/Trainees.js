import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import MultyTableGeneric from "../../../containers/MultyTableGeneric/MultyTableGeneric";
import { Modal, Button, Form, Row } from "react-bootstrap";
// import DynamicSelectBox from './../../../containers/DynamicSelectBox/DynamicSelectBox';
import config from "react-global-configuration";
// import BootstrapTable from 'react-bootstrap-table-next';
// import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import TraineeRegisterFormEdit from "./TraineeRegisterFormEdit";
import { FormSelect } from "semantic-ui-react";

export default class Trainee extends Component {
  constructor(props) {
    super(props);
    // console.log(props);

    this.state = {
      showUnActive: false,
      showUnApproved: false,
      TableColumns: [
        {
          dataField: "isActive",
          text: "סטטוס פעילות",
          sort: true,
          formatter: (value, row, index) => {
            return value ? "פעיל" : "לא פעיל";
          }
        },
        {
          dataField: "activityArea.name",
          text: "איזורי פעילות",
          sort: true
        },
        {
          dataField: "phoneA",
          text: "מספר פלאפון",
          sort: true
        },
        {
          dataField: "email",
          text: "כתובת מייל",
          sort: true
        },
        {
          dataField: "institute.name",
          text: "שם מוסד אקדמאי",
          sort: true
        },
        {
          dataField: "needsHelpIn",
          text: "תיאור העזרה הנדרשת",
          sort: true
        },
        {
          dataField: "lname",
          formatter: (value, row, index) => {
            return (
                row.lname
            );
          },
          text: "שם משפחה",
          sort: true
        },
        {
          dataField: "fname",
          formatter: (value, row, index) => {
            return (
              <Button as={Link} to={`trainee/${row._id}`} variant="link">
                {row.fname}
              </Button>
            );
          },
          text: "שם פרטי",
          sort: true
        }
      ],

      traineeList: [],
      isShowing: false,
      editIsShoing: false,

      traineeInfo: {
        id: "",
        fname: "",
        lname: "",
        email: "",
        password: "",
        phoneA: "",
        phoneB: "",
        birthDate: "",
        gender: "",
        maritalStatus: "",
        activityArea: "",
        institute: "",
        mainStudy: "",
        secondaryStudy: "",
        academicPlan: "",
        studyYear: "",
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
        activeYears: "",
        religiousStatus: "",
        religiousText: "",
        scholarshipTimes: "",
        // unavailableTimes: "",
        notes: "",
        stuffNotes: "",
        isNeedAdditionalRelation: "",
        activeStatus: "",
        isFinnishPreparatory: "",
        isGraduated: "",
        isFoundJob: "",
        isJobInStudyFelid: "",
        isApproved: "",
        // until here is the common part
        isInMagid: "",
        isLiveInSelectedCities: "",
        isRegisteredToKivun: "",
        needsHelpIn: "",
        workStatus: "",
        workTitle: "",
        isLearnedInYeshiva: "",
        yeshivaTimes: "",
        isHaveAnotherProfessionalTraining: "",
        previousProfession: "",
        isHaveAnotherDegree: "",
        previousDegree: "",
        WantDetailsAbout: {
          personalTraining: "",
          jobSeeking: "",
          professionalTraining: "",
          englishCourse: "",
          computerCourse: "",
          studyDiagnostics: "",
          selfAdvanceProgram: "",
          entrepreneurship: "",
          shortTermPreparatory: ""
        },
        isServed: "",
        mathLevel: "",
        englishLevel: "",
        physicsLevel: "",
        additionalTopics: "",
        isActive: "",
        leavingReason: "",
        isDropped: ""
      }
    };
  }

  componentDidMount() {
    const userToken = localStorage.getItem("beliba-homa-auth-token");
    let userData = localStorage.getItem("beliba-homa-user");

    if (userToken && userData) {
      userData = JSON.parse(userData);
      if (userData.userType === "admin" || userData.userType === "coordinator")
        axios
          .get(`${config.get("serverAddress")}/api/trainees`, {
            headers: { "x-auth-token": userToken }
          })
          .then(res => {
            // console.log(res.data);
            this.setState({
              user: userData,
              isLoggedIn: true,
              fname: userData.fname,
              lname: userData.lname,
              userType: userData.userType,
              traineeList: res.data,
              userToken: userToken
            });
          })
          .catch(err => {
            alert(
              `${err.message}${err.response ? ": " + err.response.data : ""}`
            );
          });
    }
  }

  //==========

  toggleModal_editItem = () => {
    // console.log("editIsShoing:" + this.state.editIsShoing);
    this.setState({
      editIsShoing: !this.state.editIsShoing
    });
  };

  hadleDelete = params => {
    const userToken = localStorage.getItem("beliba-homa-auth-token");

    axios
      .delete(`${config.get("serverAddress")}/api/trainees/` + params._id, {
        headers: { "x-auth-token": userToken }
      })
      .then(response => {
        const _traineeList = this.state.traineeList.filter(
          m => m._id !== params._id
        );
        this.setState({ traineeList: [..._traineeList] });
      })
      .catch(err => {
        alert(`${err.message}${err.response ? ": " + err.response.data : ""}`);
        console.log(err);
      });
  };

  hadleEdit = params => {
    // console.log("hadleEdit");
    // console.log(params);
    this.setState({ traineeInfo: params });

    this.toggleModal_editItem();
  };

  //============
  traine;

  render() {
    return (
      <div className="ml-5 mr-5 ">
        <Modal
          size="lg"
          show={this.state.editIsShoing}
          onHide={this.toggleModal_editItem}
          style={{ textAlign: "right" }}
        >
          <Modal.Header>
            <Modal.Title style={{ margin: "0 auto " }}>עריכת חניך</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <TraineeRegisterFormEdit
              traineeInfo={this.state.traineeInfo}
              handleCloseModal={this.toggleModal_editItem}
            />
          </Modal.Body>
        </Modal>

        <h1
          style={{
            borderRadius: "0.25em",
            textAlign: "center",
            border: "1px solid purple",
            padding: "0.5em"
          }}
        >
          סטודנטים חרדים
        </h1>
        <Form dir="rtl" className="text-right">
          <Row dir="ltr">
          <Form.Check
              label=" הצג סטודנטים שלא אושרו"
              onChange={() => {
                this.setState({ showUnApproved: !this.state.showUnApproved });
              }}
              checked={this.state.showUnApproved}
            />
            <Form.Check
              label="הצג סטודנטים לא פעילים"
              onChange={() => {
                this.setState({ showUnActive: !this.state.showUnActive });
              }}
              checked={this.state.showUnActive}
            />
           
          </Row>
        </Form>
        {/* <Button as={Link} to="/register" variant="outline-primary">הוסף חונך</Button> */}
        <MultyTableGeneric
          ColumnNames={this.state.TableColumns}
          data={this.state.traineeList.filter(trainee => {   
            let ans = true;
            if (!this.state.showUnApproved && !trainee.isApproved)
                ans = false;
            if (!this.state.showUnActive && !trainee.isActive)
                ans = false;
            return ans;
          })}
          hadleDelete={this.hadleDelete}
          hadleEdit={this.hadleEdit}
        />
      </div>
    );
  }
}

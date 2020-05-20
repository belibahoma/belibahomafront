import React, { Component } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";
import MultyTableGeneric from "../../../containers/MultyTableGeneric/MultyTableGeneric";
import { Modal, Form } from "react-bootstrap";
// import DynamicSelectBox from './../../../containers/DynamicSelectBox/DynamicSelectBox';
import config from "react-global-configuration";
// import BootstrapTable from 'react-bootstrap-table-next';
// import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import TutorRegisterForm from "./TutorRegisterFormEdit";

export default class Tutors extends Component {
  constructor(props) {
    super(props);
    // console.log(props);
    let x;

    //this.handleClickAddItem = this.handleClickAddItem.bind(this);

    this.state = {
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
          dataField: "mainStudy.name",
          text: "מסלול לימודים",
          sort: true
        },
        {
          dataField: "institute.name",
          text: "שם מוסד אקדמאי",
          sort: true
        },
        {
          dataField: "fname",
          formatter: (value, row, index) => {
            return row.lname + ", " + value;
          },
          text: "שם מלא",
          sort: true
        }
      ],

      tutorList: [],
      isShowing: false,
      editIsShoing: false,
      showAll: false,

      tutorInfo: {
        id: "",
        fname: "",
        lname: "",
        email: "",
        password: "",
        phoneA: "",
        // phoneB: "",
        birthDate: "",
        gender: "",
        maritalStatus: "",
        activityArea: "",
        institute: "",
        mainStudy: "",
        secondaryStudy: "",
        academicPlan: "",
        studyYear: "",
        // realAddress: {
        //   street: "",
        //   city: "",
        //   neighborhood: ""
        // },
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
        isImpact: "",
        isShachak: "",
        isForAcademicPoints: "",
        isCityScholarship: "",
        mathLevel: "",
        englishLevel: "",
        physicsLevel: "",
        additionalTopics: "",
        isActive: ""
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
          .get(`${config.get("serverAddress")}/api/tutors`, {
            headers: { "x-auth-token": userToken }
          })
          .then(res => {
            this.setState({
              user: userData,
              isLoggedIn: true,
              fname: userData.fname,
              lname: userData.lname,
              userType: userData.userType,
              tutorList: res.data,
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
      .delete(`${config.get("serverAddress")}/api/tutors/` + params._id, {
        headers: { "x-auth-token": userToken }
      })
      .then(response => {
        const _tutorList = this.state.tutorList.filter(
          m => m._id !== params._id
        );
        this.setState({ tutorList: [..._tutorList] });
      })
      .catch(err => {
        alert(`${err.message}${err.response ? ": " + err.response.data : ""}`);
        console.log(err);
      });
  };

  hadleEdit = params => {
    // console.log("hadleEdit");
    // console.log(params);
    this.setState({ tutorInfo: params });

    this.toggleModal_editItem();
  };

  //============

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
            <Modal.Title style={{ margin: "0 auto " }}>עריכת חונך</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <TutorRegisterForm
              tutorInfo={this.state.tutorInfo}
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
          מתגברים
        </h1>
        {/* <Button as={Link} to="/register" variant="outline-primary">הוסף חונך</Button> */}
        <Form dir="rtl" className="text-right">
          <Form.Group className="align-content-center" dir="ltr">
            <Form.Check
              label="?להציג מתגברים לא פעילים"
              onChange={() => {
                this.setState({ showAll: !this.state.showAll });
              }}
              checked={this.state.showAll}
            />
          </Form.Group>
        </Form>
        <MultyTableGeneric
          ColumnNames={this.state.TableColumns}
          data={this.state.tutorList.filter(tutor => {
            return tutor.isActive || this.state.showAll;
          })}
          hadleDelete={this.hadleDelete}
          hadleEdit={this.hadleEdit}
        />
      </div>
    );
  }
}

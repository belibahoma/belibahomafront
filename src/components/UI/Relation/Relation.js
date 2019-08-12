import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import config from "react-global-configuration";
import DynamicSelectBox from "../../../containers/DynamicSelectBox/DynamicSelectBox";
import {
  Form,
  Row,
  Col,
  ListGroup,
  Table,
  Button,
  Modal,
  Spinner
} from "react-bootstrap";

class Relation extends Component {
  state = {
    fname: "",
    lname: "",
    userType: null,
    isButtonDisabled: false,
    tutorsList: [],
    traineesList: [],
    relationsList: [],
    area: "N/A",
    selectedTutor: null,
    selectedTrainee: null,
    showModal: false,
    isLoading: false,
    userToken: null
  };

  handleAddRelationClicked = () => {
    if (this.state.selectedTutor && this.state.selectedTrainee) {
      this.setState({ showModal: true });
    }
  };

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
              tutorsList: res.data,
              userToken: userToken
            });
          })
          .catch(err => {
            alert(
              `${err.message}${err.response ? ": " + err.response.data : ""}`
            );
          });
      axios
        .get(`${config.get("serverAddress")}/api/relations`, {
          headers: { "x-auth-token": userToken }
        })
        .then(res => this.setState({ relationsList: res.data }))
        .catch(err => {
          alert(
            `${err.message} ${err.response ? ": " + err.response.data : ""}`
          );
        });
      axios
        .get(`${config.get("serverAddress")}/api/trainees`, {
          headers: { "x-auth-token": userToken }
        })
        .then(res => this.setState({ traineesList: res.data }))
        .catch(err => {
          alert(
            `${err.message} ${err.response ? ": " + err.response.data : ""}`
          );
        });
    } else {
      alert("Unauthorized access");
      this.props.history.push("/");
    }
  }

  showTraineesList = traineeList => {
    if (traineeList.length === 0) {
      return (
        <Table bordered className="text-center align-content-center mx-2">
          <th>לא נמצאו סטודנטים מתאימים לשיבוץ</th>
        </Table>
      );
    }
    const traineesRowList = traineeList.map(trainee => {
      console.log(trainee);
      return (
        <tr dir="rtl" key={trainee._id}>
          <td>
            <input
              type="radio"
              name="trainees"
              onClick={event => {
                this.handleTraineeClicked(event, trainee);
              }}
            />
          </td>
          <td>{trainee.fname}</td>
          <td>{trainee.lname}</td>
          <td>{trainee.institute.name}</td>
          <td>{trainee.mainStudy.name}</td>
          <td>{trainee.secondaryStudy ? trainee.secondaryStudy.name : ""}</td>
        </tr>
      );
    });
    return (
      <Table
        striped
        bordered
        hover
        dir="rtl"
        className="text-right align-items-center"
      >
        <tr>
          <th />
          <th>שם פרטי</th>
          <th>שם משפחה</th>
          <th>מוסד לימודים</th>
          <th>מסלול לימודים ראשי</th>
          <th>מסלול לימודים משני</th>
        </tr>
        <tbody>{traineesRowList}</tbody>
      </Table>
    );
  };

  calculateTime = (tutorUnavailableTimes, traineeUnavailableTimes) => {
    return !tutorUnavailableTimes.some(tutorTime => {
      traineeUnavailableTimes.some(traineeTime => {
        tutorTime.day === traineeTime.day &&
          this.isTimeOverlap(tutorTime.Time, traineeTime.Time);
      });
    });
  };

  isTimeOverlap = (timeA, timeB) => {
    return timeB.start - timeA.start <= 0 || timeB.end - timeA.end >= 0;
  };

  handleTutorClicked = (event, tutor) => {
    this.setState({ selectedTutor: tutor });
  };

  showTrainees = () => {
    console.log(this.state.selectedTutor);
    const trainees =
      this.state.traineesList.length >= 1 && this.state.selectedTutor !== null
        ? this.state.traineesList.filter(trainee => {
            const isTimeOk = this.calculateTime(
              this.state.selectedTutor.unavailableTimes,
              trainee.unavailableTimes
            );
            return (
              isTimeOk &&
              trainee.activityArea === this.state.selectedTutor.activityArea &&
              (this.traineeNeedRelation(trainee._id) ||
                trainee.isNeedAdditionalRelation)
            );
          })
        : [];
    return this.showTraineesList(trainees);
  };

  tutorNeedRelation = id => {
    return !this.state.relationsList.find(relation => {
      return relation.tutor_id === id;
    });
  };

  traineeNeedRelation = id => {
    return !this.state.relationsList.find(relation => {
      return relation.trainee_id === id;
    });
  };

  showTutors = () => {
    let tutorsRowList = this.state.tutorsList.filter(tutor => {
      return (
        (tutor.isActive &&
          (tutor.activityArea._id === this.state.area ||
            this.state.area === "N/A") &&
          this.tutorNeedRelation(tutor._id)) ||
        tutor.isNeedAdditionalRelation
      );
    });
    tutorsRowList = tutorsRowList.map(tutor => {
      console.log(tutor);
      return (
        <tr dir="rtl" key={tutor._id}>
          <td>
            <input
              type="radio"
              name="tutors"
              onClick={event => {
                this.handleTutorClicked(event, tutor);
              }}
            />
          </td>
          <td>{tutor.fname}</td>
          <td>{tutor.lname}</td>
          <td>{tutor.institute.name}</td>
          <td>{tutor.mainStudy.name}</td>
          <td>{tutor.secondaryStudy ? tutor.secondaryStudy.name : ""}</td>
        </tr>
      );
    });
    return (
      <Table
        striped
        bordered
        hover
        dir="rtl"
        className="text-right align-items-center"
      >
        <tr>
          <th />
          <th>שם פרטי</th>
          <th>שם משפחה</th>
          <th>מוסד לימודים</th>
          <th>מסלול לימודים ראשי</th>
          <th>מסלול לימודים משני</th>
        </tr>
        <tbody>{tutorsRowList}</tbody>
      </Table>
    );
  };

  handleAreaChanged = event => {
    this.setState({ area: event.target.value });
  };

  handleModalOk = () => {
    axios
      .post(
        `${config.get("serverAddress")}/api/relations`,
        {
          tutor_id: this.state.selectedTutor._id,
          trainee_id: this.state.selectedTrainee._id
        },
        {
          headers: { "x-auth-token": this.state.userToken }
        }
      )
      .then(res => {
        this.setState({ isLoading: false, showModal: false });
      })
      .catch(err => {
        alert(`${err.message}${err.response ? ": " + err.response.data : ""}`);
        this.setState({ isLoading: false, showModal: false });
      });
    this.setState({ isLoading: true });
  };

  render() {
    return (
      <React.Fragment>
        <Modal
          show={this.state.showModal}
          onHide={() => {
            this.setState({ showModal: false });
          }}
        >
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title dir="rtl">
                {this.state.selectedTrainee && this.state.selectedTutor
                  ? "האם אתה בטוח שאתה רוצה להוסיף קשר בין " +
                    this.state.selectedTrainee.fname +
                    " " +
                    this.state.selectedTrainee.lname +
                    " לבין " +
                    this.state.selectedTrainee.fname +
                    " " +
                    this.state.selectedTrainee.lname +
                    "?"
                  : null}
              </Modal.Title>
            </Modal.Header>

            <Modal.Body className="align-content-center text-center">
              {this.state.isLoading ? (
                <React.Fragment>
                  <h6>Loading</h6>
                  <Spinner animation="border" variant="primary" />
                </React.Fragment>
              ) : (
                ""
              )}
            </Modal.Body>

            <Modal.Footer>
              <Button
                onClick={() => {
                  this.setState({ showModal: false });
                }}
                disabled={this.state.isLoading}
                variant="secondary"
              >
                ביטול
              </Button>
              <Button
                onClick={this.handleModalOk}
                disabled={this.state.isLoading}
                variant="primary"
              >
                אישור
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal>
        <Form.Group as={Row} dir="rtl" className="text-right m-2">
          <Col sm={1}>
            <Form.Label dir="rtl">איזור</Form.Label>
          </Col>
          <Col sm={4}>
            <Form.Control
              as={DynamicSelectBox}
              className="mb-2"
              dir="rtl"
              value={this.state.area}
              onChange={this.handleAreaChanged}
              name="institute"
              fetchLink={`${config.get("serverAddress")}/api/areas`}
            />
          </Col>
        </Form.Group>
        <ListGroup dir="rtl">
          <Form.Row>
            <Col sm={6}>{this.showTutors()}</Col>
            <Col sm={6}>{this.showTrainees()}</Col>
          </Form.Row>
        </ListGroup>
        <ListGroup dir="rtl" className="p-5 m-5">
          <Button
            disabled={
              this.state.selectedTrainee && this.state.selectedTutor
                ? null
                : true
            }
            onClick={this.handleAddRelationClicked}
          >
            הוסף קשר למידה
          </Button>
        </ListGroup>
      </React.Fragment>
    );
  }
}

export default withRouter(Relation);

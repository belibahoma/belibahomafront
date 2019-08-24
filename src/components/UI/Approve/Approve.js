import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";
import _ from "lodash";
import axios from "axios";
import config from "react-global-configuration";

export default class Approve extends Component {
  state = {
    tutorsList: [],
    traineesList: [],
    approvalList: [],
    user: "",
    fname: "",
    lname: "",
    userType: "",
    userToken: ""
  };

  componentDidMount() {
    const userToken = localStorage.getItem("beliba-homa-auth-token");
    let userData = localStorage.getItem("beliba-homa-user");
    if (userToken && userData) {
      userData = JSON.parse(userData);
      if (
        userData.userType === "admin" ||
        userData.userType === "coordinator"
      ) {
        axios
          .get(`${config.get("serverAddress")}/api/tutors`, {
            headers: { "x-auth-token": userToken }
          })
          .then(res => {
            this.setState({
              user: userData,
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
        alert("אינך מורשה גישה");
        this.props.history.push("/");
      }
    } else {
      alert("אנא התחבר");
      this.props.history.push("/");
    }
  }

  updateLists = () => {
    axios
      .get(`${config.get("serverAddress")}/api/tutors`, {
        headers: { "x-auth-token": this.state.userToken }
      })
      .then(res => {
        this.setState({
          tutorsList: res.data
        });
      })
      .catch(err => {
        alert(`${err.message}${err.response ? ": " + err.response.data : ""}`);
      });
    axios
      .get(`${config.get("serverAddress")}/api/trainees`, {
        headers: { "x-auth-token": this.state.userToken }
      })
      .then(res => this.setState({ traineesList: res.data }))
      .catch(err => {
        alert(`${err.message} ${err.response ? ": " + err.response.data : ""}`);
      });
  };

  handleApproveClick = (_id, type) => {
    console.log(_id, type, this.state.userToken);
    axios
      .post(
        `${config.get("serverAddress")}/api/${
          type === "tutor" ? "tutors" : "trainees"
        }/approve/${_id}`,
        null,
        {
          headers: { "x-auth-token": this.state.userToken }
        }
      )
      .then(res => {
        this.updateLists();
        alert(res.data);
      })
      .catch(err => {
        alert(`${err.message}${err.response ? ": " + err.response.data : ""}`);
      });
  };

  createTable = () => {
    const studentsList = [
      ...this.state.tutorsList
        .filter(s => {
          return !s.isApproved;
        })
        .map(s => {
          return _.pick(s, ["_id", "fname", "lname", "userType"]);
        }),
      ...this.state.traineesList
        .filter(s => {
          return !s.isApproved;
        })
        .map(s => {
          return _.pick(s, ["_id", "fname", "lname", "userType"]);
        })
    ];

    return studentsList.length > 0 ? (
      studentsList.map(s => {
        return (
          <tr>
            <td>{s.fname}</td>
            <td>{s.lname}</td>
            <td>
              <Button
                onClick={() => {
                  this.handleApproveClick(s._id, s.userType);
                }}
              >
                אשר
              </Button>
            </td>
          </tr>
        );
      })
    ) : (
      <tr>
        <td colSpan="3">
          <h6>אין סטודנטים להצגה</h6>
        </td>
      </tr>
    );
  };

  render() {
    return (
      <React.Fragment>
        <h5 className="m-2 text-right">
          <u>:רשימת סטודנטים הדורשים אישור</u>
        </h5>
        <Table striped bordered hover dir="rtl" className="m-2 text-right">
          <thead>
            <tr>
              <th>שם פרטי</th>
              <th>שם משפחה</th>
              <th>אישור</th>
            </tr>
          </thead>
          <tbody>{this.createTable()}</tbody>
        </Table>
      </React.Fragment>
    );
  }
}

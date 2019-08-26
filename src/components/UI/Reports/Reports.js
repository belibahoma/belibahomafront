import React, { Component } from "react";
import {
  Table,
  Card,
  Container,
  Button,
  ButtonToolbar,
  Form
} from "react-bootstrap";
import Report from "./Report/Report";
import AddAppointment from "./AddAppointment/AddAppointment";
import DynamicSelectBox from "../../../containers/DynamicSelectBox/DynamicSelectBox";
import _ from "lodash";
import config from "react-global-configuration";
import axios from "axios";
import UpdateAppointment from "./UpdateAppointment/UpdateAppointment";

export default class Reports extends Component {
  state = {
    reportList: [],
    addAppointmentTo: null,
    totalHours: 12,
    studentsList: [],
    userToken: "",
    openModal: false,
    sortBy: "type",
    asc: true,
    isView: false,
    updateValue: null
  };

  componentDidMount() {
    const userToken = localStorage.getItem("beliba-homa-auth-token");
    let userData = localStorage.getItem("beliba-homa-user");
    if (userToken && userData) {
      userData = JSON.parse(userData);
      axios
        .get(`${config.get("serverAddress")}/api/relations`, {
          headers: { "x-auth-token": userToken }
        })
        .then(res => {
          this.setState({
            user: userData,
            isLoggedIn: true,
            fname: userData.fname,
            lname: userData.lname,
            userType: userData.userType,
            relationsList: res.data,
            userToken: userToken,
            traineesList: _.uniqBy(res.data, "trainee_id")
          });
        })
        .catch(err => {
          alert(
            `${err.message}${err.response ? ": " + err.response.data : ""}`
          );
        });
      axios
        .get(`${config.get("serverAddress")}/api/reports`, {
          headers: { "x-auth-token": userToken }
        })
        .then(res => {
          const total = _.sumBy(res.data, val => {
            return val.totalTime;
          });
          this.setState({ reportList: res.data, totalHours: total });
        })
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

  addAppointment = null;

  handleSubmit = details => {
    let tempReportArr = _.cloneDeep(this.state.reportList);
    const reportIndex = tempReportArr.findIndex(report => {
      return report._id === details._id;
    });
    axios
      .get(`${config.get("serverAddress")}/api/reports/${details._id}`)
      .then(res => {
        if (reportIndex >= 0) {
          tempReportArr[reportIndex] = res.data;
        } else {
          tempReportArr.push(res.data);
        }
        const tempTotal = _.sumBy(tempReportArr, report => report.totalTime);
        this.setState({
          totalHours: tempTotal,
          openModal: false,
          reportList: tempReportArr,
          updateValue: null
        });
      })
      .catch(err => {
        console.lod("err", err.message);
      });
  };

  handleSortBy = val => {
    this.setState({ sortBy: val, asc: !this.state.asc });
  };

  handleCurrentUserChanged = event => {
    this.setState({ currentUser: event.target.value });
  };

  handleAddAppointment = () => {
    this.setState({ openModal: true });
  };
  handleEditReport = id => {
    this.setState({
      updateValue: this.state.reportList.find(report => {
        return report._id === id;
      }),
      isView: false
    });
  };
  handleDetails = id => {
    this.setState({
      updateValue: this.state.reportList.find(report => {
        return report._id === id;
      }),
      isView: true
    });
  };
  reportItems = () => {
    const studArr = _.orderBy(this.state.reportList, val => {
      return this.state.sortBy === "date"
        ? Date.parse(val[this.state.sortBy])
        : val[this.state.sortBy] || "";
    })
      .filter(item => {
        return (
          this.state.currentUser === "error" ||
          this.state.currentUser === "N/A" ||
          (item.trainee_id && this.state.currentUser === item.trainee_id._id)
        );
      })
      .map(item => {
        return (
          <Report
            {...item}
            key={item._id}
            id={item._id}
            isTrainee={this.state.userType === "trainee"}
            tutor={item.tutor_id}
            trainee={item.trainee_id}
            editReport={() => {
              this.handleEditReport(item._id);
            }}
            details={() => {
              this.handleDetails(item._id);
            }}
          />
        );
      });
    return this.state.asc ? studArr : studArr.reverse();
  };
  render() {
    if (this.state.addAppointmentTo) {
      this.addAppointment = (
        <AddAppointment className="m-2" date={Date.now()} />
      );
    }

    return (
      <React.Fragment>
        <Card
          className="text-center mt-4 ml-2 mr-2"
          border="danger"
          style={{ backgroundColor: "pink" }}
        >
          <Card.Header>
            {this.state.totalHours} :סה"כ שעות התנדבות לשנת הלימודים הנוכחית
          </Card.Header>
        </Card>
        <Form dir="rtl" className="m-2 text-right">
          <Form.Label dir="rtl">אנא בחר סטודנט</Form.Label>
          <Form.Control
            as={DynamicSelectBox}
            className="mb-2"
            dir="rtl"
            value={this.state.currentUser}
            onChange={this.handleCurrentUserChanged}
            headers={{
              "x-auth-token": localStorage.getItem("beliba-homa-auth-token")
            }}
            name="activityArea"
            fetchLink={`${config.get("serverAddress")}/api/relations`}
            filterMethod={relations => {
              const list = _.uniqBy(relations, "trainee_id");
              return list.map(relation => {
                return {
                  _id: relation.trainee_id._id,
                  name: `${relation.trainee_id.fname} ${relation.trainee_id.lname}`
                };
              });
            }}
          />
        </Form>

        <Container fluid="false">
          <ButtonToolbar className="justify-content-end">
            <Button
              variant="success"
              className="m-2"
              onClick={this.handleAddAppointment}
              disabled={this.state.userType === "trainee"}
            >
              הוסף דיווח
            </Button>
            <Button
              variant="danger"
              onClick={this.props.history.goBack}
              className="m-2"
            >
              חזור לקשרי למידה משותפת
            </Button>
          </ButtonToolbar>
          <Table
            striped
            bordered
            hover
            className="text-center mt-2 align-content-center align-items-center"
          >
            <thead>
              <tr>
                <th colSpan="2">כלים</th>
                <th
                  onClick={() => {
                    this.handleSortBy("creationTime");
                  }}
                >
                  זמן יצירה
                </th>
                <th
                  onClick={() => {
                    this.handleSortBy("chavrutaTime");
                  }}
                >
                  שעות חברותא
                </th>
                <th>שעות חונכות</th>
                <th
                  onClick={() => {
                    this.handleSortBy("trainee_id");
                  }}
                >
                  שם חניך
                </th>
                <th>שם חונך</th>
                <th
                  onClick={() => {
                    this.handleSortBy("type");
                  }}
                >
                  סוג מפגש
                </th>
              </tr>
            </thead>
            <tbody>{this.reportItems()}</tbody>
          </Table>
          {this.state.openModal ? (
            <AddAppointment
              className="m-2"
              onCancel={() => {
                this.setState({ openModal: false });
              }}
              onSubmit={this.handleSubmit}
              tutor={this.state.user}
              trainee={this.state.currentUser} //TODO change to trainee
              date={Date.now()}
            />
          ) : (
            ""
          )}
          {this.state.updateValue ? (
            <UpdateAppointment
              className="m-2"
              onCancel={() => {
                this.setState({ updateValue: null });
              }}
              onSubmit={this.handleSubmit}
              tutor={this.state.user}
              trainee={this.state.currentUser} //TODO change to trainee
              appointment={this.state.updateValue}
              readOnly={this.state.isView}
            />
          ) : null}
        </Container>
      </React.Fragment>
    );
  }
}

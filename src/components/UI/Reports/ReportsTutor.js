import React, { Component } from "react";
import {
  Table,
  Card,
  Container,
  Button,
  ButtonToolbar,
  Form,
  Row
} from "react-bootstrap";
import Report from "./Report/Report";
import AddAppointment from "./AddAppointment/AddAppointment";
import _ from "lodash";
import config from "react-global-configuration";
import axios from "axios";
import UpdateAppointment from "./UpdateAppointment/UpdateAppointment";
import queryString from "query-string";

export default class ReportsTrainee extends Component {
  state = {
    reportList: [],
    addAppointmentTo: null,
    totalHours: 0,
    tutor: "",
    trainee: "",
    studentsList: [],
    userToken: "",
    openModal: false,
    sortBy: "type",
    asc: true,
    isView: false,
    updateValue: null,
    reportYear: 'תשפ"א',
    reportType: false
  };

  componentDidMount() {
    const userToken = localStorage.getItem("beliba-homa-auth-token");
    let userData;
    if (this.props.traineeInfo) {
      userData = this.props.traineeInfo
    } else {
      userData = JSON.parse(localStorage.getItem("beliba-homa-user"));
    }
    
    if (userToken && userData) {
      //userData = JSON.parse(userData);
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
            relationsList: res.data.filter(relation => {
              return (
                relation.tutor_id && relation.tutor_id._id === userData._id
              );
            }),
            userToken: userToken,
            traineesList: _.uniqBy(
              res.data.filter(relation => {
                return (
                  relation.tutor_id &&
                  relation.tutor_id._id === userData._id
                );
              }),
              "tutor_id"
            )
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
          let reports = res.data.filter(report => {
            return (
              report.tutor_id && report.tutor_id._id === userData._id
            );
          });
          let filtered = reports.filter(report => report.reportYear === this.state.reportYear);
          const total = _.sumBy(filtered, val => {
            return val.totalTime;
          });
          this.setState({reports: reports, reportList: filtered, totalHours: total, reportYear: this.state.reportYear});
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
        const tempTotal = _.sumBy(
          tempReportArr,
          report => report.timeForTrainee
        );
        this.setState({
          totalHours: tempTotal,
          openModal: false,
          reportList: tempReportArr,
          updateValue: null
        });
      })
      .catch(err => {
        console.lod(
          `${err.message}${err.response ? ": " + err.response.data : ""}`
        );
      });
  };

  handleSortBy = val => {
    this.setState({ sortBy: val, asc: !this.state.asc });
  };
  handleReportYearChanged = event => {
    if (this.state.reports) {
      let filtered = this.state.reports.filter(report => report.reportYear === event.target.value);
    const total = _.sumBy(filtered, val => {
      return val.totalTime;
    });
    this.setState({ reportYear: event.target.value, reportList: filtered,  totalHours: total,});
    }
    
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
  handleReportTypeChanged = event => {
      this.setState({ reportType: !this.state.reportType});
    }


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
          item.trainee_id||
          this.state.reportType
        );
      })
      .map(item => {
        return (
          <Report
            {...item}
            key={item._id}
            id={item._id}
            isTrainee={true}
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
        <Form dir='rtl' align='right'>
        <Form.Label dir='rtl'>שנת דיווח </Form.Label>
              <Form.Control as="select" 
              value={this.state.reportYear}
              onChange={this.handleReportYearChanged}
              >
                <option>תשפ"א</option>
                <option>תש"פ</option>
          </Form.Control>

        </Form>
        <Form dir='rtl' align='right'>
          <Form.Label dir='rtl'>סוג דיווח </Form.Label>
          <Form.Control as="select"
                        onChange={this.handleReportTypeChanged}
          >
            <option>שעות חניכה</option>
            <option>כל סוגי השעות</option>
          </Form.Control>

        </Form>



        <Card
          className="text-center mt-4 ml-2 mr-2"
          border="danger"
          style={{ backgroundColor: "pink" }}
        >
          <Card.Header>
            {this.state.totalHours} :סה"כ שעות חניכה לשנת הלימודים הנוכחית
          </Card.Header>
        </Card>

        <Container fluid="false">
        {!this.props.traineeInfo &&
          <ButtonToolbar className="justify-content-end">
           <Button
              variant="danger"
              onClick={!this.props.traineeInfo ? null : this.props.history.goBack}
              className="m-2"
            >
              חזור לקשרי למידה משותפת
            </Button>
          </ButtonToolbar>}
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
                    this.handleSortBy("reportYear");
                  }}
                >
                  שנת דיווח
                </th>
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
                <th>שעות למידה משותפת</th>
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
              tutor={this.state.tutor}
              trainee={this.state.trainee} //TODO change to trainee
              appointment={this.state.updateValue}
              readOnly={this.state.isView}
            />
          ) : null}
        </Container>
      </React.Fragment>
    );
  }
}

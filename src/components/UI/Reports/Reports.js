import React, { Component } from "react";
import { Table, Card, Container, Button, ButtonToolbar } from "react-bootstrap";
import Report from "./Report/Report";
import AddAppointment from "./AddAppointment/AddAppointment";

export default class Reports extends Component {
  state = {
    reportList: [
      {
        id: 1,
        tutor: { link: "tutor/789", name: "matanya" },
        trainee: "shmulik",
        studyTime: 4,
        companionshipTime: 1,
        creationTime: new Date(2011, 5, 1, 0, 0, 0, 0)
      },
      {
        id: 2,
        tutor: { link: "tutor/789", name: "matanya" },
        trainee: "shmulik",
        studyTime: 4,
        companionshipTime: 1,
        creationTime: new Date(2011, 2, 1, 0, 0, 0, 0)
      },
      {
        id: 3,
        tutor: { link: "tutor/789", name: "matanya" },
        trainee: "shmulik",
        studyTime: 4,
        companionshipTime: 1,
        creationTime: new Date(2011, 4, 1, 0, 0, 0, 0)
      }
    ],
    addAppointmentTo: null,
    totalHours: 12
  };
  addAppointment = null;

  handleAddAppointment = id => {
    this.setState({ addAppointmentTo: id });
    console.log(id);
  };
  handleEditReport = id => {
    console.log(id);
  };
  handleDetails = id => {
    console.log(id);
  };
  reportItems = this.state.reportList
    .sort((a, b) => {
      return new Date(b.creationTime) - new Date(a.creationTime);
    })
    .map(item => {
      return (
        <Report
          key={item.id}
          {...item}
          addAppointment={() => {
            this.handleAddAppointment(item.id);
          }}
          editReport={() => {
            this.handleEditReport(item.id);
          }}
          details={() => {
            this.handleDetails(item.id);
          }}
        />
      );
    });
  render() {
    if (this.state.addAppointmentTo) {
      const appointment = this.state.reportList.filter(
        value => value.id === this.state.addAppointmentTo
      )[0];
      console.log(appointment);
      this.addAppointment = (
        <AddAppointment
          className="m-2"
          date={new Date(appointment.creationTime)}
        />
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
            {this.state.totalHours} :סה"כ שעות התנדבות עם סטודנט זה לשנת
            הלימודים הנוכחית
          </Card.Header>
        </Card>

        <Container fluid="false">
          <ButtonToolbar className="justify-content-end">
            <Button variant="success" className="m-2">
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
          <Table striped bordered hover className="text-center mt-2">
            <thead>
              <tr>
                <th colSpan="2">כלים</th>
                <th>זמן יצירה</th>
                <th>שעות חברותא</th>
                <th>שעות חונכות</th>
                <th>שם חניך</th>
                <th>שם חונך</th>
              </tr>
            </thead>
            <tbody>{this.reportItems}</tbody>
          </Table>
          {this.addAppointment}
        </Container>
      </React.Fragment>
    );
  }
}

import React, { Component } from "react";
// import { Link } from "react-router-dom";
import config from "react-global-configuration";
import server from "../../../server/server"
import {Jumbotron, Tabs, Tab} from "react-bootstrap";
import TraineeForm from "./TraineeForm";
import ReportsTrainee from "../Reports/ReportsTrainee";
import ReportsTutor from "../Reports/ReportsTutor";
import ReportsId from "../Reports/ReportsId";

export default class studentDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student_id: this.props.match.params.id,
      isTutor: /.*tutor.*/i.test(window.location.href),
    };
  }

  componentDidMount() {
    console.log(this.state.isTutor)
    if(this.state.isTutor)
      server.asAdmin.getTutor(this.state.student_id, this, 'studentInfo');
    else
      server.asAdmin.getTrainee(this.state.student_id, this, 'studentInfo');
  }
  

  render() {
      return <React.Fragment>
              <Jumbotron dir="rtl">
                <h1 class="text-center">{this.state.studentInfo ? this.state.studentInfo.lname + " " + this.state.studentInfo.fname : "טוען..." } </h1>
                  
              </Jumbotron>
              <Tabs defaultActiveKey="details" id="uncontrolled-tab-example" dir="rtl">
                  <Tab eventKey="details" title="פרטים אישיים">
                      <br />
                      {this.state && !this.state.isTutor && this.state.studentInfo && <TraineeForm readOnly={true} traineeInfo={this.state.studentInfo}/>}
                      {this.state && this.state.isTutor && this.state.studentInfo && "ניתן להציג כרגע רק שעות חונכות בטאב השני ,טאב פרטי חונך עוד בבניה, ניתן לגשת אליהם דרך עריכה בטבלת החונכים"}  
                  </Tab>
              <Tab eventKey="relations" title="חונכות">
                 {this.state && !this.state.isTutor && this.state.studentInfo && <ReportsTrainee traineeInfo={this.state.studentInfo}/>}
                 {this.state && this.state.isTutor && this.state.studentInfo && <ReportsTutor traineeInfo={this.state.studentInfo}/>}  
              </Tab>
            </Tabs>
      </React.Fragment>;
  }
}

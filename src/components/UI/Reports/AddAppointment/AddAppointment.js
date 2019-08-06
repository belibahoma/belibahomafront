import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import NormalAppointment from "./NormalAppointment/NormalAppointment";
import OtherAppointment from "./OtherAppointment/OtherAppointment";
import GroupAppointment from "./GroupAppointment/GroupAppointment";

export default class AddAppointment extends Component {
  state = {
    isImpact: false,
    reportModalShow: true,
    formType: null
  };

  appointment = null;

  render() {
    if (this.state.formType && this.state.formType === "normal") {
      this.appointment = <NormalAppointment date={this.props.date} />;
    } else if (this.state.formType && this.state.formType === "group") {
      this.appointment = <GroupAppointment />;
    } else if (this.state.formType && this.state.formType === "other") {
      this.appointment = <OtherAppointment />;
    }

    return (
      <React.Fragment>
        <Modal
          show={this.state.reportModalShow}
          onHide={() => {
            this.setState({ reportModalShow: false });
          }}
        >
          <Modal.Dialog>
            <Modal.Header closeButton>
              <Modal.Title>אנא בחר סוג מפגש</Modal.Title>
            </Modal.Header>

            <Modal.Body className="text-center">
              <Button
                onClick={() => {
                  this.setState({ reportModalShow: false, formType: "normal" });
                }}
                className="m-2"
                variant="primary"
              >
                מפגש רגיל
              </Button>
              <Button className="m-2" variant="primary">
                מפגש קבוצתי
              </Button>
              <Button className="m-2" variant="primary">
                שעות מלגה מוכרות אחרות
              </Button>
            </Modal.Body>
            <Modal.Footer>
              שים לב, עבור "שעות מלגה מוכרות אחרות" יש צורך באישור מהרכז
            </Modal.Footer>
          </Modal.Dialog>
        </Modal>
        {this.appointment}
      </React.Fragment>
    );
  }
}

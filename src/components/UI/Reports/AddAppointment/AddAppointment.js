import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import NormalAppointment from "./NormalAppointment/NormalAppointment";
import OtherAppointment from "./OtherAppointment/OtherAppointment";
import GroupAppointment from "./GroupAppointment/GroupAppointment";
import axios from "axios";
import config from "react-global-configuration";

export default class AddAppointment extends Component {
  state = {
    isImpact: false,
    reportModalShow: true,
    formType: null,
    isModalShow: false,
    modalType: "",
    tutor_id: this.props.tutor._id,
    trainee_id: this.props.trainee
  };

  appointment = null;

  handleModalCanceled = () => {
    //TODO
  };

  handleOtherSubmitted = values => {
    // console.log("other ", values);
    axios
      .post(`${config.get("serverAddress")}/api/reports`, {
        type: "other",
        tutor_id: this.state.tutor_id,
        ...values
      })
      .then(res => {
        this.setState({ isModalShow: false });
        this.props.onSubmit(res.data);
        // console.log("other res:", res);
      })
      .catch(err => {
        console.log(`${err.message}${err.response ? ": " + err.response.data : ""}`);
        this.setState({ isModalShow: false });
        this.props.onCancel();
      });
  };

  handleGroupSubmitted = values => {
    // console.log("group ", values);
    axios
      .post(`${config.get("serverAddress")}/api/reports`, {
        type: "group",
        tutor_id: this.state.tutor_id,
        ...values
      })
      .then(res => {
        this.setState({ isModalShow: false });
        this.props.onSubmit(res.data);
        // console.log("group res:", res);
      })
      .catch(err => {
        console.log(`${err.message}${err.response ? ": " + err.response.data : ""}`);
        this.setState({ isModalShow: false });
        this.props.onCancel();
      });
  };

  handleNormalSubmitted = values => {
    // console.log("normal ", values);
    axios
      .post(`${config.get("serverAddress")}/api/reports`, {
        type: "ordinary",
        tutor_id: this.state.tutor_id,
        trainee_id: this.state.trainee_id || null,
        ...values
      })
      .then(res => {
        this.setState({ isModalShow: false });
        this.props.onSubmit(res.data);
        // console.log("normal res:", res);
      })
      .catch(err => {
        // console.log("err", err.message, err.response.message);
        this.setState({ isModalShow: false });
        this.props.onCancel();
      });
  };

  otherAppointment = () => {
    return (
      <OtherAppointment
        date={Date.now()}
        onSubmit={this.handleOtherSubmitted}
        onCancel={() => {
          this.setState({ isModalShow: false });
          this.props.onCancel();
        }}
        isImpact={this.props.tutor.isImpact}
      />
    );
  };

  groupAppointment = () => {
    return (
      <GroupAppointment
        date={Date.now()}
        onSubmit={this.handleGroupSubmitted}
        onCancel={() => {
          this.setState({ isModalShow: false });
          this.props.onCancel();
        }}
      />
    );
  };

  ordinaryAppointment = () => {
    if (!this.state.trainee_id || this.state.trainee_id === "error") {
      alert("אנא בחר סטודנט");
      this.props.onCancel();
    } else {
      return (
        <NormalAppointment
          date={Date.now()}
          onSubmit={this.handleNormalSubmitted}
          onCancel={() => {
            this.setState({ isModalShow: false });
            this.props.onCancel();
          }}
        />
      );
    }
  };

  modalContent = () => {
    switch (this.state.modalType) {
      case "normal":
        return this.ordinaryAppointment();
      case "group":
        return this.groupAppointment();
      case "other":
        return this.otherAppointment();
      default:
        this.handleModalCanceled();
    }
  };

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
                  this.setState({
                    reportModalShow: false,
                    isModalShow: true,
                    modalType: "normal"
                  });
                }}
                className="m-2"
                variant="primary"
              >
                מפגש רגיל
              </Button>
              <Button
                onClick={() => {
                  this.setState({
                    reportModalShow: false,
                    isModalShow: true,
                    modalType: "group"
                  });
                }}
                className="m-2"
                variant="primary"
              >
                מפגש קבוצתי
              </Button>
              <Button
                className="m-2"
                variant="primary"
                onClick={() => {
                  this.setState({
                    reportModalShow: false,
                    isModalShow: true,
                    modalType: "other"
                  });
                }}
              >
                שעות מלגה מוכרות אחרות
              </Button>
            </Modal.Body>
            <Modal.Footer>
              שים לב, עבור "שעות מלגה מוכרות אחרות" יש צורך באישור מהרכז
            </Modal.Footer>
          </Modal.Dialog>
        </Modal>
        <Modal show={this.state.isModalShow} onAbort={this.modalCanceled}>
          <Modal.Header dir="rtl" className="text-center">
            <Modal.Title className="m-2">הוסף מפגש רגיל</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.modalContent()}</Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }
}

import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import config from "react-global-configuration";
import axios from "axios";
import OtherAppointment from "./../AddAppointment/OtherAppointment/OtherAppointment";
import GroupAppointment from "./../AddAppointment/GroupAppointment/GroupAppointment";
import NormalAppointment from "./../AddAppointment/NormalAppointment/NormalAppointment";

export default class UpdateAppointment extends Component {
  state = {
    _id: this.props.appointment._id,
    isImpact: false,
    reportModalShow: true,
    formType: null,
    isModalShow: true,
    modalType: "",
    tutor_id: this.props.tutor._id,
    trainee_id: this.props.trainee,
    appointment: this.props.appointment
  };

  componentDidMount() {
    this.setState({ isModalShow: true });
  }

  handleModalCanceled = () => {
    //TODO
  };

  handleOtherSubmitted = values => {
    console.log("other ", values);
    axios
      .put(`${config.get("serverAddress")}/api/reports/${this.state._id}`, {
        type: "other",
        tutor_id: this.state.tutor_id,
        ...values
      })
      .then(res => {
        this.setState({ isModalShow: false });
        this.props.onSubmit(res.data);
        console.log(res);
      })
      .catch(err => {
        console.log("err", err.message);
        this.setState({ isModalShow: false });
        this.props.onCancel();
      });
  };

  handleGroupSubmitted = values => {
    console.log("group ", values);
    axios
      .put(`${config.get("serverAddress")}/api/reports/${this.state._id}`, {
        type: "group",
        tutor_id: this.state.tutor_id,
        ...values
      })
      .then(res => {
        this.setState({ isModalShow: false });
        this.props.onSubmit(res.data);
        console.log(res);
      })
      .catch(err => {
        console.log("err", err.message);
        this.setState({ isModalShow: false });
        this.props.onCancel();
      });
  };

  handleNormalSubmitted = values => {
    console.log("normal ", values);
    axios
      .put(`${config.get("serverAddress")}/api/reports/${this.state._id}`, {
        type: "ordinary",
        tutor_id: this.state.tutor_id,
        trainee_id: this.props.appointment.trainee_id._id || null,
        ...values
      })
      .then(res => {
        this.setState({ isModalShow: false });
        this.props.onSubmit(res.data);
        console.log(res);
      })
      .catch(err => {
        console.log("err", err.message);
        this.setState({ isModalShow: false });
        this.props.onCancel();
      });
  };

  otherAppointment = () => {
    return (
      <OtherAppointment
        readOnly={this.props.readOnly}
        date={Date.now()}
        isUpdate={true}
        onSubmit={this.handleOtherSubmitted}
        onCancel={() => {
          this.setState({ isModalShow: false });
          this.props.onCancel();
        }}
        formValues={this.state.appointment}
        isImpact={this.props.tutor.isImpact}
      />
    );
  };

  groupAppointment = () => {
    return (
      <GroupAppointment
        readOnly={this.props.readOnly}
        date={Date.now()}
        isUpdate={true}
        onSubmit={this.handleGroupSubmitted}
        onCancel={() => {
          this.setState({ isModalShow: false });
          this.props.onCancel();
        }}
        formValues={this.state.appointment}
      />
    );
  };

  ordinaryAppointment = () => {
    return (
      <NormalAppointment
        readOnly={this.props.readOnly}
        isUpdate={true}
        onSubmit={this.handleNormalSubmitted}
        onCancel={() => {
          this.setState({ isModalShow: false });
          this.props.onCancel();
        }}
        formValues={this.state.appointment}
        date={this.state.appointment.date}
      />
    );
  };

  modalContent = () => {
    switch (this.props.appointment.type) {
      case "ordinary":
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
    return (
      <Modal
        show={this.state.isModalShow}
        onHide={this.props.onCancel}
        onAbort={this.props.onCancel}
      >
        <Modal.Header dir="rtl" className="text-center">
          <Modal.Title className="m-2">
            {this.props.readOnly ? "פרטי המפגש" : "ערוך מפגש"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{this.modalContent()}</Modal.Body>
      </Modal>
    );
  }
}

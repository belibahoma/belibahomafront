import React, { Component } from "react";
import axios from "axios";
import { Form, Button, Jumbotron, Modal } from "react-bootstrap";
import { ValidatorForm } from "react-form-validator-core";
import TextValidator from "../../components/Validators/TextValidator/TextValidator";

export default class Auth extends Component {
  state = {
    username: "",
    password: "",
    token: "",
    loginModalShow: false
  };

  handleSubmit = event => {
    this.props.onModalClosed();
    axios
      .post("http://localhost:8080/api/auth", {
        username: this.state.username,
        password: this.state.password
      })
      .then(res => {
        console.log(res.data);
        this.setState({ token: res.data });
      });
    this.props.handleAuth({
      username: this.state.username,
      password: this.state.password,
      token: this.state.token
    });
  };
  handleError = obj => {
    console.log(obj);
  };

  handlePasswordChanged = event => {
    this.setState({ password: event.target.value });
  };

  handleUsernameChanged = event => {
    this.setState({ username: event.target.value });
  };

  render() {
    if (this.state.loginModalShow !== this.props.loginModalShow)
      this.setState({ loginModalShow: this.props.loginModalShow });
    return (
      <Modal show={this.props.loginModalShow} onHide={this.props.onModalClosed}>
        <Modal.Dialog>
          <Modal.Title className="text-center">התחבר</Modal.Title>
          <Modal.Body>
            {/* <Jumbotron className="text-right"> */}
            <Form
              as={ValidatorForm}
              onError={this.handleError}
              ref="form"
              onSubmit={this.handleSubmit}
              className="text-right"
            >
              <Form.Group controlId="formBasicEmail">
                <Form.Label>שם משתמש</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="הכנס שם משתמש"
                  value={this.state.username}
                  validators={["required"]}
                  errorMessages={["שדה זה הינו חובה"]}
                  onChange={this.handleUsernameChanged}
                  as={TextValidator}
                  name="username"
                  className="text-right"
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>סיסמא</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="הכנס סיסמא"
                  name="password"
                  as={TextValidator}
                  validators={["required"]}
                  errorMessages={["שדה זה הינו חובה"]}
                  value={this.state.password}
                  onChange={this.handlePasswordChanged}
                  className="text-right"
                />
              </Form.Group>
              <Form.Group className="text-left">
                <Button
                  variant="primary"
                  className="btn btn-danger mr-2"
                  type="button"
                  onClick={this.props.onModalClosed}
                >
                  ביטול
                </Button>
                <Button variant="primary" type="submit">
                  כניסה
                </Button>
              </Form.Group>
            </Form>
            {/* </Jumbotron> */}
          </Modal.Body>
        </Modal.Dialog>
      </Modal>
    );
  }
}

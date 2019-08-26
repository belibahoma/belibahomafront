import React, { Component } from "react";
import { Card, Container, Jumbotron, Row, Col, Button } from "react-bootstrap";
import faker from "faker";
import socketIOClient from "socket.io-client";
import { Avatar } from "material-ui/Avatar";

class Chat extends Component {
  state = {
    endpoint: "localhost:4002",
    message: "",
    name: "",
    allMessages: [],
    avatar: "",
    userData: {}
  };

  componentDidMount = () => {
    document.body.classList.toggle("chat");
    const userToken = localStorage.getItem("beliba-homa-auth-token");
    let userData = localStorage.getItem("beliba-homa-user");
    console.log(userData);
    if (userToken && userData) {
      const avatar = faker.image.avatar();
      const avatar2 = faker.image.avatar();
      userData = JSON.parse(userData);
      console.log(userData);
      this.setState({
        name: userData.fname,
        avatar: avatar,
        avatar2: avatar2
      });
      const socket = socketIOClient(this.state.endpoint);
      socket.on("message", message => {
        if (message.name !== this.state.name) {
          let arr = this.state.allMessages;
          arr.push(message);
          this.setState({ allMessages: arr });
        }
      });
    } else {
      alert("אנא התחבר");
      this.props.history.push("/");
    }
  };

  componentWillUnmount() {
    document.body.classList.remove("chat");
  }

  updateMessage = e => {
    this.setState({ message: e.target.value });
  };

  render() {
    // const socket = socketIOClient(this.state.endpoint);
    return (
      <Container>
        <Row dir="rtl">
          <Col sm={0.5}>
            <img
              className="float-right align-content-center"
              style={{ borderRadius: "50%", width: "50px", height: "50px" }}
              src={this.state.avatar}
            ></img>
          </Col>
          <Col sm={1} dir="rtl">
            <h6 className="mt-2">{this.state.name}</h6>
          </Col>
          <Col sm={2}>
            <p className="text-muted float-right mt-2" dir="rtl">
              {this.state.allMessages.length + " " + "הודעות"}
            </p>
          </Col>
        </Row>
        <Container
          className="container-fluid m-1"
          style={{ width: "100%", height: "500px", overflow: "auto" }}
        >
          {this.renderMessages()}
        </Container>
        <Row dir="rtl">
          <Col sm={10}>
            <textarea
              style={{ width: "100%", borderRadius: "5px" }}
              onChange={this.updateMessage}
              value={this.state.message}
            >
              {this.state.message}
            </textarea>
          </Col>
          <Col sm={1}>
            <Button className="float-right mt-2" onClick={this.send}>
              שלח
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
  send = () => {
    let newMessage = {
      type: "send",
      content: this.state.message,
      name: this.state.name,
      time: this.getTime()
    };
    let arr = this.state.allMessages;
    arr.push(newMessage);
    this.setState({ allMessages: arr });
    this.setState({ message: "" });

    let sendMessage = { ...newMessage };
    sendMessage.type = "recieve";
    const socket = socketIOClient(this.state.endpoint);
    socket.emit("message", sendMessage);
  };
  getTime() {
    let date = new Date();
    return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  }

  renderMessages() {
    return this.state.allMessages.map(message => this.getMessage(message));
  }

  getMessage(message) {
    if (message.type == "send") {
      return (
        <Card.Body dir="rtl" className="d-flex m-0">
          <Row dir="rtl">
            <Col sm={0.5}>
              <img
                className="float-right align-content-center"
                style={{ borderRadius: "50%", width: "50px", height: "50px" }}
                src={this.state.avatar}
              ></img>
              <br />
              <p className="text-muted float-right mt-0 text-right" dir="rtl">
                {message.time}
              </p>
            </Col>
            <Col sm={2} dir="rtl">
              <Card
                body
                className="float-right"
                dir="rtl"
                style={{ backgroundColor: "#90E3AC" }}
              >
                {message.content}
              </Card>
            </Col>
          </Row>
        </Card.Body>
      );
    }

    if (message.type == "recieve") {
      //#6647F0
      const socket = socketIOClient(this.state.endpoint);
      return (
        <Card.Body dir="ltr" className="d-flex m-0">
          <Row dir="ltr">
            <Col sm={0.5}>
              <img
                className="float-right align-content-center"
                style={{ borderRadius: "50%", width: "50px", height: "50px" }}
                src={this.state.avatar2}
              ></img>
              <br />
              <p className="text-muted float-right mt-0 text-right" dir="rtl">
                {message.time}
              </p>
            </Col>
            <Col sm={2} dir="rtl">
              <Card
                body
                className="float-left"
                dir="rtl"
                style={{ backgroundColor: "#6647F0" }}
              >
                {message.content}
              </Card>
            </Col>
          </Row>
        </Card.Body>
      );
    }
  }
}

export default Chat;

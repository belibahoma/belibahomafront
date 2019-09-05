import React, { Component } from "react";
import { Button, Table } from "react-bootstrap";
import config from "react-global-configuration";
import axios from "axios";

export default class Relations extends Component {
  state = {
    relationList: [],
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
          .get(`${config.get("serverAddress")}/api/relations`, {
            headers: { "x-auth-token": userToken }
          })
          .then(res =>
            this.setState({ relationList: res.data, userToken: userToken })
          )
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

  handleDelete = _id => {
    axios
      .delete(`${config.get("serverAddress")}/api/relations/` + _id, null, {
        headers: { "x-auth-token": this.state.userToken }
      })
      .then(res =>
        this.setState({
          relationsList: this.state.relationList.filter(relation => {
            return relation._id !== _id;
          })
        })
      )
      .catch(err => {
        alert(`${err.message} ${err.response ? ": " + err.response.data : ""}`);
      });
  };

  relationRows = () => {
    return this.state.relationList.map(relation => {
      return (
        <tr key={relation._id}>
          <td />
          <td>{relation.tutor_id.fname}</td>
          <td>{relation.tutor_id.lname}</td>
          <td>{relation.trainee_id.fname}</td>
          <td>{relation.trainee_id.lname}</td>
          <td>
            <Button
              className="btn btn-danger"
              onClick={() => {
                this.handleDelete(relation._id);
              }}
            >
              הסר
            </Button>
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <Table
        striped
        bordered
        hover
        dir="rtl"
        className="text-right align-items-center"
      >
        <tr>
          <th />
          <th>שם פרטי מתגבר</th>
          <th>שם משפחה מתגבר</th>
          <th>שם פרטי מתגבר</th>
          <th>שם משפחה מתגבר</th>
          <th>הסר</th>
        </tr>
        <tbody>{this.relationRows()}</tbody>
      </Table>
    );
  }
}

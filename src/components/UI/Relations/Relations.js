import React, { Component } from "react";
import { Button, Table, Form } from "react-bootstrap";
import config from "react-global-configuration";
import axios from "axios";

export default class Relations extends Component {
  state = {
    relationList: [],
    userToken: "",
    showInActive: false
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

  handleReport = report => {
    this.props.history.push(
      `/reports/singleReport?tutor=${report.tutor_id._id}&trainee=${report.trainee_id._id}`
    );
  };

  handleDelete = _id => {
    axios
      .delete(`${config.get("serverAddress")}/api/relations/` + _id, {
        headers: { "x-auth-token": this.state.userToken }
      })
      .then(res => {
        alert("הנתונים עודכנו בהצלחה");
        let tmpRelations = this.state.relationList;
        const relationToUpdateIndex = tmpRelations.findIndex(relation => {
          return relation._id === _id;
        });
        tmpRelations[relationToUpdateIndex] = res.data;
        this.setState({
          relationList: tmpRelations
        });
      })
      .catch(err => {
        alert(`${err.message} ${err.response ? ": " + err.response.data : ""}`);
      });
  };

  handleActive = _id => {
    let relationToUpdate = this.state.relationList.find(relation => {
      return relation._id === _id;
    });
    relationToUpdate.isActive = true;
    axios
      .put(
        `${config.get("serverAddress")}/api/relations/` + _id,
        relationToUpdate,
        {
          headers: { "x-auth-token": this.state.userToken }
        }
      )
      .then(res => {
        alert("הנתונים עודכנו בהצלחה");
        let tmpRelations = this.state.relationList;
        const relationToUpdateIndex = tmpRelations.findIndex(relation => {
          return relation._id === _id;
        });
        tmpRelations[relationToUpdateIndex] = res.data;
        this.setState({
          relationList: tmpRelations
        });
      })
      .catch(err => {
        alert(`${err.message} ${err.response ? ": " + err.response.data : ""}`);
      });
  };

  relationRows = () => {
    return this.state.relationList
      .filter(relation => {
        return relation.isActive || this.state.showInActive;
      })
      .map(relation => {
        return (
          <tr key={relation._id}>
            <td>
              <Button
                className="btn btn-primary"
                onClick={() => {
                  this.handleReport(relation);
                }}
              >
                עבור לדיווחים
              </Button>
            </td>
            <td>{relation.tutor_id.fname}</td>
            <td>{relation.tutor_id.lname}</td>
            <td>{relation.trainee_id.fname}</td>
            <td>{relation.trainee_id.lname}</td>
            <td>
              {relation.isActive ? (
                <Button
                  className="btn btn-danger"
                  onClick={() => {
                    this.handleDelete(relation._id);
                  }}
                >
                  הפוך ללא פעיל
                </Button>
              ) : (
                <Button
                  className="btn btn-primary"
                  onClick={() => {
                    this.handleActive(relation._id);
                  }}
                >
                  הפוך לפעיל
                </Button>
              )}
            </td>
          </tr>
        );
      });
  };

  render() {
    return (
      <React.Fragment>
        <Form className="text-right">
          <Form.Label dir="rtl" className="h6 text-danger">
            האם להציג קשרים לא פעילים?
          </Form.Label>
          <Form.Check
            checked={this.state.showInActive}
            onChange={() => {
              this.setState({ showInActive: !this.state.showInActive });
            }}
          ></Form.Check>
        </Form>
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
      </React.Fragment>
    );
  }
}

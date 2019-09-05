import React, { Component } from "react";
import axios from "axios";
import MultyTableGeneric from "../../../containers/MultyTableGeneric/MultyTableGeneric";
import { Modal, Button, Form } from "react-bootstrap";
// import DynamicSelectBox from './../../../containers/DynamicSelectBox/DynamicSelectBox';
import config from "react-global-configuration";
// import BootstrapTable from 'react-bootstrap-table-next';
// import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

export default class ActivityAreas extends Component {
  constructor(props) {
    super(props);
    // console.log(props);

    this.state = {
      TableColumns: [
        {
          dataField: "name",
          text: "איזור פעילות",
          sort: true
        }
      ],

      areas: [],
      isShowing: false,
      editIsShoing: false,
      areaId: "",
      areaName: ""
    };
  }

  componentDidMount() {
    axios
      .get(`${config.get("serverAddress")}/api/areas`)
      .then(response => {
        this.setState({ areas: response.data });
      })
      .catch(function(error) {
        // console.log(error);
      });
  }

  toggleModal_addItem = () => {
    // console.log("isShowing:" + this.state.isShowing);
    this.setState({
      isShowing: !this.state.isShowing
    });
  };

  toggleModal_editItem = () => {
    // console.log("editIsShoing:" + this.state.editIsShoing);
    this.setState({
      editIsShoing: !this.state.editIsShoing
    });
  };

  //==========

  handleareaNameChanged = event => {
    this.setState({ areaName: event.target.value });
    // console.log("areaName: " + event.target.value);
  };

  formValidate = params => {
    let valid = this.state.areaName !== "";
    return valid;
  };

  hadleDelete = params => {
    axios
      .delete(`${config.get("serverAddress")}/api/areas/` + params._id)
      .then(response => {
        const _areas = this.state.areas.filter(m => m._id !== params._id);
        this.setState({ areas: [..._areas] });
      })
      .catch(err => {
        alert(`${err.message}${err.response ? ": " + err.response.data : ""}`);
        // console.log(err);
      });
  };

  hadleEdit = params => {
    this.setState({ areaName: params.name });
    this.setState({ areaId: params._id });
    this.toggleModal_editItem();
  };

  handleSubmitEdit = params => {
    const dataToPut = {
      name: this.state.areaName
    };

    axios
      .put(
        `${config.get("serverAddress")}/api/areas/` + this.state.areaId,
        dataToPut
      )
      .then(res => {
        const _areas = this.state.areas.filter(
          m => m._id !== this.state.areaId
        );
        this.setState(prevState => ({
          areas: [res.data, ..._areas]
        }));

        this.setState({ areaName: "" });
        this.setState({ areaId: "" });
        this.toggleModal_editItem();
      })
      .catch(err => {
        alert(`${err.message}${err.response ? ": " + err.response.data : ""}`);
        // console.log(err);
      });
  };

  handleSubmit = val => {
    const dataToPost = {
      name: this.state.areaName
    };

    axios
      .post(`${config.get("serverAddress")}/api/areas`, dataToPost)
      .then(res => {
        alert(". המידע נשלח בהצלחה, האיזור התווסף");
        this.setState(prevState => ({
          areas: [res.data, ...prevState.areas]
        }));

        this.setState({ areaName: "" });
        this.setState({ areaId: "" });
        this.toggleModal_addItem();
      })
      .catch(err => {
        alert(`${err.message}${err.response ? ": " + err.response.data : ""}`);
        this.setState({ isLoading: false });
      });
  };

  //============

  render() {
    return (
      <div className="container">
        <Modal
          show={this.state.isShowing}
          onHide={this.toggleModal_addItem}
          style={{ textAlign: "right" }}
        >
          <Modal.Header>
            <Modal.Title style={{ margin: "0 auto " }}>
              הוספת איזור פעילות
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formGroupareaName">
                <Form.Label>:איזור </Form.Label>
                <Form.Control
                  dir="rtl"
                  NavItem="areaName"
                  placeholder="הקלד את שם האיזור"
                  value={this.state.areaName}
                  onChange={this.handleareaNameChanged}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.toggleModal_addItem}>
              בטל
            </Button>
            <Button
              onClick={this.handleSubmit}
              className="m-2 "
              type="submit"
              disabled={this.formValidate() ? null : "disabled"}
            >
              שמור
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={this.state.editIsShoing}
          onHide={this.toggleModal_editItem}
          style={{ textAlign: "right" }}
        >
          <Modal.Header>
            <Modal.Title style={{ margin: " 0 auto " }}>
              עריכת איזור פעילות
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formGroupareaName">
                <Form.Label>:שם האיזור</Form.Label>
                <Form.Control
                  dir="rtl"
                  NavItem="areaName"
                  placeholder="הקלד את איזור הפעילות"
                  value={this.state.areaName}
                  onChange={this.handleareaNameChanged}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.toggleModal_editItem}>
              בטל שינויים
            </Button>
            <Button
              onClick={this.handleSubmitEdit}
              className="m-2 "
              type="submit"
              disabled={this.formValidate() ? null : "disabled"}
            >
              שמור שינויים
            </Button>
          </Modal.Footer>
        </Modal>

        <h1
          style={{
            borderRadius: "0.25em",
            textAlign: "center",
            border: "1px solid purple",
            padding: "0.5em"
          }}
        >
          איזורי פעילות
        </h1>
        <button
          className="btn btn-outline-primary"
          onClick={this.toggleModal_addItem}
          style={{ float: "left" }}
        >
          הוסף איזור פעילות
        </button>
        <MultyTableGeneric
          ColumnNames={this.state.TableColumns}
          data={this.state.areas}
          hadleDelete={this.hadleDelete}
          hadleEdit={this.hadleEdit}
        />
      </div>
    );
  }
}

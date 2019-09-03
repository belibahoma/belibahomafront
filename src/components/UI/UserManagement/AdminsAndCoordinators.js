import React, { Component } from "react";
import { ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import axios from "axios";
import MultyTableGeneric from "../../../containers/MultyTableGeneric/MultyTableGeneric";
import { Modal, Button, Form } from "react-bootstrap";
// import DynamicSelectBox from "./../../../containers/DynamicSelectBox/DynamicSelectBox";
import config from "react-global-configuration";
// import BootstrapTable from "react-bootstrap-table-next";
// import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import MultiSelectReact from "multi-select-react";

export default class AdminsAndCoordinators extends Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      TableColumns: [
        {
          dataField: "activityAreas",
          text: "איזורי פעילות",
          sort: true,
          formatter: (value, row, index) => {
            if (value !== undefined)
              return value.map((item, index) => item.name + "\n");
            else return "";
          }
        },
        {
          dataField: "phone",
          text: "מספר פלאפון",
          sort: true
        },
        {
          dataField: "email",
          text: "כתובת מייל",
          sort: true
        },
        {
          dataField: "userType",
          text: "סוג משתמש",
          sort: true,
          formatter: (value, row, index) => {
            return value === "coordinator"
              ? "רכז"
              : value === "admin"
              ? "אדמין"
              : "";
          }
        },
        {
          dataField: "fname",
          formatter: (value, row, index) => {
            return row.lname + ", " + value;
          },
          text: "שם מלא",
          sort: true
        }
      ],

      adminsAndCoordinators: [],
      isShowing: false,
      editIsShoing: false,
      areas: [],

      aAc_Id: "",
      aAcId: "",
      aAcPass: "",
      aAcfName: "",
      aAclName: "",
      aAcType: "", // admin/coordinator
      aAcEmail: "",
      aAcPhone: "",
      aAcActivityAreas: [],
      activityAreasNames: []
    };
  }

  componentDidMount() {
    // axios.all([
    //     axios.get(`${config.get("serverAddress")}/api/Coordinators`),
    //     axios.get(`${config.get("serverAddress")}/api/Admins`)])
    //     .then(axios.spread((admins, coords) => {
    //         this.setState({ adminsAndCoordinators: [...admins.data, ...coords.data] });
    //     }));

    const userToken = localStorage.getItem("beliba-homa-auth-token");
    let userData = localStorage.getItem("beliba-homa-user");
    console.log(userToken);
    if (userToken && userData) {
      userData = JSON.parse(userData);
      if (userData.userType === "admin" || userData.userType === "coordinator")
        axios
          .get(`${config.get("serverAddress")}/api/Coordinators`, {
            headers: { "x-auth-token": userToken }
          })
          .then(res => {
            console.log(res.data);
            this.setState(prevState => ({
              user: userData,
              isLoggedIn: true,
              fname: userData.fname,
              lname: userData.lname,
              userType: userData.userType,
              adminsAndCoordinators: [
                ...prevState.adminsAndCoordinators,
                ...res.data
              ],
              userToken: userToken
            }));
          })
          .catch(err => {
            alert(
              `${err.message}${err.response ? ": " + err.response.data : ""}`
            );
          });

      axios
        .get(`${config.get("serverAddress")}/api/Admins`, {
          headers: { "x-auth-token": userToken }
        })
        .then(res => {
          console.log(res.data);
          this.setState(prevState => ({
            user: userData,
            isLoggedIn: true,
            fname: userData.fname,
            lname: userData.lname,
            userType: userData.userType,
            adminsAndCoordinators: [
              ...prevState.adminsAndCoordinators,
              ...res.data
            ],
            userToken: userToken
          }));
        })
        .catch(err => {
          alert(
            `${err.message}${err.response ? ": " + err.response.data : ""}`
          );
        });
      axios
        .get(`${config.get("serverAddress")}/api/areas`, {
          headers: { "x-auth-token": userToken }
        })
        .then(res => {
          console.log(res.data);
          this.setState({
            areas: res.data,
            activityAreasNames: res.data.map(area => {
              return { label: area.name, id: area._id };
            })
            // activityAreasNames:['a','b','c']
          });
        })
        .catch(err => {
          alert(
            `${err.message}${err.response ? ": " + err.response.data : ""}`
          );
        });
    } else {
      alert("Unauthorized access");
      this.props.history.push("/");
    }
  }

  toggleModal_addItem = () => {
    console.log("isShowing:" + this.state.isShowing);
    this.setState({
      isShowing: !this.state.isShowing
    });
  };

  toggleModal_editItem = () => {
    console.log("editIsShoing:" + this.state.editIsShoing);
    this.setState({
      editIsShoing: !this.state.editIsShoing
    });
  };

  //==========
  handleIdChanged = event => {
    this.setState({ aAcId: event.target.value });
    console.log("aAcId: " + event.target.value);
  };

  handlefNameChanged = event => {
    this.setState({ aAcfName: event.target.value });
    console.log("aAcfName: " + event.target.value);
  };

  handlelNameChanged = event => {
    this.setState({ aAclName: event.target.value });
    console.log("aAclName: " + event.target.value);
  };

  handlePassChanged = event => {
    this.setState({ aAcPass: event.target.value });
  };

  handleTypeChanged = val => {
    console.log("aAcType: " + val);

    if (val === "1") this.setState({ aAcType: "admin" });
    else if (val === "2") this.setState({ aAcType: "coordinator" });
    console.log("aAcType: " + val);
  };

  handleEmailChanged = event => {
    this.setState({ aAcEmail: event.target.value });
    console.log("aAcEmail: " + event.target.value);
  };

  handleaPhoneChanged = event => {
    this.setState({ aAcPhone: event.target.value });
    console.log("aAcPhone: " + event.target.value);
  };

  handleActivityAreaChanged = value => {
    //this.setState(prevState => ({ aAcActivityAreas: [...prevState.aAcActivityAreas ,event.target.value] }));
    this.setState({ activityAreasNames: value });
  };

  formValidate = params => {
    let valid =
      this.state.aAcfName !== "" &&
      this.state.aAcType !== "" &&
      this.state.aAcId !== "";
    console.log("formValidate:" + valid);
    return valid;
  };

  resetState = () => {
    this.setState({
      aAcType: "",
      aAcfName: "",
      aAclName: "",
      aAcId: "",
      aAc_Id: "",
      aAcEmail: "",
      aAcPhone: "",
      aAcActivityAreas: "",
      aAcPass: ""
    });
  };

  hadleDelete = params => {
    const userToken = localStorage.getItem("beliba-homa-auth-token");
    console.log(params);

    if (params.userType === "admin") {
      axios
        .delete(`${config.get("serverAddress")}/api/Admins/` + params._id, {
          headers: { "x-auth-token": userToken }
        })
        .then(response => {
          alert("הפעולה בוצעה בהצלחה");
          const admins = this.state.adminsAndCoordinators.filter(
            m => m._id !== params._id
          );
          this.setState({ adminsAndCoordinators: [...admins] });
        })
        .catch(err => {
          alert(`${err.message} +"  "+ ${err.response.data}`);
          console.log(err);
        });
    }

    if (params.userType === "coordinator") {
      axios
        .delete(
          `${config.get("serverAddress")}/api/Coordinators/` + params._id,
          {
            headers: { "x-auth-token": userToken }
          }
        )
        .then(response => {
          alert("הפעולה בוצעה בהצלחה");
          const coordinators = this.state.adminsAndCoordinators.filter(
            m => m._id !== params._id
          );
          this.setState({ adminsAndCoordinators: [...coordinators] });
        })
        .catch(err => {
          alert(`${err.message} +"  "+ ${err.response.data}`);
          console.log(err);
        });
    }
  };

  hadleEdit = params => {
    const activityArea = params.activityAreas
      ? params.activityAreas.map(area => {
          return { label: area.name, id: area._id };
        })
      : [];
    this.setState({
      aAcType: params.userType,
      aAcfName: params.fname,
      aAclName: params.lname,
      aAcPass: params.password,
      aAcId: params.id,
      aAc_Id: params._id,
      aAcEmail: params.email,
      aAcPhone: params.phone,
      activityAreasNames: activityArea
    });

    this.toggleModal_editItem();
  };

  handleSubmitEdit = params => {
    const userToken = localStorage.getItem("beliba-homa-auth-token");

    const dataToPut = {
      id: this.state.aAcId,
      _id: this.state.aAc_Id,
      fname: this.state.aAcfName,
      lname: this.state.aAclName,
      type: this.state.aAcType,
      email: this.state.aAcEmail,
      phone: this.state.aAcPhone,
      password: this.state.aAcPass === "" ? null : this.state.aAcPass
    };
    if (this.state.aAcType === "coordinator") {
      dataToPut.activityAreas = this.state.areas
        .filter(area => {
          return this.state.activityAreasNames.find(name => {
            console.log("name", name, "area", area);
            return name.id === area._id;
          });
        })
        .map(area => {
          return area._id;
        });
    }

    console.log(dataToPut);

    if (this.state.aAcType === "admin") {
      axios
        .put(
          `${config.get("serverAddress")}/api/Admins/` + this.state.aAc_Id,
          dataToPut,
          {
            headers: { "x-auth-token": userToken }
          }
        )
        .then(res => {
          alert("הפעולה בוצעה בהצלחה");
          const admins = this.state.adminsAndCoordinators.filter(
            m => m._id !== this.state.aAc_Id
          );
          this.setState(prevState => ({
            adminsAndCoordinators: [res.data, ...admins]
          }));

          this.resetState();
          this.toggleModal_editItem();
        })
        .catch(err => {
          alert(`${err.message} +"  "+ ${err.response.data}`);
          console.log(err);
        });
    }

    if (this.state.aAcType === "coordinator") {
      axios
        .put(
          `${config.get("serverAddress")}/api/Coordinators/` +
            this.state.aAc_Id,
          dataToPut,
          {
            headers: { "x-auth-token": userToken }
          }
        )
        .then(res => {
          alert("הפעולה בוצעה בהצלחה");
          const coordinators = this.state.adminsAndCoordinators.filter(
            m => m._id !== this.state.aAc_Id
          );
          this.setState(prevState => ({
            adminsAndCoordinators: [res.data, ...coordinators]
          }));

          this.resetState();
          this.toggleModal_editItem();
        })
        .catch(err => {
          alert(`${err.message} +"  "+ ${err.response.data}`);
          console.log(err);
        });
    }
  };

  handleSubmit = val => {
    const userToken = localStorage.getItem("beliba-homa-auth-token");

    console.log(this.state);
    const dataToPost = {
      id: this.state.aAcId,
      _id: this.state.aAc_Id,
      password: this.state.aAcPass,
      fname: this.state.aAcfName,
      lname: this.state.aAclName,
      type: this.state.aAcType,
      email: this.state.aAcEmail,
      phone: this.state.aAcPhone
    };
    if (this.state.aAcType === "coordinator") {
      dataToPost.activityAreas = this.state.areas
        .filter(area => {
          return this.state.activityAreasNames.find(name => {
            return name.id === area._id;
          });
        })
        .map(area => {
          return area._id;
        });
    }

    console.log(dataToPost);

    console.log("this.state.aAcType: " + this.state.aAcType);
    if (this.state.aAcType === "coordinator") {
      axios
        .post(`${config.get("serverAddress")}/api/Coordinators`, dataToPost, {
          headers: { "x-auth-token": userToken }
        })
        .then(res => {
          alert(".המידע נשלח בהצלחה");
          this.setState(prevState => ({
            adminsAndCoordinators: [
              res.data,
              ...prevState.adminsAndCoordinators
            ],
            userToken: userToken
          }));

          this.resetState();
          this.toggleModal_addItem();
        })
        .catch(err => {
          alert(`${err.message} `);
          this.setState({ isLoading: false });
        });
    }

    if (this.state.aAcType === "admin") {
      axios
        .post(`${config.get("serverAddress")}/api/Admins`, dataToPost)
        .then(res => {
          alert(".המידע נשלח בהצלחה");
          this.setState(prevState => ({
            adminsAndCoordinators: [
              res.data,
              ...prevState.adminsAndCoordinators
            ]
          }));

          this.resetState();
          this.toggleModal_addItem();
        })
        .catch(err => {
          alert(`${err.message} +"  "+ ${err.response.data}`);
          this.setState({ isLoading: false });
        });
    }
  };

  //============

  render() {
    const selectedOptionsStyles = {
      color: "#3c763d",
      backgroundColor: "#dff0d8"
    };
    const optionsListStyles = {
      backgroundColor: "#dff0d8",
      color: "#3c763d"
    };
    return (
      <div className="container">
        <Modal
          show={this.state.isShowing}
          onHide={this.toggleModal_addItem}
          style={{ textAlign: "right" }}
        >
          <Modal.Header>
            <Modal.Title style={{ margin: "0 auto " }}>
              הוספת רכז/אדמין
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <div class="text-center">
                <ToggleButtonGroup
                  type="radio"
                  name="options"
                  onChange={this.handleTypeChanged}
                >
                  <ToggleButton variant="outline-secondary" value="1">
                    הוסף אדמין
                  </ToggleButton>
                  <ToggleButton variant="outline-secondary" value="2">
                    הוסף רכז
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>

              <Form.Group controlId="formGroupaAcName">
                <Form.Label>:שם פרטי </Form.Label>
                <Form.Control
                  dir="rtl"
                  placeholder="הקלד את השם הפרטי"
                  value={this.state.aAcfName}
                  onChange={this.handlefNameChanged}
                />
              </Form.Group>
              <Form.Group controlId="formGroupaAcName">
                <Form.Label>:שם משפחה </Form.Label>
                <Form.Control
                  dir="rtl"
                  placeholder="הקלד את שם המשפחה"
                  value={this.state.aAclName}
                  onChange={this.handlelNameChanged}
                />
              </Form.Group>
              <Form.Group controlId="formGroupaAcName">
                <Form.Label>:מספר תעודת זהות </Form.Label>
                <Form.Control
                  dir="rtl"
                  placeholder="הקלד את מספר תעודת הזהות"
                  value={this.state.aAcId}
                  onChange={this.handleIdChanged}
                />
              </Form.Group>
              <Form.Group controlId="formGroupaAcName">
                <Form.Label>:סיסמא </Form.Label>
                <Form.Control
                  // dir="rtl"
                  placeholder="בחר סיסמא"
                  value={this.state.aAcPass}
                  onChange={this.handlePassChanged}
                />
              </Form.Group>
              <Form.Group controlId="formGroupaAcName">
                <Form.Label>:אימייל </Form.Label>
                <Form.Control
                  dir="rtl"
                  placeholder="הקלד את האימייל שלך"
                  value={this.state.aAcEmail}
                  onChange={this.handleEmailChanged}
                />
              </Form.Group>
              <Form.Group controlId="formGroupaAcName">
                <Form.Label>:מספר טלפון </Form.Label>
                <Form.Control
                  dir="rtl"
                  placeholder="הקלד את מספר הטלפון שלך"
                  value={this.state.aAcPhone}
                  onChange={this.handleaPhoneChanged}
                />
              </Form.Group>
              {this.state.aAcType === "coordinator" ? (
                <Form.Group controlId="formGroupaAcType">
                  <Form.Label>איזור פעילות</Form.Label>
                  <Form.Control
                    as={MultiSelectReact}
                    options={this.state.activityAreasNames}
                    optionClicked={this.handleActivityAreaChanged.bind(this)}
                    selectedBadgeClicked={this.handleActivityAreaChanged.bind(
                      this
                    )}
                    selectedOptionsStyles={selectedOptionsStyles}
                    optionsListStyles={optionsListStyles}
                  />
                </Form.Group>
              ) : null}
              {/* <Form.Label>איזור פעילות</Form.Label>
                                <Form.Control
                                    as={DynamicSelectBox}
                                    className="mb-2"
                                    dir="rtl"
                                    value={this.state.activityArea}
                                    onChange={this.handleActivityAreaChanged}
                                    name="activityArea"
                                    fetchLink={`${config.get("serverAddress")}/api/areas`}
                                /> */}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <div class="text-center">
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
            </div>
          </Modal.Footer>
        </Modal>

        <Modal
          show={this.state.editIsShoing}
          onHide={this.toggleModal_editItem}
          style={{ textAlign: "right" }}
        >
          <Modal.Header>
            <Modal.Title style={{ margin: "0 auto " }}>
              עריכת רכז/אדמין
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <div class="text-center">
                <ToggleButtonGroup
                  type="radio"
                  name="options"
                  value={this.state.aAcType === "admin" ? "1" : "2"}
                >
                  <ToggleButton variant="outline-secondary" value="1">
                    {" "}
                    אדמין
                  </ToggleButton>
                  <ToggleButton variant="outline-secondary" value="2">
                    {" "}
                    רכז
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>

              <Form.Group controlId="formGroupaAcName">
                <Form.Label>:שם פרטי </Form.Label>
                <Form.Control
                  dir="rtl"
                  placeholder="הקלד את השם הפרטי"
                  value={this.state.aAcfName}
                  onChange={this.handlefNameChanged}
                />
              </Form.Group>
              <Form.Group controlId="formGroupaAcName">
                <Form.Label>:שם משפחה </Form.Label>
                <Form.Control
                  dir="rtl"
                  placeholder="הקלד את שם המשפחה"
                  value={this.state.aAclName}
                  onChange={this.handlelNameChanged}
                />
              </Form.Group>
              <Form.Group controlId="formGroupaAcName">
                <Form.Label>:מספר תעודת זהות </Form.Label>
                <Form.Control
                  dir="rtl"
                  placeholder="הקלד את מספר תעודת הזהות"
                  value={this.state.aAcId}
                  onChange={this.handleIdChanged}
                />
              </Form.Group>
              <Form.Group controlId="formGroupaAcName">
                <Form.Label>:סיסמא </Form.Label>
                <Form.Control
                  dir="rtl"
                  placeholder="השארת השדה ריק תשמור על הסיסמא הקיימת"
                  value={this.state.aAcPass}
                  onChange={this.handlePassChanged}
                />
              </Form.Group>
              <Form.Group controlId="formGroupaAcName">
                <Form.Label>:אימייל </Form.Label>
                <Form.Control
                  dir="rtl"
                  placeholder="הקלד את האימייל שלך"
                  value={this.state.aAcEmail}
                  onChange={this.handleEmailChanged}
                />
              </Form.Group>
              <Form.Group controlId="formGroupaAcName">
                <Form.Label>:מספר טלפון </Form.Label>
                <Form.Control
                  dir="rtl"
                  placeholder="הקלד את מספר הטלפון שלך"
                  value={this.state.aAcPhone}
                  onChange={this.handleaPhoneChanged}
                />
              </Form.Group>
              {this.state.aAcType === "coordinator" ? (
                <Form.Group controlId="formGroupaAcType">
                  <Form.Label>איזור פעילות</Form.Label>
                  <Form.Control
                    as={MultiSelectReact}
                    options={this.state.activityAreasNames}
                    optionClicked={this.handleActivityAreaChanged.bind(this)}
                    selectedBadgeClicked={this.handleActivityAreaChanged.bind(
                      this
                    )}
                    selectedOptionsStyles={selectedOptionsStyles}
                    optionsListStyles={optionsListStyles}
                  />
                </Form.Group>
              ) : null}
              {/* <Form.Group controlId="formGroupaAcType">
                                <Form.Label>איזור פעילות</Form.Label>
                                <Form.Control
                                    multiple ={true}
                                    as={DynamicSelectBox}
                                    className="mb-2"
                                    dir="rtl"
                                    value={this.state.aAcActivityAreas}
                                    onChange={this.handleActivityAreaChanged}
                                    name="activityArea"
                                    fetchLink={`${config.get("serverAddress")}/api/areas`}
                                />
                            </Form.Group> */}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <div class="text-center">
              <Button variant="secondary" onClick={this.toggleModal_editItem}>
                בטל
              </Button>
              <Button
                onClick={this.handleSubmitEdit}
                className="m-2 "
                type="submit"
              >
                שמור
              </Button>
            </div>
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
          אדמינים ורכזים
        </h1>
        <button
          className="btn btn-outline-primary"
          onClick={this.toggleModal_addItem}
          style={{ float: "left" }}
        >
          הוסף רכז/אדמין
        </button>
        <MultyTableGeneric
          ColumnNames={this.state.TableColumns}
          data={this.state.adminsAndCoordinators}
          hadleDelete={this.hadleDelete}
          hadleEdit={this.hadleEdit}
        />
      </div>
    );
  }
}

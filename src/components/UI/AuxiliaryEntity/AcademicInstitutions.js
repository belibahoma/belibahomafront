import React, { Component } from 'react';
import axios from 'axios';
import MultyTableGeneric from '../../../containers/MultyTableGeneric/MultyTableGeneric'
import { Modal, Button, Form } from "react-bootstrap";
import DynamicSelectBox from './../../../containers/DynamicSelectBox/DynamicSelectBox';
import config from "react-global-configuration";
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';




export default class AcademicInstitutions extends Component {

    constructor(props) {
        super(props);
        console.log(props);

        //this.handleClickAddItem = this.handleClickAddItem.bind(this);

        this.state = {
            TableColumns: [{
                dataField: 'type',
                text: 'סוג המוסד',
                sort: true,

            }, {
                dataField: 'name',
                text: 'שם המוסד',
                sort: true,

            }],

            institutions: [],
            header: 'מוסדות אקדמאים',
            isShowing: false,
            editIsShoing: false,
            instituteId: "",
            instituteName: "",
            instituteType: "",
        }
    }

    componentDidMount() {
        axios.get(`${config.get("serverAddress")}/api/institutes`)
            .then(response => {
                this.setState({ institutions: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    toggleModal_addItem = () => {
        console.log("isShowing:" + this.state.isShowing)
        this.setState({
            isShowing: !this.state.isShowing
        });
    }

    toggleModal_editItem = () => {
        console.log("editIsShoing:" + this.state.editIsShoing)
        this.setState({
            editIsShoing: !this.state.editIsShoing
        });
    }

    //==========
    handleActivityAreaChanged = event => {
        this.setState({ activityArea: event.target.value });
        console.log("ActivityArea: " + event.target.value)
    };

    handleInstituteNameChanged = event => {
        this.setState({ instituteName: event.target.value });
        console.log("instituteName: " + event.target.value)
    };

    handleInstituteTypeChanged = event => {
        this.setState({ instituteType: event.target.value });
        console.log("instituteType: " + event.target.value)
    };

    formValidate = (params) => {
        let valid = this.state.instituteName !== "" && this.state.instituteType !== "";
        console.log("formValidate:" + valid);
        return valid;
    };

    hadleDelete = (params) => {
        axios
            .delete(`${config.get("serverAddress")}/api/institutes/` + params._id)
            .then(response => {
                const institutes = this.state.institutions.filter(m => m._id !== params._id)
                this.setState({ institutions: [...institutes] });
            })
            .catch(err => {
                alert(`${err.message} +"  "+ ${err.response.data}`);
                console.log(err)
            })
    }

    hadleEdit = (params) => {
        this.setState({ instituteType: params.type });
        this.setState({ instituteName: params.name });
        this.setState({ instituteId: params._id });
        this.toggleModal_editItem();
    }

    handleSubmitEdit = params => {

        const dataToPut = {
            name: this.state.instituteName,
            type: this.state.instituteType,
        }

        axios
            .put(`${config.get("serverAddress")}/api/institutes/` + this.state.instituteId, dataToPut)
            .then(res => {
                const institutes = this.state.institutions.filter(m => m._id !== this.state.instituteId);
                this.setState(prevState => ({
                    institutions: [res.data, ...institutes]
                }))

                this.setState({ instituteType: "" });
                this.setState({ instituteName: "" });
                this.setState({ instituteId: "" });
                this.toggleModal_editItem();
            })
            .catch(err => {
                alert(`${err.message} +"  "+ ${err.response.data}`);
                console.log(err)
            });
    };

    handleSubmit = val => {

        const dataToPost = {
            name: this.state.instituteName,
            type: this.state.instituteType,
        }

        axios
            .post(`${config.get("serverAddress")}/api/institutes`, dataToPost)
            .then(res => {
                alert(".המידע נשלח בהצלחה, מוסד הלימודים התווסף");
                this.setState(prevState => ({
                    institutions: [res.data, ...prevState.institutions]
                }))

                this.setState({ instituteType: "" });
                this.setState({ instituteName: "" });
                this.setState({ instituteId: "" });
                this.toggleModal_addItem();
            })
            .catch(err => {
                alert(`${err.message} +"  "+ ${err.response.data}`);
                this.setState({ isLoading: false });
            });
    };

    //============  


    render() {

        return (
            <div className="container" >
                <Modal show={this.state.isShowing} onHide={this.toggleModal_addItem} style={{ textAlign: 'right' }}>
                    <Modal.Header   >
                        <Modal.Title style={{ margin: '0 auto '}}>הוספת מוסד אקדמאי</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form >
                            <Form.Group controlId="formGroupinstituteName">
                                <Form.Label>:שם המוסד </Form.Label>
                                <Form.Control
                                    dir="rtl"
                                    NavItem="instituteName"
                                    placeholder="הקלד את שם המוסד"
                                    value={this.state.instituteName}
                                    onChange={this.handleInstituteNameChanged}
                                />
                            </Form.Group>
                            <Form.Group controlId="formGroupinstituteType">
                                <Form.Label>:בחר את סוג המוסד</Form.Label>
                                <Form.Control
                                    as="select"
                                    dir="rtl"
                                    name="instituteType"
                                    placeholder="בחר סוג מוסד"
                                    value={this.state.instituteType}
                                    onChange={this.handleInstituteTypeChanged}
                                >
                                    <option value="">בחר את סוג המוסד...</option>
                                    <option value="אוניברסיטה">אוניברסיטה</option>
                                    <option value="מכללה">מכללה</option>
                                    <option value="מכינה">מכינה</option>
                                    <option value="הכשרה מקצועית">הכשרה מקצועית</option>
                                    <option value="אחר">אחר</option>
                                </Form.Control>
                            </Form.Group>
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

                <Modal show={this.state.editIsShoing} onHide={this.toggleModal_editItem} style={{ textAlign: 'right' }}>
                    <Modal.Header >
                        <Modal.Title style={{ margin: ' 0 auto ' }}>עריכת מוסד אקדמאי</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form >
                            <Form.Group controlId="formGroupinstituteName">
                                <Form.Label>:שם המוסד </Form.Label>
                                <Form.Control
                                    dir="rtl"
                                    NavItem="instituteName"
                                    placeholder="הקלד את שם המוסד"
                                    value={this.state.instituteName}
                                    onChange={this.handleInstituteNameChanged}
                                />
                            </Form.Group>
                            <Form.Group controlId="formGroupinstituteType">
                                <Form.Label>:בחר את סוג המוסד</Form.Label>
                                <Form.Control
                                    as="select"
                                    dir="rtl"
                                    name="instituteType"
                                    placeholder="בחר סוג מוסד"
                                    value={this.state.instituteType}
                                    onChange={this.handleInstituteTypeChanged}
                                >
                                    <option value="">בחר את סוג המוסד...</option>
                                    <option value="אוניברסיטה">אוניברסיטה</option>
                                    <option value="מכללה">מכללה</option>
                                    <option value="מכינה">מכינה</option>
                                    <option value="הכשרה מקצועית">הכשרה מקצועית</option>
                                    <option value="אחר">אחר</option>
                                </Form.Control>
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


                <h1 style={{ borderRadius: '0.25em', textAlign: 'center', border: '1px solid purple', padding: '0.5em' }}>
                    מוסדות אקדמאים
                </h1>
                <button className='btn btn-outline-primary' onClick={this.toggleModal_addItem} style={{ float: 'left' }}>הוסף מוסד</button>
                <MultyTableGeneric ColumnNames={this.state.TableColumns} data={this.state.institutions} hadleDelete={this.hadleDelete} hadleEdit={this.hadleEdit} />
            </div>
        );
    }

}

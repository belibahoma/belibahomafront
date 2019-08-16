import React, { Component } from 'react';
import axios from 'axios';
import MultyTableGeneric from '../../../containers/MultyTableGeneric/MultyTableGeneric'
import { Modal, Button, Form } from "react-bootstrap";
import DynamicSelectBox from './../../../containers/DynamicSelectBox/DynamicSelectBox';
import config from "react-global-configuration";
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';




export default class EducationPrograms extends Component {

    constructor(props) {
        super(props);
        console.log(props);

        //this.handleClickAddItem = this.handleClickAddItem.bind(this);

        this.state = {
            TableColumns: [{
                dataField: 'type',
                text: 'אשכול הלימודים',
                sort: true,

            }, {
                dataField: 'name',
                text: 'שם המסלול',
                sort: true,

            }],

            programs: [],
            header: 'מסלולי לימוד',
            isShowing: false,
            editIsShoing: false,
            programId: "",
            programName: "",
            programType: "",
        }
    }

    componentDidMount() {
        axios.get(`${config.get("serverAddress")}/api/academicDetails`)
            .then(response => {
                this.setState({ programs: response.data });
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

    handleprogramNameChanged = event => {
        this.setState({ programName: event.target.value });
        console.log("programName: " + event.target.value)
    };

    handleprogramTypeChanged = event => {
        this.setState({ programType: event.target.value });
        console.log("programType: " + event.target.value)
    };

    formValidate = (params) => {
        let valid = this.state.programName !== "" && this.state.programType !== "";
        return valid;
    };

    hadleDelete = (params) => {
        axios
            .delete(`${config.get("serverAddress")}/api/academicDetails/` + params._id)
            .then(response => {
                const _programs = this.state.programs.filter(m => m._id !== params._id)
                this.setState({ programs: [..._programs] });
            })
            .catch(err => {
                alert(`${err.message} +"  "+ ${err.response.data}`);
                console.log(err)
            })
    }

    hadleEdit = (params) => {
        this.setState({ programType: params.type });
        this.setState({ programName: params.name });
        this.setState({ programId: params._id });
        this.toggleModal_editItem();
    }

    handleSubmitEdit = params => {

        const dataToPut = {
            name: this.state.programName,
            type: this.state.programType,
        }

        axios
            .put(`${config.get("serverAddress")}/api/academicDetails/` + this.state.programId, dataToPut)
            .then(res => {
                const _programs = this.state.programs.filter(m => m._id !== this.state.programId);
                this.setState(prevState => ({
                    programs: [res.data, ..._programs]
                }))

                this.setState({ programType: "" });
                this.setState({ programName: "" });
                this.setState({ programId: "" });
                this.toggleModal_editItem();
            })
            .catch(err => {
                alert(`${err.message} +"  "+ ${err.response.data}`);
                console.log(err)
            });
    };

    handleSubmit = val => {

        const dataToPost = {
            name: this.state.programName,
            type: this.state.programType,
        }

        axios
            .post(`${config.get("serverAddress")}/api/academicDetails`, dataToPost)
            .then(res => {
                alert(". המידע נשלח בהצלחה, מסלול הלימודים התווסף");
                this.setState(prevState => ({
                    programs: [res.data, ...prevState.programs]
                }))

                this.setState({ programType: "" });
                this.setState({ programName: "" });
                this.setState({ programId: "" });
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
                        <Modal.Title style={{ margin: '0 auto ' }}>הוספת מסלול לימודים</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form >
                            <Form.Group controlId="formGroupprogramName">
                                <Form.Label>:שם המסלול </Form.Label>
                                <Form.Control
                                    dir="rtl"
                                    NavItem="programName"
                                    placeholder="הקלד את שם המסלול"
                                    value={this.state.programName}
                                    onChange={this.handleprogramNameChanged}
                                />
                            </Form.Group>
                            <Form.Group controlId="formGroupprogramType">
                                <Form.Label>:בחר את אשכול הלימודים</Form.Label>
                                <Form.Control
                                    as="select"
                                    dir="rtl"
                                    name="programType"
                                    placeholder="בחר את אשכול הלימודים..."
                                    value={this.state.programType}
                                    onChange={this.handleprogramTypeChanged}
                                >
                                    <option value="">בחר את אשכול הלימודים...</option>
                                    <option value="הנדסה/מחשבים">הנדסה/מחשבים</option>
                                    <option value="מדעים מדוייקים">מדעים מדוייקים</option>
                                    <option value="מדעי הרוח והחברה">מדעי הרוח והחברה</option>
                                    <option value="מקצועות כלכליים פיננסיים">מקצועות כלכליים פיננסיים</option>
                                    <option value="אחר">אחר</option>
                                </Form.Control>
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

                <Modal show={this.state.editIsShoing} onHide={this.toggleModal_editItem} style={{ textAlign: 'right' }}>
                    <Modal.Header >
                        <Modal.Title style={{ margin: ' 0 auto ' }}>עריכת מסלול לימודים</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form >
                            <Form.Group controlId="formGroupprogramName">
                                <Form.Label>:שם המסלול</Form.Label>
                                <Form.Control
                                    dir="rtl"
                                    NavItem="programName"
                                    placeholder="הקלד את שם המסלול"
                                    value={this.state.programName}
                                    onChange={this.handleprogramNameChanged}
                                />
                            </Form.Group>
                            <Form.Group controlId="formGroupprogramType">
                                <Form.Label>:בחר את אשכול הלימודים</Form.Label>
                                <Form.Control
                                    as="select"
                                    dir="rtl"
                                    name="programType"
                                    placeholder="בחר את אשכול הלימודים..."
                                    value={this.state.programType}
                                    onChange={this.handleprogramTypeChanged}
                                >
                                    <option value="">בחר את אשכול הלימודים...</option>
                                    <option value="הנדסה/מחשבים">הנדסה/מחשבים</option>
                                    <option value="מדעים מדוייקים">מדעים מדוייקים</option>
                                    <option value="מדעי הרוח והחברה">מדעי הרוח והחברה</option>
                                    <option value="מקצועות כלכליים פיננסיים">מקצועות כלכליים פיננסיים</option>
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
                    מסלולי לימוד
                </h1>
                <button className='btn btn-outline-primary' onClick={this.toggleModal_addItem} style={{ float: 'left' }}>הוסף מסלול לימודים</button>
                <MultyTableGeneric ColumnNames={this.state.TableColumns} data={this.state.programs} hadleDelete={this.hadleDelete} hadleEdit={this.hadleEdit} />
            </div>
        );
    }

}

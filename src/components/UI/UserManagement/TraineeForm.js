import React, { Component } from "react";
import {Form, Button, Container, Col, Row, Jumbotron,} from "react-bootstrap";
import TextValidator from "../../Validators/TextValidator/TextValidator";
import { ValidatorForm } from "react-form-validator-core";
import TimePicker from "react-time-picker";
import DatePicker from "react-date-picker";
import DynamicSelectBox from "../../../containers/DynamicSelectBox/DynamicSelectBox";
import config from "react-global-configuration";
import _ from "lodash";
import axios from "axios";
import { withRouter } from "react-router-dom";

function Field(props) {
    return(
        <Col xs={props.xs? props.xs : 6} md={props.md? props.md :3}>
            <Form.Label>{props.label}</Form.Label>
            <Form.Control
                  dir="rtl"
                  type= {props.type}
                  className="mb-2"
                  onChange={props.holder.handleInputChange}
                  name={props.name}
                  value={props.sub_name? props.holder.state[props.name][props.sub_name] : props.holder.state[props.name]}
                  as={!props.as ? TextValidator : props.as}
                  validators={props.validators}
                  errorMessages={props.errorMessages}
                  readOnly={props.holder.state.readOnly}
                  disabled={props.holder.state.readOnly}
                  fetchLink={props.fetchLink}
            >
                {props.children}
            </Form.Control>
        </Col>
    );      
}

function CheckBox(props) {
    return <Col dir="ltr" xs={6} md={3}>
        {props.br && <br/>}
        <Form.Check
                label={props.label}
                type="checkbox"
                onChange={props.onChange ? props.onChange : props.holder.handleInputChange}
                checked={props.sub_name? props.holder.state[props.name][props.sub_name] : props.holder.state[props.name]}
                className="custom-checkbox"
                disabled={props.holder.state.readOnly}
            />
    </Col>    
}

class TraineeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      readOnly: props.readOnly,    
    };
    Object.assign(this.state, props.traineeInfo)
  }

  componentDidMount() {
  }

  handleSubmit = val => { }; 

  handleInputChange = event => {
    console.log(event)
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    if(!target.sub_name) {
        this.setState({
            [target.name]: value
          });
    } else {
        this.setState({
            [target.name]: {
                [target.sub_name]: value
            }
        });
    }
    
  }
  

  render() {
    return (
    <Container className="text-right" fluid={true}>
        <Form as={ValidatorForm} onError={this.handleError} ref="form" onSubmit={this.handleSubmit}>
            <Row  dir="rtl">
                <Field name="id" holder={this} label=" מספר תעודת זהות "
                    validators={["required", "isNumber", "minStringLength:9", "maxStringLength:9"]}
                    errorMessages={["שדה זה הינו חובה", "מכיל מספרים בלבד", "צריך להכיל לפחות 9 ספרות", "צריך להכיל לכל היותר 9 ספרות"]}/>
                <Field holder={this} name="fname" type="text" label="שם פרטי"
                    validators={["required"]}
                    errorMessages={["שדה זה הינו חובה"]}/>  
                <Field holder={this} name="lname" type="text" label="שם משפחה"
                    validators={["required"]}
                    errorMessages={["שדה זה הינו חובה"]}/>
            </Row>
            {!this.state.readOnly &&  
            <Row  dir="rtl">
                <Field label="סיסמא" holder={this} type="password" as={TextValidator} name="password"/>
            </Row>}
            <Row  dir="rtl">
                <Field holder={this} label="מספר טלפון ראשי" type="text" name="phoneA"
                    validators={["required", "isNumber", "minStringLength:9", "maxStringLength:10"]}
                    errorMessages={["שדה זה הינו חובה", "נא להכניס ספרות בלבד", "צריך להכיל לפחות 9 ספרות",
                                   "צריך להכיל מקסימום 10 ספרות"]}/>
                <Field holder={this} label="מספר טלפון משני" name="phoneB"/>
                <Field holder={this} label="כתובת אימייל" name="email"
                    validators={["required", "isEmail"]}
                    errorMessages={["שדה זה הינו חובה", "נא הכנס כתובת מייל תקנית"]}/>
            </Row>
            <Row dir="rtl">
                <Col xs={6} md={3}>
                    <Form.Label>תאריך לידה</Form.Label>
                    <br/>
                    <DatePicker
                        value={new Date(this.state.birthDate)}
                        onChange={value => {this.setState({ birthDate: value });}}
                        format="dd/MM/yyyy"
                        disabled={this.state.readOnly}
                        required/>
                </Col>
                <Field holder={this} label="מגדר" as="select" name="gender">
                    <option value="N/A">N/A</option>
                    <option value="זכר">זכר</option>
                    <option value="נקבה">נקבה</option>
                </Field>
                <Field holder={this} label="מצב משפחתי" as="select" name="maritalStatus">
                    <option value="N/A">N/A</option>
                    <option value="נשוי">נשוי</option>
                    <option value="רווק">רווק</option>
                    <option value="גרוש">גרוש</option>
                    <option value="אלמן">אלמן</option>
                    <option value="אחר">אחר</option>
                </Field>
            </Row>
            <Row  dir="rtl">
                <Field holder={this} label="איזור פעילות" as={DynamicSelectBox} name="activityArea"
                    fetchLink={`${config.get("serverAddress")}/api/areas`}/>
                <Field holder={this} label="מוסד לימודים" as={DynamicSelectBox} name="institute"
                    fetchLink={`${config.get("serverAddress")}/api/institutes`}/>
                <Field holder={this} label="מסלול אקדמי" as="select" name="academicPlan">
                    <option value="N/A">N/A</option>
                    <option value="מכינה/בגרויות">מכינה/בגרויות</option>
                    <option value="תואר ראשון">תואר ראשון</option>
                    <option value="תואר מתקדם">תואר מתקדם</option>
                </Field>
                {this.state.academicPlan === "תואר ראשון" &&
                    <Field holder={this} label="שנת לימודים" as="select" name="studyYear">
                        <option value="1">א</option>
                        <option value="2">ב</option>
                        <option value="3">ג</option>
                        <option value="4">ד</option>
                        <option value="5">ה</option>
                        <option value="6">ו</option>
                        <option value="7">ז</option>
                        <option value="8">ח</option>
                    </Field>}
                
                <Field holder={this} label="מסלול לימודים ראשי" as={DynamicSelectBox} name="mainStudy"
                    fetchLink={`${config.get("serverAddress")}/api/academicDetails`}/>
                 {!this.state.readOnly &&
                    <CheckBox holder={this} br={true} label="?קיים מסלול לימודים נוסף" name="isAdditionalStudyPath"
                              onChange={() => {this.setState({isAdditionalStudyPath: !this.state.isAdditionalStudyPath,
                                                              secondaryStudy: "" });}}/>} 
                {this.state.isAdditionalStudyPath &&
                    <Field holder={this} label="מסלול לימודים משני"  as={DynamicSelectBox} name="secondaryStudy"
                    fetchLink={`${config.get("serverAddress")}/api/academicDetails`}/>}     
            </Row>             
            <Form.Label dir="rtl">
              <b>כתובת כפי שמצוין בת.ז.</b>
            </Form.Label>
            <br />
            <Row dir="rtl">
                <Field holder={this} label="רחוב ומספר" name="realAddress" sub_name="street" 
                       validators={["required"]}
                       errorMessages={["שדה זה הינו חובה"]}/>
                <Field holder={this} label="עיר/יישוב" name="realAddress" sub_name="city"
                        validators={["required"]}
                        errorMessages={["שדה זה הינו חובה"]}/>
                <Field holder={this} label="שכונה" name="realAddress" sub_name="neighborhood" 
                       validators={["required"]}
                       errorMessages={["שדה זה הינו חובה"]}/>
            </Row>
            <Form.Label dir="rtl">
              <b>כתובת מגורים בפועל</b>
            </Form.Label>
            <br />
            <Row dir="rtl">
                <Field holder={this} label="רחוב ומספר" name="currentAddress" sub_name="street" 
                       validators={["required"]}
                       errorMessages={["שדה זה הינו חובה"]}/>
                <Field holder={this} label="עיר/יישוב" name="currentAddress" sub_name="city"
                        validators={["required"]}
                        errorMessages={["שדה זה הינו חובה"]}/>
                <Field holder={this} label="שכונה" name="currentAddress" sub_name="neighborhood" 
                       validators={["required"]}
                       errorMessages={["שדה זה הינו חובה"]}/>
            </Row>
            <Row dir="rtl">
                <Field holder={this} label="הגדרה דתית" as="select" name="religiousStatus">
                    <option value="N/A">N/A</option>
                    <option value="חילוני">חילוני</option>
                    <option value="מסורתי">מסורתי</option>
                    <option value="דתי">דתי</option>
                    <option value="חרדי">חרדי</option>
                    <option value="דתי לשעבר">דתי לשעבר</option>
                    <option value="חרדי לשעבר">חרדי לשעבר</option>
                    <option value="אחר">אחר/לא מגדיר</option>
                
                </Field>
                {this.state.religiousStatus === "אחר" ? (
                    <Field holder={this} label="פרט" as="textarea" name="religiousText"/>) : null}
            </Row>
            {/* until here is the common part */}

            <br />
            <Row dir="rtl">
                <Field holder={this} label="הערות/בקשות נוספות" as="textarea" name="notes" xs={12} md={12}/>
            </Row>
            {/* until here is the common part */}
            <Row dir="rtl">
                <Field holder={this} label="צריך עזרה ב" as="textarea" name="needsHelpIn" xs={12} md={12}/>
            </Row>
            <Row dir="rtl">
                <Field holder={this} label="מצב תעסוקתי" as="select" name="workStatus">
                  <option value="N/A">N/A</option>
                  <option value="לא עובד ולא מחפש עבודה">לא עובד ולא מחפש עבודה</option>
                  <option value="לא עובד ומחפש עבודה">לא עובד ומחפש עבודה</option>
                  <option value="עובד במקצוע הלימודים">עובד במקצוע הלימודים</option>
                  <option value="עובד במקצוע אחר">עובד במקצוע אחר</option>
                </Field>
              {(this.state.workStatus === "עובד במקצוע הלימודים" || this.state.workStatus === "עובד במקצוע אחר") && 
                <Field holder={this} label="פרט" name="workTitle"
                    validators={["required"]}
                    errorMessages={["שדה זה הינו חובה"]}/>}
            </Row>
            <Row dir="rtl">
                <CheckBox holder={this} br={true} label="?האם למדת בישיבה/סמינר" name="isLearnedInYeshiva"/>
                {this.state.isLearnedInYeshiva &&
                    <Field holder={this} label="כמה שנים?" name="yeshivaTimes"
                           validators={["required", "isNumber"]}
                           errorMessages={["שדה זה הינו חובה", "אנא הכנס מספרים בלבד"]}/>}
            </Row>
            <Row dir="rtl">
                <CheckBox holder={this} br={true} label="?האם עברת מסלול של הכשרה מקצועית" name="isHaveAnotherProfessionalTraining"/>
                {this.state.isHaveAnotherProfessionalTraining &&
                    <Field holder={this} label="פרט:" name="previousProfession"
                           validators={["required"]}
                           errorMessages={["שדה זה הינו חובה"]}/>}
            </Row>
            <Row dir="rtl">
                <CheckBox holder={this} br={true} label="?האם אתה בעל תואר אקדמאי קודם" name="isHaveAnotherDegree"/>
                {this.state.isHaveAnotherDegree &&
                    <Field holder={this} label="פרט:" name="previousDegree"
                           validators={["required"]}
                           errorMessages={["שדה זה הינו חובה"]}/>}
            </Row>
            <br/>
            <Jumbotron>
              <Row dir="rtl">
                <Form.Label dir="rtl">
                  <b>
                    מרכז כיוון בירושלים הוא גוף שעוסק בהכשרות מקצועיות ובהשמת
                    מקצועות לחברי העיר.
                    <br /> האם הייתי רוצה שיצרו איתי קשר עבור אחד או יותר
                    מהתחומים הבאים?
                  </b>
                </Form.Label>
              </Row>
              <Row dir="rtl">
                <CheckBox holder={this} br={true} label="אימון אישי" name="WantDetailsAbout" sub_name="personalTraining"/>
                <CheckBox holder={this} br={true} label="חיפוש עבודה" name="WantDetailsAbout" sub_name="jobSeeking"/>
                <CheckBox holder={this} br={true} label="הכשרות מקצועיות" name="WantDetailsAbout" sub_name="professionalTraining"/>
                <CheckBox holder={this} br={true} label="קורס אנגלית" name="WantDetailsAbout" sub_name="englishCourse"/>
                <CheckBox holder={this} br={true} label="קורס מחשבים" name="WantDetailsAbout" sub_name="computerCourse"/>    
                <CheckBox holder={this} br={true} label="אבחון לימודים" name="WantDetailsAbout" sub_name="studyDiagnostics"/>     
                <CheckBox holder={this} br={true} label="תוכניות קידום" name="WantDetailsAbout" sub_name="selfAdvanceProgram"/> 
                <CheckBox holder={this} br={true} label="יזמות" name="WantDetailsAbout" sub_name="entrepreneurship"/>  
                <CheckBox holder={this} br={true} label="מכינה קצרת טווח" name="WantDetailsAbout" sub_name="shortTermPreparatory"/>          
              </Row>
            </Jumbotron>
            {this.state.academicPlan === "מכינה/בגרויות" &&
                <Row dir="rtl">
                    <Field holder={this} label="מתמטיקה" as="select" name="mathLevel">
                      <option value="N/A">N/A</option>
                      <option value="0">לא רלוונטי</option>
                      <option value="3">3 יחידות</option>
                      <option value="4">4 יחידות</option>
                      <option value="5">5 יחידות</option>
                    </Field>
                    <Field holder={this} label="אנגלית" as="select" name="englishLevel">
                      <option value="N/A">N/A</option>
                      <option value="0">לא רלוונטי</option>
                      <option value="3">3 יחידות</option>
                      <option value="4">4 יחידות</option>
                      <option value="5">5 יחידות</option>
                    </Field>
                    <Field holder={this} label="פיזיקה" as="select" name="physicsLevel">
                      <option value="N/A">N/A</option>
                      <option value="0">לא רלוונטי</option>
                      <option value="3">3 יחידות</option>
                      <option value="4">4 יחידות</option>
                      <option value="5">5 יחידות</option>
                    </Field>
                </Row>}
            <Row dir="rtl">
              <CheckBox holder={this} label="?בוגר צבא/שירות לאומי" name="isServed"/>
            </Row>
            <br/>
            <Jumbotron>
                <Row dir="rtl">
                    <Form.Label dir="rtl" className="h5 font-weight-bold">
                        שדות בעריכת אדמין בלבד:
                    </Form.Label>
                    </Row>
                <Row dir="rtl">
                    <Field holder={this} label="הערות צוות" as="textarea" name="stuffNotes" xs={12} md={12}/>
                </Row>
                <Row dir="rtl">
                    <CheckBox holder={this} label="?צריך שיבוץ נוסף" name="isNeedAdditionalRelation" br={true}/>  
                    <CheckBox holder={this} label="?סיים מכינה" name="isFinnishPreparatory" br={true}/>
                    <CheckBox holder={this} label="?סיים את התואר" name="isGraduated" br={true}/>
                    <CheckBox holder={this} label="?השתלב בעבודה" name="isFoundJob" br={true}/>
                    <CheckBox holder={this} label="?השתלב בעבודה בתחום" name="isJobInStudyFelid" br={true}/>
                </Row>
                <br/>
                <Row dir="rtl">
                    <CheckBox holder={this} label="?פעיל" name="isActive" br={true}/>  
                    <CheckBox holder={this} label="?נשר" name="isDropped" br={true}/>                  
                </Row>
            </Jumbotron>
            {!this.state.readOnly && 
                <div>
                    <Button className="m-2 btn btn-danger" type="button" disabled={this.state.isLoading ? "disabled" : null}
                            onClick={()=> this.setState({readOnly: true})}>
                        ביטול 
                    </Button> 
                    <Button className="m-2" type="submit"disabled={this.state.isLoading ? "disabled" : null}>
                         שמור שינויים
                    </Button> 
                </div>}
            {this.state.readOnly &&
                <Button className="m-2 " onClick={()=>this.setState({readOnly: false})}> עריכה </Button>}
        </Form>
    </Container>
    );
  }
}
export default TraineeForm;
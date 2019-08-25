import React, { Component } from "react";
import { Jumbotron, Container, Button, Modal } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../assets/images/BelibaHoma.jpg";
import aboutPdf from "../../assets/pdf/AboutPDF.pdf";
import './Home.css'


export default class Home extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isShowing: false,
        }
    };

    toggleModal_pdf = () => {
        console.log("isShowing:" + this.state.isShowing)
        this.setState({
            isShowing: !this.state.isShowing
        });
    }


    render() {
        return (
            <div id="container" style={{ textAlign: 'right' }}>

                <Modal size="lg" show={this.state.isShowing} onHide={this.toggleModal_pdf}>
                    <Modal.Header closeButton   >
                        <Modal.Title >Read more about us...</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div >
                            <iframe src={aboutPdf}
                                style={{ width: '770px', height: '500px' }} frameborder="0"></iframe>
                        </div>
                        
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.toggleModal_pdf}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
                
                <Jumbotron>
                    <div id="main_jumbo"  >

                        <div style={{ paddingRight: '30px' }}>
                            <h1>  בליבה חומה - ניהול ודיווח</h1>
                            <p>
                                .כדי לגשת אל המידע האישי שלך עלייך להתחבר
                                <br />אם אינך רשום עלייך להירשם תחילה
                            </p>
                        </div>
                        <img id="bh_logo" src={logo} height="380" width="380" />
                    </div>
                </Jumbotron>

                <div>
                    <div class="d-inline-flex flex-md-equal w-100 my-md-3 pl-md-3">
                        <div class="bg-dark w-25 mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white overflow-hidden">
                            <div class="my-3 py-3">
                                <h2 class="display-5">הישארו מעודכנים</h2>
                                <p class="lead">לעדכונים נוספים עברו לעמוד הפייסבוק שלנו</p>
                            </div>
                            <div class="bg-light shadow-sm mx-auto" style={{ width: '80%', height: '300px', borderRadius: '21px 21px 0 0' }}>

                            </div>
                        </div>
                        <div class="bg-light w-50 mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
                            <div class="mx-3 ">
                                <h2 class="display-5">בליבה חומה</h2>
                                <p class="lead">!יוצרים גשר בין אוכלוסיות סטודנטים במדינת ישראל</p>
                            </div>
                            <div class="bg-dark shadow-sm mx-auto" style={{ width: '80%', height: '300px', borderRadius: '21px 21px 0 0' }}>
                                <p class="text-right text-white p-3">
                                    תכנית 'בליבה חומה' פועלת מזה 5 שנים, על מנת לאפשר לצעירים חרדים להשתלב בהצלחה במערכת ההשכלה הגבוהה בישראל בדרכם לרכוש פרנסה בכבוד,  ובנוסף ליצור שינוי חברתי ביחסי המגזרים השונים בישראל.
                                    <br />
                                    .התכנית הוקמה על ידי צעירים בעקבות שבר גדול בו חזו במהלך מאבק חברתי בין ציבור הסטודנטים לציבור החרדי בשנת 2010
                                    <br />
                                    .בליבה חומה' החלה לפעול בירושלים, ובמהרה התרחבה גם לאיזור גוש דן, לבאר שבע ולחיפה<br />
                                    .עד היום השתתפו בפרויקט כ-700 סטודנטים
                                </p>
                            </div>
                            <Button variant="outline-dark m-3" onClick={this.toggleModal_pdf}>קרא עלינו עוד</Button>

                        </div>
                        <div class="bg-dark w-25 mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white overflow-hidden">
                            <div class="my-3 py-3">
                                <h2 class="display-5">בליבה חומה</h2>
                                <p class="lead">יוצרים גשר בין אוכלוסיות סטודנטים במדינת ישראל!</p>
                            </div>
                            <div class="bg-light shadow-sm mx-auto" style={{ width: '80%', height: '300px', borderRadius: '21px 21px 0 0' }}></div>
                        </div>


                    </div>
                </div>

            </div>
        );
    }
}


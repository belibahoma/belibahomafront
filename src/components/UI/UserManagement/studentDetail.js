import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import config from "react-global-configuration";



export default class studentDetail extends Component {

    constructor(props) {
        super(props);

        console.log("props->");
        console.log(props);

        this.state = {
            student_id: this.props.match.params.id,
            isTrainee: "",

            studentInfo: ""

        }
    }

    //props: _id, usertype

    componentDidMount() {

        const userToken = localStorage.getItem("beliba-homa-auth-token");
        let userData = localStorage.getItem("beliba-homa-user");
        let isTutor;

        if (userToken && userData) {
            userData = JSON.parse(userData);
            if (userData.userType === "admin" || userData.userType === "coordinator") {
                isTutor = /.*tutor.*/i.test(window.location.href);

                if (isTutor) {
                    axios
                        .get(`${config.get("serverAddress")}/api/tutors/` + this.state.student_id, {
                            headers: { "x-auth-token": userToken }
                        })
                        .then(res => {
                            console.log(res.data);
                            this.setState({
                                user: userData,
                                isLoggedIn: true,
                                fname: userData.fname,
                                lname: userData.lname,
                                userType: userData.userType,
                                studentInfo: res.data,
                                userToken: userToken,
                            });
                            console.log("res->");
                            console.log(this.state.studentInfo);
                        })
                        .catch(err => {

                        });
                }
                else {
                    axios
                        .get(`${config.get("serverAddress")}/api/trainees/` + this.state.student_id, {
                            headers: { "x-auth-token": userToken }
                        })
                        .then(res => {
                            console.log(res.data);
                            this.setState({
                                user: userData,
                                isLoggedIn: true,
                                fname: userData.fname,
                                lname: userData.lname,
                                userType: userData.userType,
                                studentInfo: res.data,
                                userToken: userToken,
                            });
                            console.log("res->");
                            console.log(this.state.studentInfo);
                        })
                        .catch(err => {

                        });
                }


            }
        }
    }

    render() {
        console.log(this.state.studentInfo);
        return (
            ""
        )
    }
}
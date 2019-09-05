import React, { Component } from "react";

export default class AdaptiveHomeMessage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userToken: localStorage.getItem("beliba-homa-auth-token"),
      userData: localStorage.getItem("beliba-homa-user")
    };
  }

  componentDidMount() {
    // if (this.state.userToken && this.state.userData) {
    //     this.state.userData = JSON.parse(this.state.userData);
    // }
    // const userToken = localStorage.getItem("beliba-homa-auth-token");
    // let userData = localStorage.getItem("beliba-homa-user");
    // console.log(userData);
    // if (userToken && userData) {
    //   userData = JSON.parse(userData);
    // }
    // userData.userType === "admin" ||
    // userData.userType === "coordinator"
  }

  render() {
    // const helloName = <p>  <b>userData.fname</b>שלום </p>;
    // const printType = <p>[ {userData.userType === "admin" ? "אדמין" :
    //     userData.userType === "coordinator" ? "רכז" :
    //         userData.userType === "trainee" ? "חניך" :
    //             userData.userType === "tutor" ? "חונך" : ""}
    //     ]</p>;

    // if (!this.state.userData) return (notConnected)
    // else return("");
    // else return (
    //     <div>
    //         <p>  <b>userData.fname</b>שלום </p>
    //         <p>[ {userData.userType === "admin" ? "אדמין" :
    //             userData.userType === "coordinator" ? "רכז" :
    //                 userData.userType === "trainee" ? "חניך" :
    //                     userData.userType === "tutor" ? "חונך" : ""}
    //             ]</p>
    //     </div>
    // );
    return <p dir="rtl">ברוכים הבאים לאתר של בליבה חומה!</p>;
  }
}

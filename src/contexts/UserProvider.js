import React, { Component } from "react";
import UserContext from "./UserContext";

class UserProvider extends Component {
  state = {
    isLoggedIn: false,
    name: "",
    userId: ""
  };
  render() {
    return (
      <React.Fragment>
        <UserContext.Provider
          value={{
            state: this.state,
            toggleLogin: () =>
              this.setState({ isLoggedIn: !this.state.isLoggedIn }),
            setName: val => this.setState({ name: val }),
            setUserId: val => this.setState({ userId: val })
          }}
        >
          {this.props.children}
        </UserContext.Provider>
      </React.Fragment>
    );
  }
}

export default UserProvider;

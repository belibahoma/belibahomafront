import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Layout from "./hoc/Layout/Layout";
import Reports from "./components/UI/Reports/Reports";
import AddAppointment from "./components/UI/Reports/AddAppointment/AddAppointment";
import Auth from "./containers/Auth/Auth";
import UserProvider from "./contexts/UserProvider";
import Register from "./components/UI/Register/Register";

class App extends Component {
  render() {
    return (
      <UserProvider>
        <Layout>
          <Switch>
            <Route path="/" exact />
            <Route path="/auth" exact component={Auth} />
            <Route path="/student/add" component={AddAppointment} />
            <Route path="/register" component={Register} />
            <Route path="/student" component={Reports} />
          </Switch>
        </Layout>
      </UserProvider>
    );
  }
}

export default App;

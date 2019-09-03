import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./components/HomePage/Home";
import Layout from "./hoc/Layout/Layout";
import Reports from "./components/UI/Reports/Reports";
import AddAppointment from "./components/UI/Reports/AddAppointment/AddAppointment";
import Auth from "./containers/Auth/Auth";
import UserProvider from "./contexts/UserProvider";
import Register from "./components/UI/Register/Register";
import Relation from "./components/UI/Relation/Relation";
import AcademicInstitutions from "./components/UI/AuxiliaryEntity/AcademicInstitutions";
import EducationPrograms from "./components/UI/AuxiliaryEntity/EducationPrograms";
import ActivityAreas from "./components/UI/AuxiliaryEntity/ActivityAreas";

import AdminsAndCoordinators from "./components/UI/UserManagement/AdminsAndCoordinators";
import Trainees from "./components/UI/UserManagement/Trainees";
import Tutors from "./components/UI/UserManagement/Tutors";
import studentDetail from "./components/UI/UserManagement/studentDetail";

import Approve from "./components/UI/Approve/Approve";

class App extends Component {
  render() {
    return (
      <UserProvider>
        <Layout onConnect={this.handleConnect}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/auth" exact component={Auth} />
            <Route path="/student/add" component={AddAppointment} />
            <Route path="/register" component={Register} />
            <Route path="/reports" component={Reports} />
            <Route path="/addRelation" component={Relation} />
            {/* <Route path="/relations" component={Relations} /> */}
            <Route
              path="/AcademicInstitutions"
              component={AcademicInstitutions}
            />
            <Route path="/EducationPrograms" component={EducationPrograms} />
            <Route path="/ActivityAreas" component={ActivityAreas} />
            <Route
              path="/AdminsAndCoordinators"
              component={AdminsAndCoordinators}
            />
            <Route path="/Trainees" component={Trainees} />
            <Route path="/Tutors" component={Tutors} />
            <Route path="/trainee/:id" component={studentDetail} />

            <Route path="/alerts" component={Approve} />
          </Switch>
        </Layout>
      </UserProvider>
    );
  }
}

export default App;

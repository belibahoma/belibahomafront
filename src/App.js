import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

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
            <Route path="/relation" component={Relation} />
            <Route
              path="/AcademicInstitutions"
              component={AcademicInstitutions}
            />
            <Route path="/EducationPrograms" component={EducationPrograms} />
            <Route path="/ActivityAreas" component={ActivityAreas} />
          </Switch>
        </Layout>
      </UserProvider>
    );
  }
}

export default App;

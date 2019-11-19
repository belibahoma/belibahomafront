import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./components/HomePage/Home";
import Layout from "./hoc/Layout/Layout";
import Reports from "./components/UI/Reports/ReportsId";
import ReportsId from "./components/UI/Reports/Reports";
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
import Relations from "./components/UI/Relations/Relations";
import ReportsTrainee from "./components/UI/Reports/ReportsTrainee";

// import { ActiveYearsPage } from './components/UI/Filters/ActiveYears/ActiveYearsPage';
// import { GeneralFiltersPage } from './components/UI/Filters/General/GeneralFiltersPage';
import DbQuerying from './components/UI/DBQuerying/DBQueryingPage';

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

            <Route path="/singleReport" component={ReportsId} />
            <Route path="/ReportTrainee" component={ReportsTrainee} />
            <Route path="/reports" component={Reports} />
            <Route path="/addRelation" component={Relation} />
            {/* <Route path="/filters/active-years/trainees" component={FilterTutorsOrTraineesByActiveYears}/> */}
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
            <Route path="/relations" component={Relations} />

            <Route path="/dbQuerying" component={DbQuerying} />

            {/* <Route
              path="/filters/general/trainees"
              component={({ history, location }) => (
                <GeneralFiltersPage history={history} location={location} type='trainees' />
              )}
            />
            <Route
              path="/filters/general/tutors"
              component={({ history, location }) => (
                <GeneralFiltersPage history={history} location={location} type='tutors' />
              )}
            />
            <Route
              path="/filters/active-years/trainees"
              component={({ history, location }) => (
                <ActiveYearsPage
                  history={history}
                  location={location}
                  type="trainees"
                />
              )}
            />
            <Route
              path="/filters/active-years/tutors"
              component={({ history, location }) => (
                <ActiveYearsPage
                  history={history}
                  location={location}
                  type="tutors"
                /> */}
              )}
            />


          </Switch>
        </Layout>
      </UserProvider>
    );
  }
}

export default App;

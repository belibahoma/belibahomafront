import axios from "axios";
import config from "react-global-configuration";


function getFromApi(collection, asset='', user, callback, caller) {
  if (user) {
    let url =  `${config.get("serverAddress")}/api/${collection}/${asset}`
    axios
    .get(url,{headers: { "x-auth-token": user.token }})
    .then(res => {
      caller.setState({
          user: user.data,
          isLoggedIn: true,
          fname: user.data.fname,
          lname: user.data.lname,
          userType: user.data.userType,
          userToken: user.token
        });
      callback(caller, res)
    })
    .catch(err => {console.log(err)});
  }
}

function assignDataToCallerState(caller, data, target) {
  if(target) {
    caller.setState({[target]: data})
  } else {
    caller.setState(data)
  }
}

function getUser() {
  let user = {
    token: localStorage.getItem("beliba-homa-auth-token"),
    data: localStorage.getItem("beliba-homa-user")
  }
  if (user.token && user.data) {
    user.data = JSON.parse(user.data);
  } else return null;
  return user;
}

function isAdmin(user) {
  return user.data.userType === "admin" ||
        user.data.userType === "coordinator"
}

const server = {
  asAdmin : {
    getTrainee(id, caller, target=null) {
      const user = getUser();
      if (user) 
        if (isAdmin(user)) {
          getFromApi('trainees', id, user, (caller, res) => {
            assignDataToCallerState(caller, res.data, target)
          }, caller);
        } 
    },
    getTutor(id, caller, target=null) {
      const user = getUser();
      if (user) 
        if (isAdmin(user)) {
          getFromApi('tutors', id, user, (caller, res) => {
            assignDataToCallerState(caller, res.data, target)
          }, caller);
        } 
    }

  }

}
export default server;
export function getFromDB(collection, id='', userData, userToken, holder, target=null){
    let url =  `${config.get("serverAddress")}/api/${collection}/${id}`
    console.log(url)
    
}


import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Report = props => {
  return (
    <tr>
      <td colSpan="2">
        <Button
          className="text-center mr-2 ml-2"
          onClick={props.addAppointment}
        >
          הוסף דיווח
        </Button>
        <Button className="text-center mr-2 ml-2" onClick={props.editReport}>
          עריכה
        </Button>
        <Button className="text-center mr-2 ml-2" onClick={props.details}>
          פרטים
        </Button>
      </td>
      <td>{props.creationTime.toLocaleString()}</td>
      <td>{props.companionshipTime}</td>
      <td>{props.studyTime}</td>
      <td>{props.trainee}</td>
      <td>
        <Link to={props.tutor.link}>{props.tutor.name}</Link>
      </td>
    </tr>
  );
};

export default Report;

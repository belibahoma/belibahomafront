import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function chooseType(type) {
  switch (type) {
    case "ordinary":
      return "חברותא";
    case "group":
      return "קבוצתי";
    default:
      return "אחר";
  }
}

const Report = props => {
  return (
    <tr>
      <td colSpan="2">
        <Button className="text-center m-1" onClick={props.editReport}>
          עריכה
        </Button>
        <Button className="text-center m-1" onClick={props.details}>
          פרטים
        </Button>
      </td>
      <td>{`${new Date(props.date).getDate()}/${new Date(
        props.date
      ).getMonth() + 1}/${new Date(props.date).getFullYear()}`}</td>
      <td>{props.type === "ordinary" ? props.chavrutaTime : "------"}</td>
      <td>{props.type === "ordinary" ? props.studyTime : props.totalTime}</td>
      <td>
        {props.type === "ordinary"
          ? `${props.trainee.fname} ${props.trainee.lname}`
          : "------"}
      </td>
      <td>{`${props.tutor.fname} ${props.tutor.lname}`}</td>
      <td>{chooseType(props.type)}</td>
    </tr>
  );
};

export default Report;

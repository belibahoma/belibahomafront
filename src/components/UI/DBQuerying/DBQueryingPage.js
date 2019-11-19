import React, {useState} from 'react';
import DynamicTable from './DynamicTable';
import {createSchema} from './DynamicSchema';
import axios from "axios";
import config from "react-global-configuration";
import { withRouter } from "react-router-dom";

var tutorFields = [
    'gender',
    'academicPlan',
    'religiousStatus',
    'isNeedAdditionalRelation',
    'activeStatus',
    'isFinnishPreparatory',
    'isGraduated',
    'isFoundJob',
    'isJobInStudyFelid',
    'isApproved',
    'isImpact',
    'isShachak',
    'isForAcademicPoints',
    'isCityScholarship',
    'mathLevel',
    'englishLevel',
    'physicsLevel',
    'isActive',
    'userType',
    'id',
    'fname',
    'lname',
    'email',
    'password',
    'phoneA',
    'birthDate',
    'maritalStatus',
    'activityArea',
    'institute',
    'mainStudy',
    'studyYear',
    'bankAccount',
    'realAddress',
    'currentAddress',
    'religiousText',
    'unavailableTimes',
    'notes',
    'stuffNotes',
    'additionalTopics',
    'scholarshipTimes'
  ];

  var traineeFields = [
    'WantDetailsAbout',
    'gender',
    'academicPlan',
    'activeYears',
    'religiousStatus',
    'isNeedAdditionalRelation',
    'activeStatus',
    'isFinnishPreparatory',
    'isGraduated',
    'isFoundJob',
    'isJobInStudyFelid',
    'isApproved',
    'isInMagid',
    'isLiveInSelectedCities',
    'isRegisteredToKivun',
    'workStatus',
    'isLearnedInYeshiva',
    'isHaveAnotherProfessionalTraining',
    'isHaveAnotherDegree',
    'isServed',
    'mathLevel',
    'englishLevel',
    'physicsLevel',
    'isActive',
    'isDropped',
    'userType',
    'id',
    'fname',
    'lname',
    'email',
    'password',
    'phoneA',
    'birthDate',
    'maritalStatus',
    'activityArea',
    'institute',
    'mainStudy',
    'studyYear',
    'bankAccount',
    'realAddress',
    'currentAddress',
    'religiousText',
    'unavailableTimes',
    'notes',
    'stuffNotes',
    'needsHelpIn',
    'workTitle',
    'yeshivaTimes',
    'previousProfession',
    'previousDegree',
    'additionalTopics',
    'leavingReason',
    'phoneB'
  ];
const DbQuerying = () => {

    const [tableForm, updateTableForm] = useState( {
    });

    const [filterFiledsDict, updatefilterFiledsDict] = useState( {
    });

    

    const [arrOfAttributes, updateArrOfAttributes] = useState( tutorFields.slice()
    );

    const [tableName, updateTableName] = useState('tutor');
    const [data, updateData] = useState([]);

     function change(e){
        updateTableForm({
            ...tableForm,
            [e.target.value]: ''
        });   
        var newDivElement = document.createElement('div');
        var newLabelElement = document.createElement('label');
        var newInputElement = document.createElement('input');

        const fieldName = e.target.value;
        console.log(`field name is ${fieldName}`);
        newLabelElement.innerHTML = fieldName;
        const id = `filtered ${fieldName}` 
        newLabelElement.setAttribute('htmlFor', id);
        newInputElement.setAttribute('field', fieldName);
        newInputElement.onchange =  (e)=>{console.log('chgane');updateTableForm({...tableForm, [fieldName]: e.target.value})};
        newDivElement.appendChild(newLabelElement);
        newDivElement.appendChild(newInputElement);
        document.querySelector(".filterFields").appendChild(newDivElement);        

    }

    async function click(){
        console.log(`${config.get('serverAddress')}/api/trainees`);
        const userToken = localStorage.getItem("beliba-homa-auth-token");
        if(tableName === 'trainee'){
            const { data: tutors } = await axios.get(
                `${config.get('serverAddress')}/api/trainees`,
                {
                  headers: { 'x-auth-token': userToken }
                }
              )
              updateData(tutors);
        } else {
            const { data: trainees } = await axios.get(
                `${config.get('serverAddress')}/api/tutors`,
                {
                  headers: { 'x-auth-token': userToken }
                }
              )
              updateData(trainees);
        }
    }
    return (
        <>
            <form>
                <div style={{marginRight: '1em'}}>
                    <label htmlFor="tableSelection">Choose Table: </label>
                    <select id="tableSelection" name="tableName" value={tableName} onChange={(e)=>{updateTableName(e.target.value);
                    e.target.value === 'tutor'? updateArrOfAttributes(tutorFields.slice()) : updateArrOfAttributes(traineeFields.slice()); updateTableForm({}); updateData([]) }}>
                        <option value="tutor">Tutors </option>
                        <option value="trainee">Trainees </option>
                    </select><br></br>
                    <label htmlFor="fieldsSelection">Choose Fields: </label>
                    <select id="fieldsSelection" name="fields" onChange={change}>
                        {arrOfAttributes.map((attribute) => <option value={attribute}>{attribute}</option>)}
                    </select>
                </div>
            </form>
            <button type="submit" onClick={click}>Load table</button>
             <div className="filterFields"></div>
            
            <DynamicTable tableName={tableName} attributes={tableForm} data={data}/>
        </>
    )
}

export default withRouter(DbQuerying);
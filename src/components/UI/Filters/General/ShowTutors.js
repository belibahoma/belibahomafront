import React, { useState, useEffect } from 'react';
import { getFieldParamFromQueryString } from './common/getFieldParamFromQueryString';
import { TutorsFields } from './const/TutorsFields';
import { getTutorsByFields } from '../Api/tutors';

export const ShowTutors = ({ location }) => {
  const [tutors, setTutors] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    let isAbleToExecute = true;

    const fields = getFieldParamFromQueryString(location.search);

    const relevantTutorsFields = TutorsFields.filter(tutorField =>
      fields.includes(tutorField.value)
    );
    setColumns(relevantTutorsFields.map(field => field.description));

    const executeFetchTutors = async () => {
      const tutors = await getTutorsByFields(fields);
      isAbleToExecute && setTutors(tutors);
    };

    executeFetchTutors();

    return () => {
      isAbleToExecute = false;
    };
  }, [location.search]);

  return (
    <div>
      <div>{JSON.stringify(columns)}</div>
      <div>{JSON.stringify(tutors)}</div>
    </div>
  );
};

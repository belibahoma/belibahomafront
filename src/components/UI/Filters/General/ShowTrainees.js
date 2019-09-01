import React, { useState, useEffect } from 'react';
import { getFieldParamFromQueryString } from './common/getFieldParamFromQueryString';
import { TraineesFields } from './const/TraineesFields';
import { getTraineesByFields } from '../Api/trainees';

export const ShowTrainees = ({ location }) => {
  const [trainees, setTrainees] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    let isAbleToExecute = true;

    const fields = getFieldParamFromQueryString(location.search);

    const relevantTraineesFields = TraineesFields.filter(traineeField =>
      fields.includes(traineeField.value)
    );
    setColumns(relevantTraineesFields.map(field => field.description));

    const executeFetchTrainees = async () => {
      const trainees = await getTraineesByFields(fields);
      isAbleToExecute && setTrainees(trainees);
    };

    executeFetchTrainees();

    return () => {
      isAbleToExecute = false;
    };
  }, [location.search]);

  return (
    <div>
      <div>{JSON.stringify(columns)}</div>
      <div>{JSON.stringify(trainees)}</div>
    </div>
  );
};

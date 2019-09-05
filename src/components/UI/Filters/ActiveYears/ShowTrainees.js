import React, { useState, useEffect } from 'react';
import { getParamsFromQueryString } from './common/getParamsFromQueryString';
import { getTraineesByActiveYears } from '../Api/trainees';

export const ShowTrainees = ({ location }) => {
  const [trainees, setTrainees] = useState([]);

  useEffect(() => {
    let isAbleToExecute = true;

    const executeFetchTrainees = async () => {
      const { startYear, endYear, isGetAll } = getParamsFromQueryString(
        location.search
      );
      const tutors = await getTraineesByActiveYears(startYear, endYear, isGetAll);
      isAbleToExecute && setTrainees(tutors);
    };

    executeFetchTrainees();

    return () => {
      isAbleToExecute = false;
    };
  }, [location.search]);

  return <div>{JSON.stringify(trainees)}</div>;
};
